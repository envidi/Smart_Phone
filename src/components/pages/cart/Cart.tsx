import { Button } from '../../ui/button'
import { addCart } from '@/instance/cart'
import { Loader  } from 'lucide-react'
import './cart.css'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {  useDispatch, useSelector} from 'react-redux'
import { formatter } from '@/lib/utils'
import CartItem from './CartItem'
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from '@tanstack/react-query'
import { Toaster } from '../../ui/toaster'
import { PENDING, cartAction } from '@/store/cartSlice'

function Cart() {    
  const dispatch = useDispatch()
  const carts = useSelector((state:any)=>state.cart.carts)
  let userAuthen = { user : {
    id : null
  }}
  if(localStorage.getItem('user')){
     userAuthen = JSON.parse(localStorage.getItem('user')||'')
  }
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn : async(carts)=>{
      await addCart( carts )
    },
    onSuccess:()=>{
      toast({
        variant: "success",
        title: "Success",
        description: "Checkout successfully !",
      });
      dispatch(cartAction.resetCart())
    },
    onError:()=>{
      toast({
        variant: "error",
        title: "Error",
        description: "Failed to add bill !",
      }) 
    }
  })

  const handleCheckout =async ()=>{
    mutation.mutate({ id_user : userAuthen?.user?.id,totalCost, carts, date : new Date(), cartStatus : PENDING} as any)  
                 
  }
  const totalCost = carts.reduce((accumulator:any,cart:any)=>{
    return cart.total + accumulator
  },0)
  return (
    <div className={`container-cart ${carts && carts.length > 1 ? "" : "calc-height"}`}>
        <h2 className='text-2xl'>Your Cart</h2>
        <div className="wrapper-cart">
          <div className="list-cart">
            <Table className='w-[800px]'>
              <TableCaption className={`mb-2 ms-3 ${carts && carts.length > 0  ? '' : 'text-2xl'}`}>{
                carts && carts.length > 0 ? "A list of your recent invoices.": "No item in cart"
              }</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[240px]">PRODUCT DETAIL</TableHead>
                  <TableHead className="w-[100px]">QUANTITY</TableHead>
                  <TableHead className="w-[120px]">PRICE</TableHead>
                  <TableHead className="text-right w-[70px]">TOTAL</TableHead>
                  <TableHead className="text-right w-[10px]">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  carts?.map((cart:any)=>{
                    return (
                      <CartItem 
                      key={cart.id}
                      cart={cart} 
                     />
                    
                    )
                  })
                }
               
              </TableBody>
          </Table>
          </div>
          <div className="summary-cart w-[280px] h-[230px] ">
            <h3 className='summary'>Order Summary</h3>
            <ul>
              <li>
                <div className='d-flex item-bill justify-between'>
                  <span className='item-bill-name'>items {carts.length}</span>
                  <span className='item-bill-price'>{formatter.format(totalCost)}</span>
                </div>
              </li>
              <li className='mt-2 border-t border-black-600'>
                <div className=' d-flex item-bill justify-between'>
                  <span className='item-bill-name'>Total cost</span>
                  <span className='item-bill-price'>{formatter.format(totalCost)}</span>
                </div>
              </li>
              <li className='d-flex justify-center'>
                {
                  mutation.isPending ? <Loader className='animate-spin mt-2'/> : 
                  <Button 
                  className='mt-3 checkout ' 
                  onClick={handleCheckout} 
                  disabled={!(carts && carts.length > 0 )} 
                  variant="secondary">
                    Checkout
                  </Button>
                }
               
              </li>
            </ul>
          </div>
        </div>
        <Toaster  />
    </div>
  )
}

export default Cart