import { Link } from "react-router-dom"
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
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi" 
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader } from "lucide-react"
import { addCategory } from "@/instance/category"

const formSchema = Joi.object({
  name : Joi.string().required(),
  
})
function AddCategory() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:(value:any)=> addCategory(value as any),
    onSuccess:()=>{
      toast({
        variant: "success",
        title: "Success",
        description: "Update category successfully !",
      })
      queryClient.invalidateQueries({ queryKey : ['categories']})
      form.reset()
    },onError : (error)=>{
      toast({
        variant: "error",
        title: "Error",
        description: `Failed to update category ! ${error.message}`,
      }) 
    }
  })
    // 1. Define your form.
    const form = useForm<any>({
      resolver: joiResolver(formSchema),
      defaultValues: {
        name: "",
      },
    })

    const onSubmit = (value:any)=>{
     
      mutation.mutate({...value} as any)
    }
   
  return (
    <div className="d-flex items-center flex-col bg-white mt-3">
      <h1 className="my-3 text-xl">Add Category</h1>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[400px] mb-5 bg-white px-5 py-4 rounded shadow-lg shadow-indigo-500/50 ">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mt-0">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input className="border rounded" placeholder="shadcn" {...field} />
            </FormControl>           
            <FormMessage />
          </FormItem>
        )}
      />
     
      
    
      
      {
         mutation.isPending  ? 
         <Button variant='outline' type="submit">
          <Loader className="mt-1 mb-1 animate-spin" />
         </Button> : <div className="d-flex gap-4">
         <Button variant='secondary' type="submit">Submit</Button>
         <Link className="px-3 border border-slate-500 hover:bg-slate-200 rounded py-2 bg-slate-50" to="/admin/category">Back</Link>
         </div>
      }
      
    </form>
  </Form>
  <Toaster />
    </div>
  )
}

export default AddCategory