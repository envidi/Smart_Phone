import { getProducts } from "@/instance/product"
import { useQuery } from "@tanstack/react-query"
import DataTableDemo from '@/payments/data-table.tsx'
// import { data } from '@/payments/page'
import useMutationCustom from "@/hooks/UseMutation";
import Spinner from 'react-bootstrap/Spinner';
import {  columnsProduct } from '@/payments/columns'
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

 function List() {
  const { toast } = useToast()
  const { isPending, data } = useQuery({ queryKey: ['products'], queryFn: getProducts })
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
    },action:'products'
  }  )

  if(isPending){
    return  <div className='container-loading'>
              <Spinner animation="border" variant="dark" />
            </div>
  }

  const columns = columnsProduct(handleDeleteProduct)
   
  return (
    <>
      
    {
      data ?  <div className='px-5'>
      <DataTableDemo columns={columns} data={data}/>
   </div> : " Null"
    } 
 
      <Toaster />
    </>
  )
}

export default List