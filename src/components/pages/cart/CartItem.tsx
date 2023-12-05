import { Button } from '../../ui/button'
import './cart.css'
import {
  TableCell,  
  TableRow,
} from "@/components/ui/table"
import {Plus,Minus } from 'lucide-react'
import { useDispatch,useSelector} from 'react-redux'
import { formatter } from '@/lib/utils'
import { cartAction } from '@/store/cartSlice'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


function CartItem({cart}:any) {
    const dispatch = useDispatch()
    const categories = useSelector((state:any)=>state.category.categories)
    
    const handleIncrease = (cart:any) =>{
        dispatch(cartAction.increase(cart))
      }
      const handleDecrease = (cart:any) =>{
        dispatch(cartAction.decrease(cart))
      }
      const name_category = categories.find((cate:any)=>{
        console.log(cate._id)
        return cate._id === cart.id_cate
      })
      
  return (
    <>
      <AlertDialog>
    <TableRow key={cart.id}>
        <TableCell className="font-medium">
            <div className='d-flex'>
                <div className="img-cart-item">
                <img src={cart.image} alt="" />
                </div>
                <div className="name-cart-item d-flex flex-col items-start">
                <span>{cart.name}</span>
                <Button size="category" variant="outline" className='mt-3'>{name_category?.name} </Button>
                </div>
            </div>
            </TableCell>
            <TableCell >
            <div className='d-flex w-100'>
                <Button size="control" onClick={()=>handleDecrease(cart)}><Minus /></Button>
                <Button className='mx-2' size="quantity" variant='outline'>{cart.quantity}</Button>
                <Button size="control" onClick={()=>handleIncrease(cart)}><Plus/></Button>
            </div>
        </TableCell>
        <TableCell>{formatter.format(cart.price)}</TableCell>
        <TableCell className="text-right">{formatter.format(cart.total)}</TableCell>
        <TableCell className="text-right">
        <AlertDialogTrigger asChild>
          <Button   size="quantity" className='mr-2' variant='destructive'>Delete</Button>
          </AlertDialogTrigger>
        </TableCell>
    </TableRow>            
     <AlertDialogContent>
       <AlertDialogHeader>
         <AlertDialogTitle className='text-red-500'>Do you want to delete this item?</AlertDialogTitle>
         <AlertDialogDescription>
           This action cannot be undone. This will permanently delete your
           account and remove your data from our servers.
         </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
         <AlertDialogCancel>Cancel</AlertDialogCancel>
         <AlertDialogAction className='bg-black text-white mt-2' onClick={()=>dispatch(cartAction.decrease({id : cart.id_product, name : "DELETE_ONE"} as any))}>Continue</AlertDialogAction>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
   </>
  )
}

export default CartItem