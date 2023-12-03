import './signup.css'
import '../icon.css'

import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from 'joi'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,  
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { addUser } from '@/instance/auth'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from '@/components/ui/toaster'

function SignUp() {
  const {toast} = useToast()
  const mutation = useMutation({
    mutationFn : (user:any)=>addUser(user),
    onSuccess: ()=>{

      toast({
        variant: "success",
        title: "Success",
        description: "Sign up successfully !",
      })
    },
    onError:(error:any)=>{
      toast({
        variant: "error",
        title: "Error",
        description: `${error?.response?.data}`,
      })
    }
  })
  const schema = Joi.object({
    username : Joi.string().required().messages({
      'string.empty': 'Required'
    } as any),
    email:Joi.string().email({tlds:{allow: false}}).message('Email is not invalid').messages({
      'string.empty': 'Required'
    }),
    password:Joi.string().min(6).max(20).messages({
      'string.empty': 'Required'
    }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).label('Confirm Password').messages({
      'any.only':'Confirm Password must match Password.'
    })
   ,

  })

  const form = useForm<any>({
    resolver : joiResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  

  const onSubmit = (value:any)=>{
    const {confirmPassword , ...other} = value
    const user = {...other, role : 2}
    mutation.mutate(user)

  }
  return (
    <div className="wrapper " >
    <div className="inner my-5">       
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="form-signup">
    <h3 className='h3-signup'>New Account?</h3>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
           <FormItem className="mt-2">
            {/* <FormLabel>Username</FormLabel> */}
            <FormControl>
              <div className='d-flex border-b focus-within:border-sky-300'>
                <span className="span-icon lnr lnr-user"></span>
                <Input className=''  placeholder="Username" {...field} />
              </div>
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>
          
          
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
           <FormItem className="mt-2">
            {/* <FormLabel>Email</FormLabel> */}
            <FormControl>
              <div className='d-flex border-b focus-within:border-sky-300'>
                <span className="span-icon lnr lnr-envelope"></span>
                <Input  placeholder="Email..." {...field} />
              </div>
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>                    
        )}
      />

    <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
           <FormItem className="mt-2">
            {/* <FormLabel>Password</FormLabel> */}
            <FormControl>
              <div className='d-flex border-b focus-within:border-sky-300'>
                <span className="span-icon lnr lnr-lock"></span>
                <Input  placeholder="Password..." {...field} />
              </div>
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>                    
        )}
      />
      <FormField
        
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
           <FormItem className="mt-2">
            {/* <FormLabel>Confirm Password</FormLabel> */}
            <FormControl>
              <div className='d-flex border-b focus-within:border-sky-300'>
                <span className="span-icon lnr lnr-lock"></span>
                <Input  placeholder="Confirm Password..." {...field} />
              </div>
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>                    
        )}
      />
      <Button className='mt-3 button-signup' variant="sign_up" type="submit">
        <span>Register</span>
      </Button>
    </form>
  </Form>
  </div>
  <Toaster/>
  </div>
  )
}

export default SignUp