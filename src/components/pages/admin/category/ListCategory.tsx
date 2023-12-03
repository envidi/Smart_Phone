import { useQuery } from "@tanstack/react-query"
import DataTableDemo from '@/payments/data-table.tsx'
import useMutationCustom from "@/hooks/UseMutation";
import Spinner from 'react-bootstrap/Spinner';
import {  columnsCategory } from '@/payments/columns'
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { getCategories } from "@/instance/category";

 function ListCategory() {
  const { toast } = useToast()
  const { isPending, data } = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const { handleDeleteProduct} = useMutationCustom({
    onSuccess : ()=>{
      toast({
        variant: "success",
        title: "Success",
        description: "Delete category successfully !",
      })
    },
    onError : ()=>{
      toast({
        variant: "error",
        title: "Error",
        description: "Delete category failed !",
      })
    },action: 'categories'
  } )

  if(isPending){
    return  <div className='container-loading'>
              <Spinner animation="border" variant="dark" />
            </div>
  }

  const columns = columnsCategory(handleDeleteProduct)
   
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

export default ListCategory