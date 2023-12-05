import { Button } from "@/components/ui/button"
import { formatter } from "@/lib/utils"
import { useState } from "react"
import { Plus,Minus } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { cartAction } from "@/store/cartSlice"
import { useToast } from "@/components/ui/use-toast"

function ProductDetailItem({data}:any) {

    const dispatch = useDispatch()
    const { toast } = useToast()
    const [quantityProduct , setQuantityProduct] = useState(1)
    const allCategory = useSelector((state:any)=>state.category.categories)
    // const { data:dataInside} = data
    // console.log(dataInside)
    
    const handleIncrease = () =>{
        setQuantityProduct(prev=>{
         return prev + 1
        })
       }
       const handleDecrease = () =>{
         setQuantityProduct(prev=>{
           if(prev === 1){
             return 1
           }
           return prev - 1
           })
       }

       const handleAddToCart = ()=>{
        const { data:dataInside} = data
        const {_id , category_id , ...other} = dataInside
        dispatch(cartAction.increase({
          ...other, id : Math.floor(Math.random() * 10000), id_product : _id, quantity : quantityProduct,id_cate: category_id
    
        } as any))
        toast({
            variant: "success",
            title: "Success",
            description: "Add item to cart successfully !",
          })
      }
      const nameCategory = allCategory.find((cate:any)=>{
        return cate.id === data?.category_id
      })

  return (
    <div className="container-fluid-detail">
         
    <div className="row row-sm">
      <div className="col-md-6-detail _boxzoom">
          
          <div className="_product-images">
            <div className="picZoomer h-[400px]">
                <img className="my_img" src={data?.data.image} alt=""/>
            </div>
          </div>
      </div>
      <div className="col-md-6">
          <div className="_product-detail-content">
            <p className="_p-name "> {data?.data?.name} </p>
            <div className="category-product-detail">
                {nameCategory?.name}
              
            </div>
            <div className="_p-price-box mt-3 ">
                <div className="p-list">
                  <span className="price-text"> Price : </span>
                  <span className="price"> {formatter.format(data?.data?.price)} </span>
                </div>
                <div className="_p-add-cart">
                  <div className="_p-qty d-flex items-center" >
                      <span className="quantity-span">Quantity</span>
                     
                     <div className="d-flex items-center">
                        <Button size="control" onClick={()=>handleDecrease()}><Minus /></Button>
                        <Button className='mx-2 w-[38px] h-[35px]' size="quantity" variant='outline'>{quantityProduct}</Button>
                        <Button size="control" onClick={()=>handleIncrease()}><Plus/></Button>
                     </div>
                  </div>
                </div>
                <div className="_p-features">
                  <span> Description : </span>
                    {data?.data?.desc}
                                 
                </div>
                <Button 
                className='mt-4' 
                variant="secondary" 
                onClick={handleAddToCart} >
                  Add to cart
                </Button>
            </div>
          </div>
      </div>
    </div>
</div>
  )
}

export default ProductDetailItem