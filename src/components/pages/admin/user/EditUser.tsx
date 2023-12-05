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
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi" 
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader } from "lucide-react"
import { useSelector } from "react-redux"
import { editUser } from "@/instance/auth"

const formSchema = Joi.object({
  username : Joi.string().required(),
  email : Joi.string().required(),  
  role : Joi.string().allow(''),
  
})
function EditUser({payment}:any) {
  const allRole = useSelector((state:any)=>state.user.roles)
  const roleId = allRole.find((role:any)=>role.id === payment.role)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn:(value:any)=> editUser(payment._id,value as any),
    onSuccess:()=>{
      toast({
        variant: "success",
        title: "Success",
        description: "Update user successfully !",
      })
      queryClient.invalidateQueries({ queryKey : ['user']})
      form.reset()
    },onError : (error)=>{
      toast({
        variant: "error",
        title: "Error",
        description: `Failed to update user ! ${error.message}`,
      }) 
    }
  })
    // 1. Define your form.
    const form = useForm<any>({
      resolver: joiResolver(formSchema),
      defaultValues: {
        username: payment?.username,
        email: payment?.email,        
        role: roleId?.name,
      },
    })

    const onSubmit =async (value:any)=>{
      const roleId = allRole.find((role:any)=>{
        return role.name === value.role
      })
    
      mutation.mutate({...value,role: roleId.id} as any)
    }
    const selectRole = allRole && allRole.length > 0 ? allRole.map((category:any)=>{
      return <SelectItem className="text-black" key={category.id} value={category.name}>{category.name}  </ SelectItem>      
    }) : ''
  return (
    <>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white px-5 py-4 rounded shadow-lg shadow-indigo-500/50 ">
      <h1 className="text-xl">Edit user</h1>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="mt-0">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input className="border rounded" placeholder="shadcn" {...field} />
            </FormControl>           
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
      
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="mt-2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input className="border rounded" placeholder="admin@gmail.com" {...field} />
            </FormControl>           
            <FormMessage />
          </FormItem>
        )}
      />
    
    
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => { 
          field.value = roleId?.name
          
          
          return (
            <FormItem className="mt-3">
              
              <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder={roleId?.name} />
                  </SelectTrigger>
              </FormControl>           
                  <SelectContent >                
                    { selectRole}
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
         <Button variant='secondary' type="submit">Submit</Button>
        
         </div>
      }
      
    </form>
  </Form>
  <Toaster />
    </>
  )
}

export default EditUser