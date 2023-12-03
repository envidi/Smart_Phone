import { DataTableUser } from '@/payments/data-table.tsx'
import useMutationCustom from "@/hooks/UseMutation";
import Spinner from 'react-bootstrap/Spinner';
import {  columnsUser } from '@/payments/columns'
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

 function ListUser({dataUser,isLoadingUser}:any) {
  const { toast } = useToast()
  const { handleDeleteProduct} = useMutationCustom({
    onSuccess : ()=>{
      toast({
        variant: "success",
        title: "Success",
        description: "Delete user successfully !",
      })
    },
    onError : ()=>{
      toast({
        variant: "error",
        title: "Error",
        description: "Delete user failed !",
      })
    },action:'user'
  }  )
  
  if(isLoadingUser){
    return  <div className='container-loading'>
              <Spinner animation="border" variant="dark" />
            </div>
  }

  const columns = columnsUser(handleDeleteProduct)
   
  return (
    <>
      
    {
      dataUser ?  <div className='px-5'>
      <DataTableUser columns={columns} data={dataUser}/>
   </div> : " Null"
    } 
 
      <Toaster />
    </>
  )
}

export default ListUser