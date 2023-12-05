import './bill.css'
import {  useSelector} from 'react-redux'
import { Toaster } from '../../ui/toaster'
import {useQuery} from '@tanstack/react-query'
import Spinner from 'react-bootstrap/Spinner';
import {  getCartsByStatus } from '@/instance/cart'
import BillPayList from './BillPayList'
import { useEffect, useState } from 'react'

function Bill() {    
  const [userState , setUserState ] = useState<any>()
  const userData = useSelector((state:any)=>state.user.user)
  const { isPending, isError, data:datas = [], error } = useQuery({ queryKey: ['carts'], queryFn: getCartsByStatus })
  useEffect(()=>{
    if(localStorage.getItem('user')){
      setUserState( JSON.parse(localStorage.getItem('user')||''))
    }else{
      setUserState(null)
    }
  },[userData,datas])
  console.log(datas)
 

  

  const billUser = datas?.filter((data:any)=>{
    
    return data.id_user === userState?.user?._id 
  })
 
  if(isPending){
    return  <div className='container-loading'>
                <Spinner animation="border" variant="dark" />
            </div>
  }
  if(isError){
    return <div className='container-loading'>{error as any}</div>
  }
  

  
  
  return (
    <div className={`container-cart ${billUser && billUser.length > 3 ? "" : "calc-height"}`}>
        <h2 className='text-2xl'>Your Bill</h2>
        <div className="contain-bill">
        {
          billUser&&billUser.length>0 ? billUser?.map((bill:any,index:any)=>{
            return <BillPayList 
                    key={bill._id} 
                    index={index}
                    billUser={bill}/>
          }) : <div className='text-lg w-[400px]'>No bill for you or login to checkout</div>
        }
        </div>
        <Toaster  />
    </div>
  )
}

export default Bill