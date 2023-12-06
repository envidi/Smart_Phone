import ProductItem from '@/components/main/ProductItem';
import '../../main/main.css'
import Spinner from 'react-bootstrap/Spinner';
import { Toaster } from "@/components/ui/toaster"
import { useSelector } from 'react-redux';

import SubBar from './SubBar';
import {  useState } from 'react';

function Product({isLoading,error,data}:any) {
    const categories = useSelector((state:any)=>state.category.categories)
    const [valueSelect, setValueSelect] = useState<any>()
    const [searchInput , setSearch] = useState<any>()
    
    let currentData = data
  
    if(data && searchInput){
        const newArray = [...data]
        currentData = newArray?.filter((search:any)=>{            
            return search?.name?.toLowerCase().includes(searchInput?.toLowerCase())
        })
    }
    if(data && valueSelect && valueSelect !== 'all'){
        const idCate = categories.find((cate:any)=>{
            return cate.name === valueSelect
        })
        const newArray = [...data]
        currentData = newArray?.filter((search:any)=>{  
            return search.category_id ===idCate?._id 
        })
    }
    
    if (isLoading) {
        return ( 
            <div className='container-loading'>
                <Spinner animation="border" variant="dark" />
            </div>
        )
    }
    if (error){
        return (
           
            <div className='container-loading' >
                An error has occurred: `${error.message}`
            </div>
        )
    }
  return (
    <div>
        <SubBar valueSelect={valueSelect} setValueSelect={setValueSelect} categories={categories} setSearch={setSearch}/>
        <div className={`container-main sm:grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 ${currentData && currentData.length>0 ? 'h-full':'h-[100vh]'}`}>
            
            {
                currentData?.map((item:any)=>{
                    return <ProductItem key={item._id}
                    name={item.name} 
                    image={item.image} 
                    price={item.price} 
                    desc={item.desc} 
                    id_cate={item.category_id}
                    id={item._id}/>
                })
            }
                <Toaster  />
            
        </div>
    </div>
  )
}

export default Product