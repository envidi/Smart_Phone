import { useQuery } from "@tanstack/react-query"
import { DataTableCart } from '@/payments/data-table.tsx'
// import { data } from '@/payments/page'
import useMutationCustom from "@/hooks/UseMutation";
import Spinner from 'react-bootstrap/Spinner';
import {  columnsCarts} from '@/payments/columns'
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { getCarts } from "@/instance/cart";

 function ListCart() {
  const { toast } = useToast()
  const { isPending, data } = useQuery({ queryKey: ['carts'], queryFn: getCarts })
  const { handleDeleteProduct} = useMutationCustom({
    onSuccess : ()=>{
      toast({
        variant: "success",
        title: "Success",
        description: "Delete product successfully !",
      })
    },
    onError : ()=>{
      toast({
        variant: "error",
        title: "Error",
        description: "Delete product failed !",
      })
    },action:'carts'
  }  )

  if(isPending){
    return  <div className='container-loading'>
              <Spinner animation="border" variant="dark" />
            </div>
  }

  const columns = columnsCarts(handleDeleteProduct)
   
  return (
    <>
      
    {
      data ?  <div className='px-5'>
      <DataTableCart columns={columns} data={data}/>
   </div> : " Null"
    } 
 
      <Toaster />
    </>
  )
}

export default ListCart