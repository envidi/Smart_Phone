import Joi from "joi" 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi" 
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader } from "lucide-react"
import { useSelector } from "react-redux"
import { changeColorStatus } from "@/lib/utils"
import { editCart } from "@/instance/cart"
import { DELETED } from "@/store/cartSlice"

const formSchema = Joi.object({
  cartStatus : Joi.string().required(),
  
})
function EditCart({payment}:any) {
  const allCart = useSelector((state:any)=>state.cart.statusCart)
  const cartName = allCart.find((cate:any)=>cate === payment.cartStatus)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:(value:any)=> editCart(value as any,payment.id),
    onSuccess:()=>{
      toast({
        variant: "success",
        title: "Success",
        description: "Update product successfully !",
      })
      queryClient.invalidateQueries({ queryKey : ['carts']})
      form.reset()
    },onError : (error)=>{
      toast({
        variant: "error",
        title: "Error",
        description: `Failed to update product ! ${error.message}`,
      }) 
    }
  })
    // 1. Define your form.
    const form = useForm<any>({
      resolver: joiResolver(formSchema),
      defaultValues: {
     
        cartStatus: cartName,
      },
    })

    const onSubmit =async (value:any)=>{
      mutation.mutate({...value} as any)
    }
    const selectCart = allCart && allCart.length > 0 ? allCart.map((cart:any,index:any)=>{
      if(cart === DELETED){
        return
      }
      return <SelectItem  className={`text-black ${changeColorStatus(cart)}`} key={index} value={cart}>{cart}</SelectItem>      
    }) : ''
  return (
    <>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white px-5 py-4 rounded shadow-lg shadow-indigo-500/50 ">
      <h1 className="text-xl">Edit product</h1>
      
     
      <FormField
        control={form.control}
        name="cartStatus"
        render={({ field }) => { 
          return (
            <FormItem className="mt-3">
              
              <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder={cartName} />
                  </SelectTrigger>
              </FormControl>           
                  <SelectContent >                
                    { selectCart}
                  </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      {
         mutation.isPending  ? 
         <Button variant='outline' type="submit">
          <Loader className="mt-1 mb-1 animate-spin" />
         </Button> : <div className="d-flex gap-4">

         <Button disabled={cartName === DELETED} variant='secondary' type="submit">Submit</Button>
        
         </div>
      }
      
    </form>
  </Form>
  <Toaster />
    </>
  )
}

export default EditCart