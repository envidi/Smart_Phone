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
import {  editProduct } from "@/instance/product"
import { useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader } from "lucide-react"
import { useSelector } from "react-redux"

const formSchema = Joi.object({
  name : Joi.string().required(),
  price : Joi.number().required(),
  desc : Joi.string().required(),
  category_id : Joi.string().allow(''),
  image : Joi.string().allow(''),
})
function Edit({payment}:any) {
  const allCategory = useSelector((state:any)=>state.category.categories)
  const categoryId = allCategory.find((cate:any)=>cate.id === payment.category_id)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const imageRef = useRef<any>()
  const mutation = useMutation({
    mutationFn:(value:any)=> editProduct(payment.id,value as any),
    onSuccess:()=>{
      toast({
        variant: "success",
        title: "Success",
        description: "Update product successfully !",
      })
      queryClient.invalidateQueries({ queryKey : ['products']})
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
        name: payment?.name,
        price: payment?.price,
        desc: payment?.desc,
        image: '',
        category_id: categoryId?.name,
      },
    })

    const onSubmit =async (value:any)=>{
      const imageFile = imageRef?.current?.files[0] ? imageRef?.current?.files : payment.image
      const categoryId = allCategory.find((cate:any)=>{
        return cate.name === value.category_id
      })
    
      mutation.mutate({...value,image: imageFile,category_id: categoryId.id} as any)
    }
    const selectCategory = allCategory && allCategory.length > 0 ? allCategory.map((category:any)=>{
      return <SelectItem className="text-black" key={category.id} value={category.name}>{category.name}</SelectItem>      
    }) : ''
  return (
    <>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white px-5 py-4 rounded shadow-lg shadow-indigo-500/50 ">
      <h1 className="text-xl">Edit product</h1>
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
      <FormField
      
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem className="mt-2">
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input className="border rounded" placeholder="shadcn" {...field} />
            </FormControl>           
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="desc"
        render={({ field }) => (
          <FormItem className="mt-2">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input className="border rounded" placeholder="Good..." {...field} />
            </FormControl>           
            <FormMessage />
          </FormItem>
        )}  
      />
      <FormField
        control={form.control}
        name="image"
        render={({ field }:any) =>{ 
          field.ref = imageRef           
          // const { value , ...other} = field
          // const imageField = { ...other , value : ''}
          return (
          <FormItem className="mt-2">
            <FormLabel>Image</FormLabel>
            <FormControl>
              <div>
              <Input type="file" className="border rounded" placeholder="shadcn" {...field}  />
              {/* <img width={40} src={value} alt="" /> */}
              </div>
            </FormControl>           
            <FormMessage />
          </FormItem>
        )}}
      />
      <FormField
        control={form.control}
        name="category_id"
        render={({ field }) => { 
          field.value = categoryId?.name
          
          
          return (
            <FormItem className="mt-3">
              
              <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder={categoryId?.name} />
                  </SelectTrigger>
              </FormControl>           
                  <SelectContent >                
                    { selectCategory}
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
         <Link className="px-3 border border-slate-500 hover:bg-slate-200 rounded py-2 bg-slate-50" to="/admin">Back</Link>
         </div>
      }
      
    </form>
  </Form>
  <Toaster />
    </>
  )
}

export default Edit