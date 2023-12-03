import { CANCELLED, COMPLETED, DELETED, PENDING, PROCESS } from "@/store/cartSlice";
import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
export function dateTimeFormat(ngay:any) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  const ngayChuyenDoi = new Intl.DateTimeFormat('vi-VN', options as any).format(ngay);
  return ngayChuyenDoi.replace(",", "").replace(/:/g, "h");
}
export const uploadFile =async (files:any)=>{
  if( files){
        let urlImage
      const CLOUD_NAME = "dsmy4ogdj";
      const PRESET_NAME = "envidi";
      const FOLDER_NAME = "React-Advance";
      const API_UPLOAD = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      const formData = new FormData();
      formData.append("upload_preset",PRESET_NAME);
      formData.append("folder",FOLDER_NAME)

      for( const file of files){
        formData.append("file",file)
        const response = await axios.post(API_UPLOAD,formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        })

        urlImage = response.data.secure_url

      }

      return urlImage
  }else{
    console.log("Null image")
  }
}

export const isUserAllowed = (user:any)=>{
  if(user.user.role === 1){
    return true
  }
  // const userRoles = Array.isArray(roles)? roles : [roles]
  // return userRoles.some((role:any)=>user.roles.includes(role))
  return false
}

export const changeColorStatus = ( status:any)=>{
  let classColor = ''
  switch (status) {
    case PENDING:
      return classColor = 'text-yellow-400'
    case PROCESS:
      return classColor = 'text-orange-400'
    case COMPLETED:
      return classColor = 'text-green-400'
    case CANCELLED:
      return classColor = 'text-red-400'   
    case DELETED:
      return classColor = 'text-purple-500'     
                
    default:
      return classColor = 'text-yellow-400'
  }
}

