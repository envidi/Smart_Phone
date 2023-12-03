import { changeColorStatus, dateTimeFormat, formatter } from '@/lib/utils'
import './bill.css'
import { X,Loader  } from 'lucide-react'
import BillItem from './BillItem'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCart } from '@/instance/cart'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { COMPLETED, DELETED } from '@/store/cartSlice'

function BillPayList({billUser,index}:any) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
    const mutation = useMutation({
      mutationFn : (value:any)=>deleteCart(value.data,value.id),
      onSuccess : ()=>{
        toast({
          variant:"success",
          title: "Success!",
          description: "Delete cart successfully !",
        }),
        queryClient.invalidateQueries({ queryKey: ['carts'] })
      },
      onError:()=>{
        toast({
          variant:"error",
          title: "Error",
          description: "Delete cart failed !",
        })
      },
      
    })

    const hanldeDeleteCart = ({data,id}:any)=>{
      mutation.mutate({data : {...data, cartStatus : DELETED},id})
    }
    console.log(billUser)
  return (
    <div className="wrapper-cart">
   <AlertDialog>
    <div className="summary-cart w-[100%] h-[100%] ">
      <h3 className='summary'>Bill {index + 1}
      {
        billUser.cartStatus !== COMPLETED ? 
        <AlertDialogTrigger asChild>
        { mutation.isPending ? <Loader/> : <X strokeWidth={1.75} />} 
      </AlertDialogTrigger> :
      null
      }
     
      </h3>
      <ul>
        <li>
          <div className='d-flex item-bill justify-between'>
            <span className='item-bill-name'>Date </span>
            <span className='item-bill-date'>{dateTimeFormat(new Date(billUser.date))}</span>
          </div>
        </li>
        {
            billUser.carts.map((bill:any)=>{
                return <BillItem key={bill.id} bill={bill} />
            })
        }
        <li>
          <div className='d-flex item-bill justify-between'>
            <span className='item-bill-name'>Status </span>
            <span className={`item-bill-date ${changeColorStatus(billUser.cartStatus)}`}>{ billUser.cartStatus}</span>
          </div>
        </li>
       
        <li className='mt-2 border-t border-black-600'>
          <div className=' d-flex item-bill justify-between'>
            <span className='item-bill-name'>Total cost</span>
            <span className={`item-bill-price`}>{formatter.format(billUser.totalCost)}</span>
          </div>
        </li>
       
      </ul>
    </div>
          
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-red-500'>Are you sure you want to remove this item?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-500 text-white mt-2' onClick={()=>hanldeDeleteCart({data : billUser,id:billUser.id})}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <Toaster />
  </div>
  )
}

export default BillPayList