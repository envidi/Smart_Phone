import ProductItem from './ProductItem'
import './main.css'
import Spinner from 'react-bootstrap/Spinner';
import { Toaster } from "@/components/ui/toaster"
import { useDispatch } from 'react-redux';
import { productAction } from '@/store/index.tsx';
import { useEffect } from 'react';

function Main( { isLoading, error, data}:any) {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(data){
            dispatch(productAction.fetchData(data))
        }
    },[data])
    
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
    <div className='container-main'>
        {
            data?.map((item:any)=>{
                return <ProductItem 
                key={item.id}
                name={item.name} 
                image={item.image} 
                price={item.price} 
                desc={item.desc} 
                id_cate={item.category_id}
                id={item.id}/>
            })
        }
            <Toaster  />
       
    </div>
  )
}

export default Main