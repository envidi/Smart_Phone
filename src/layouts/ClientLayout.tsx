import {Outlet} from 'react-router-dom'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'



function ClientLayout() {
 
  return  <>
        <Header/>
       <Outlet/> 
        <Footer/>
    </>
}

export default ClientLayout