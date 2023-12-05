import ProductItem from './ProductItem'
import './main.css'
import Spinner from 'react-bootstrap/Spinner';
import { Toaster } from "@/components/ui/toaster"
import { useDispatch } from 'react-redux';
import { productAction } from '@/store/index.tsx';
import { useEffect } from 'react';
import CarouselComponent from '../Carousel/Carousel';

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
    <>
     <CarouselComponent/>
   
    <div className='container-main sm:grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
       
        {
            data?.map((item:any)=>{
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
    </>
  )
}

export default Main