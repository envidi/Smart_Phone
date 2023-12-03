import { Navigate, Outlet } from 'react-router-dom'


function PrivateRoute({isAllowed , children , redirectPath = 'signin'}:any) {
    if(isAllowed && !isAllowed()){
        return <Navigate to={redirectPath}  replace/>
    }
  return  children ? children : <Outlet />
}

export default PrivateRoute