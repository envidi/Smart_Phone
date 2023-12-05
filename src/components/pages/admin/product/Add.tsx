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
import { addProduct } from "@/instance/product"
import { useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader } from "lucide-react"
import { useSelector } from "react-redux"

const formSchema = Joi.object({
  name : Joi.string().required(),
  price : Joi.number().required(),
  image : Joi.string().required(),
  desc : Joi.string().required(),
  category_id : Joi.string(),
})
function Add() {
  const allCategory = useSelector((state:any)=>state.category.categories)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const imageRef = useRef<any>()
  const mutation = useMutation({
    mutationFn:(value:any)=> addProduct(value as any),
    onSuccess:()=>{
      toast({
        variant: "success",
        title: "Success",
        description: "Add product successfully !",
      })
      queryClient.invalidateQueries({ queryKey : ['products']})
      form.reset()
    },onError : (error)=>{
      toast({
        variant: "error",
        title: "Error",
        description: `Failed to add product ! ${error.message}`,
      }) 
    }
  })
    // 1. Define your form.
    const form = useForm<any>({
      resolver: joiResolver(formSchema),
      defaultValues: {
        name: "",
        price: 0,
        desc: "",
        image: "",
        category_id: "",
      },
    })

    const onSubmit =async (value:any)=>{
      const imageFile = imageRef?.current?.files
      const categoryId = allCategory.find((cate:any)=>{
        return cate.name === value.category_id
      })
      mutation.mutate({...value,image : imageFile,category_id: categoryId._id} as any)
    }
    const selectCategory = allCategory && allCategory.length > 0 ? allCategory.map((category:any)=>{
      return <SelectItem className="text-black" key={category._id} value={category.name}>{category.name}</SelectItem>      
    }) : ''
  return (
    <div className="d-flex items-center flex-col bg-white mt-3">
      <h1 className="my-3 text-xl">Add product</h1>
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
          return (
          <FormItem className="mt-2">
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input type="file" className="border rounded" placeholder="shadcn" {...field}  />
            </FormControl>           
            <FormMessage />
          </FormItem>
        )}}
      />
      <FormField
        control={form.control}
        name="category_id"
        render={({ field }) => { 
          return (
            <FormItem className="mt-3">
              
              <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder={allCategory[0]?.name } />
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
    </div>
  )
}

export default Add