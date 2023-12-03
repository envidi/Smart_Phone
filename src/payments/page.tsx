// import { Payment, columns } from "./columns"
import { getProducts } from "@/instance/product"
import { useQuery } from "@tanstack/react-query"

export type Payment = {
    id: string
    name: string
    desc : string
    image : string
    price : number    
    category_id: number
  }
export const data = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
  ]


 

export async function getProductsPage(): Promise<any> {
  // Fetch data from your API here.
  const { isPending, isError, data:datas, error } = useQuery({ queryKey: ['products'], queryFn: getProducts })

  return { isPending, isError, data:datas, error } as any
}
 
