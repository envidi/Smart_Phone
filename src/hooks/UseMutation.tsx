import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from '@/instance/product' 
import { deleteCategory } from "@/instance/category"
import { deleteUser } from "@/instance/auth"


function useMutationCustom({onSuccess,onError,action}:any) {
  const queryClient = useQueryClient()
    const {mutate ,isSuccess} = useMutation({
        mutationFn : (id)=>{
          switch (action) {
            case 'products':
              return  deleteProduct(id)
            case 'categories':
              return  deleteCategory(id)
            case 'user':
                return  deleteUser(id)
            default:
              return deleteProduct(id)
          }
       },
        onSuccess:()=>{
          onSuccess && onSuccess()
  
          queryClient.invalidateQueries({ queryKey: [`${action}`] })
        },
        onError:()=>{
             onError && onError()
        }
      })

      const handleDeleteProduct = (id :any)=>{
        mutate(id as any)
      }
  return {handleDeleteProduct, isSuccess}
}

export default useMutationCustom