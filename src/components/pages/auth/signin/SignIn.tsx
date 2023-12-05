import './signin.css'
import '../icon.css'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
import { signIn } from '@/instance/auth'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from '@/components/ui/toaster'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userActions } from '@/store/userSlice'
import { useEffect, useState } from 'react'
import { EMAIL_ADMIN, PASSWORD_ADMIN } from '@/lib/utils'


function SignIn() {
  const dispatch = useDispatch()
  const [isClickCheckBox,setIsClickCheckBox] = useState<boolean>(false)
  const {toast} = useToast()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn : (user:any)=>signIn(user),
    onSuccess: (data)=>{
      localStorage.setItem('user',JSON.stringify(data))
      if(localStorage.getItem('user')){
        const userAuthen = JSON.parse(localStorage.getItem('user')||'')
        dispatch(userActions.fetchUser(userAuthen))

      }
      navigate('/')
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
    
    email:Joi.string().email({tlds:{allow: false}}).message('Email is not invalid').messages({
      'string.empty': 'Required'
    }),
    password:Joi.string().min(6).max(20).messages({
      'string.empty': 'Required'
    }),
   

  })

  const handleAccountAdmin = ()=>{
    setIsClickCheckBox(!isClickCheckBox)
    
  }
 

  const form = useForm<any>({
    resolver : joiResolver(schema),
    defaultValues: {
      email: isClickCheckBox ? EMAIL_ADMIN : '',
      password: isClickCheckBox ? PASSWORD_ADMIN : '',
    },
  })

  useEffect(() => {
    if(isClickCheckBox){
      form.reset({
        email: EMAIL_ADMIN,
        password : PASSWORD_ADMIN
      })
    }else{
      form.reset({
        email: '',
        password : ''
      })
    }
    
  }, [isClickCheckBox])
  

  const onSubmit = (value:any)=>{
    
    const {confirmPassword , ...other} = value
    const user = {...other}
    mutation.mutate(user)

  }
  return (
    <div className="wrapper " >
    <div className="inner my-5">       
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="form-signup">
    <h3 className='h3-signup'>Your Account?</h3>
      
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => {
          field.value = isClickCheckBox ? EMAIL_ADMIN : field.value;
          console.log(field)
          return (
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
        )}}
      />

    <FormField
        control={form.control}
        name="password"
        render={({ field }) => {
          field.value = isClickCheckBox ? PASSWORD_ADMIN : field.value;
          return (
           <FormItem className="mt-2">
            {/* <FormLabel>Password</FormLabel> */}
            <FormControl>
              <div className='d-flex border-b focus-within:border-sky-300'>
                <span className="span-icon lnr lnr-lock"></span>
                <Input type="password"  placeholder="Password..." {...field} />
              </div>
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>                    
        )}}
      />
       <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="terms" onCheckedChange={handleAccountAdmin} />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Account Admin
          </Label>
    </div>
      <Button className='mt-3 button-signup' variant="sign_up" type="submit">
        <span>Login</span>
      </Button>
    </form>
  </Form>
  </div>
  <Toaster/>
  </div>
  )
}

export default SignIn