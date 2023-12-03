import {useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import { getCategories } from './instance/category'
import { cateActions } from './store/cateSlice'
import { useDispatch } from 'react-redux'
import { isUserAllowed } from './lib/utils'
import { useQuery} from '@tanstack/react-query'
import { getProducts } from './instance/product'
import { productAction } from './store'
import { getAllUser } from './instance/auth'
import { userActions } from './store/userSlice'

import Main from './components/main/Main'
import ProductDetail from './components/pages/product-detail/ProductDetail'
import Cart from './components/pages/cart/Cart'
import ClientLayout from './layouts/ClientLayout'
import SignUp from './components/pages/auth/signup/SignUp'
import SignIn from './components/pages/auth/signin/SignIn'
import AdminLayout from './layouts/AdminLayout'
import List from './components/pages/admin/product/List'
import Bill from './components/pages/bill/Bill'
import Add from './components/pages/admin/product/Add'
import ListCategory from './components/pages/admin/category/ListCategory'
import AddCategory from './components/pages/admin/category/AddCategory'
import ListUser from './components/pages/admin/user/ListUser'
import AddUser from './components/pages/admin/user/AddUser'
import ListCart from './components/pages/admin/cart/ListCart'
import PrivateRoute from './components/PrivateRoute'



function App() {
  const dispatch = useDispatch()

  let userAuthen :any
  if(localStorage.getItem('user')){
     userAuthen = JSON.parse(localStorage.getItem('user')||'')
  }
  const { isLoading, error, data} = useQuery({
    queryKey: ['products'],
    queryFn : ()=>{
        return getProducts()
    },
    
  })
  const {  data: dataCategory} = useQuery({
    queryKey: ['categories'],
    queryFn : ()=>{
        return getCategories()
    },
    
  })
  const { isLoading:isLoadingUser, data: dataUser} = useQuery({
    queryKey: ['user'],
    queryFn : ()=>{
        return getAllUser()
    },
    
  })
  useEffect(()=>{
    if(data){

      dispatch(productAction.fetchData(data))
    }
  },[data])
  useEffect(()=>{
    if(dataCategory){

      dispatch(cateActions.fetchCategory(dataCategory))
    }

  },[dataCategory])
  useEffect(()=>{
    if(dataUser){
      dispatch(userActions.fetchAllUser(dataUser))
    }
  },[dataUser])
  
    
  

  return (
    <>
    <Routes>
      <Route path='/' element={<ClientLayout/>}>
        <Route  index path='/' element={<Main isLoading={isLoading as any} error={error} data={data}/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/bill' element={<Bill/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/> 
      </Route>
      <Route path='/admin' element={
        <PrivateRoute redirectPath='/' isAllowed={()=>isUserAllowed(userAuthen)}>
          <AdminLayout/>
        </PrivateRoute>
      }> 
        <Route index element={<List/>}/>
        <Route path='product/add' element={<Add/>}/>
        <Route path='category' element={<ListCategory/>}/>
        <Route path='category/add' element={<AddCategory/>}/>
        <Route path='user' element={<ListUser dataUser={dataUser} isLoadingUser={isLoadingUser}/>}/>
        <Route path='user/add' element={<AddUser/>}/>
        <Route path='cart' element={<ListCart/>}/>
        
      </Route>
      

      
    </Routes>
    </>
  )
}

export default App
