import { useParams } from "react-router-dom"
import './product_detail.css'
import {  useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { getProduct } from "@/instance/product"
import Spinner from 'react-bootstrap/Spinner';
import { Toaster } from "@/components/ui/toaster"
import ProductItem from "@/components/main/ProductItem"
import ProductDetailItem from "./ProductDetailItem"

function ProductDetail() {
  
  const dataProduct = useSelector((state:any)=>state.products.product)
  const param = useParams()
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['product',param.id],
    queryFn: ()=> getProduct(param.id),
  })
  console.log(data?.data)
  const relatedProduct = dataProduct.filter((item:any)=>{
    return item.category_id === data?.data?.category_id && item._id !== data?.data?._id
  })
 
  
  
  if(isPending){
    return ( 
    <div className='container-loading'>
        <Spinner animation="border" variant="dark" />
    </div>   )
  }
  if(isError){
    return (
      <div className='container-loading'>
        {error as any}
      </div>
    )
  }
  
  return (
   <>
        <section id="services" className="services section-bg">
        <ProductDetailItem data={data}/>
      </section>
      <section className="sec bg-light">
        <div className="container">
            <div className="row">
              <div className="col-sm-12 title_bx">
                  <h3 className="title text-black"> Recent Product   </h3>
              </div>
            </div>
            <div className="row">
              
              <div className='container-main mt-3'>
                {
                    relatedProduct?.map((item:any)=>{
                        return <ProductItem 
                        key={item._id}
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
              
            </div>
        </div>
      </section>

   </>
  )
};


export default ProductDetail