import {
  CreditCard,
  LogOut,
  User,
  ShoppingCart ,
  LockKeyhole
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from 'react-router-dom';
import { useState,useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { userActions } from "@/store/userSlice";

function NavBarLeft({carts}:any) {
    const dispatch = useDispatch()
    const userRedux = useSelector((state:any)=>state.user.user)
    const [userAuthen , setUserAuthen] = useState<any>()
    let user 
    useEffect(()=>{

        if(localStorage.getItem('user')){
          user = JSON.parse(localStorage.getItem('user')||'')
          setUserAuthen(user)
        }
    },[userRedux])

    const handleLogout = ()=>{
      localStorage.removeItem('user')
      dispatch(userActions.logout())
        setUserAuthen(null as any)
    }

    
  return (
    <>
    {
        userAuthen ? <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="default">{userAuthen.user.username}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

         
          {
            userAuthen?.user?.role === 1 ? <DropdownMenuItem>
            <LockKeyhole  className="mr-2 h-4 w-4" />
            <Link to='admin'>Admin</Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>  : null
          }

          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <Link to='bill'>Billing</Link>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>                 
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>                           
        </DropdownMenuGroup>
        <DropdownMenuSeparator />                      
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span onClick={handleLogout}>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Link className='inline-flex  items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-primary/90 h-10 px-4 py-2' to={'/cart'}>
                        <ShoppingCart className='mr-1'/> {carts && carts.length > 0 ? "( "+  carts.length + " )": ""} 
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
        : <>
                <Link className="inline-flex  items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-primary/90 h-10 px-4 py-2" to='signup'>
                    Sign up
                </Link>
                <Link 
                className="inline-flex border-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-primary/90 h-10 px-4 py-2"
                to='signin'>
                    Sign in
                </Link>
       
       
      
       
          
        </>
    }
           
    </>
  )
}

export default NavBarLeft