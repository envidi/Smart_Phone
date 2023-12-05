// import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useSelector } from "react-redux"
import { changeColorStatus, dateTimeFormat, formatter } from "@/lib/utils"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Edit from "@/components/pages/admin/product/Edit"
import EditCategory from "@/components/pages/admin/category/EditCategory"
import EditUser from "@/components/pages/admin/user/EditUser"
import EditCart from "@/components/pages/admin/cart/EditCart"


export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }

  

export const columnsProduct =( onRemove:any) => [
    {
      accessorKey: "_id",
      header: "Id",
      cell: ({ row }:any) => (
        <div className="capitalize">{row.getValue("_id")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }:any) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }:any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }:any) =>{
        
        const formatPrice= formatter.format(row.getValue("price"))
        
        return <div className="lowercase">{formatPrice}</div>
        },
    },
    {
      accessorKey: "image",
      header: ({ column }:any) => {
        
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Image
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }:any) => <div className="lowercase"><img width={40} src={row.getValue("image")}/></div>,
    },
    {
      accessorKey: "desc",
      header: () => <div className="text-right w-[200px]">Description</div>,
      cell: ({ row }:any) => {
        // const desc = parseFloat(row.getValue("desc"))
        const desc = row.getValue("desc")
   
        // Format the amount as a dollar amount
        // const formatted = new Intl.NumberFormat("en-US", {
        //   style: "currency",
        //   currency: "USD",
        // }).format(desc)
   
        return <div className="text-left font-medium ">{desc}</div>
      },
    }
    ,
    {
      accessorKey: "category_id",
      header: () => <div className="text-right">Category</div>,
      cell: ({ row }:any) => {
        // const desc = parseFloat(row.getValue("desc"))
        const allCategory = useSelector((state:any)=>state.category.categories)
        const nameCategory = allCategory.find((item:any)=>{
          return item._id == row.getValue("category_id")
        })
        
        // Format the amount as a dollar amount
        // const formatted = new Intl.NumberFormat("en-US", {
        //   style: "currency",
        //   currency: "USD",
        // }).format(desc)
   
        return <div className="text-center font-medium">{nameCategory?.name}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }:any) => {
        const payment = row.original
        return (
         
        
          <DropdownMenu>
             <AlertDialog>
         
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 py-3 mt-2 text-white"  onClick={()=>onRemove(payment._id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              
              <Dialog >
              <DialogTrigger asChild>
                <div className="text-sm hover:bg-[#f1f5f9] px-2 py-1.5 rounded">Edit </div>
              </DialogTrigger>
              <DialogContent  className="sm:max-w-[425px] mt-2">

               <Edit payment={payment} />                        

                </DialogContent>
              </Dialog>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <div className="text-sm hover:bg-[#f1f5f9] px-2 py-1.5 rounded">Delete</div>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </AlertDialog>
          </DropdownMenu>
        )
      },
    },
  ]
  export const columnsCarts =( onRemove:any) => [
    {
      accessorKey: "_id",
      header: "Id",
      cell: ({ row }:any) => (
        <div className="capitalize">{row.getValue("_id")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "carts",
      header: "Cart Item",
      cell: ({ row }:any) => (
        <div className="capitalize">Item  { row.getValue("carts").length}</div>
      ),
    },
    {
      accessorKey: "totalCost",
      header: ({ column }:any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total cost
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }:any) =>{
        
        const formatPrice= formatter.format(row.getValue("totalCost"))
        
        return <div className="lowercase">{formatPrice}</div>
        },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }:any) => {
        
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }:any) => <div className="lowercase">{dateTimeFormat( new Date(row.getValue("createdAt")))}</div>,
    },
    {
      accessorKey: "cartStatus",
      header: ({ column }:any) => {
        const allStatus = useSelector((state:any)=>state.cart.statusCart)

        return (       
              <DropdownMenu>
              <DropdownMenuTrigger >
                <div className="d-flex">
                  Status <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                
                <DropdownMenuItem onClick={() => column.setFilterValue('')}>
                              All
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {
                  allStatus.map((status:any,index:any)=>{
                    return <DropdownMenuItem 
                            onClick={() => column.setFilterValue(status)}
                            key={index}>
                              {status}
                            </DropdownMenuItem>
                  })
                }
              
              </DropdownMenuContent>
        </DropdownMenu> 
        )
      },
      cell: ({ row }:any) =>{
        const status = row.getValue("cartStatus")
        return  <div className={`uppercase ${changeColorStatus(status)} font-semibold`}>{status.toUpperCase()}</div>
        },
    },
   
    {
      accessorKey: "id_user",
      header: () => <div className="text-right">User</div>,
      cell: ({ row }:any) => {
        // const desc = parseFloat(row.getValue("desc"))
        const allUser = useSelector((state:any)=>state.user.users)
        const nameUser = allUser.find((item:any)=>{
          return item._id === row.getValue("id_user")
        })
        
   
        return <div className="text-center font-medium">{nameUser?.username}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }:any) => {
        const payment = row.original
        return (
         
        
          <DropdownMenu>
             <AlertDialog>
         
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 py-3 mt-2 text-white"  onClick={()=>onRemove(payment._id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              
              <Dialog >
              <DialogTrigger asChild>
                <div className="text-sm hover:bg-[#f1f5f9] px-2 py-1.5 rounded">Edit </div>
              </DialogTrigger>
              <DialogContent  className="sm:max-w-[425px] mt-2">

               <EditCart payment={payment} />                        

                </DialogContent>
              </Dialog>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <div className="text-sm hover:bg-[#f1f5f9] px-2 py-1.5 rounded">Delete</div>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </AlertDialog>
          </DropdownMenu>
        )
      },
    },
  ]


  export const columnsUser =( onRemove:any) => [
    {
      accessorKey: "_id",
      header: "Id",
      cell: ({ row }:any) => (
        <div className="capitalize">{row.getValue("_id")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }:any) => (
        <div className="capitalize">{row.getValue("username")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }:any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }:any) =>{
        
        
        return <div className="lowercase">{row.getValue("email")}</div>
        },
    },       
    {
      accessorKey: "role",
      header: () => <div className="text-right">Role</div>,
      cell: ({ row }:any) => {
        // const desc = parseFloat(row.getValue("desc"))
        const allRole = useSelector((state:any)=>state.user.roles)
        const nameRole = allRole.find((item:any)=>{
          return item.id == row.getValue("role")
        })
   
        return <div className="text-center font-medium">{nameRole.name}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }:any) => {
        const payment = row.original
        return (
         
        
          <DropdownMenu>
             <AlertDialog>
         
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 py-3 mt-2 text-white"  onClick={()=>onRemove(payment._id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              
              <Dialog >
              <DialogTrigger asChild>
                <div className="text-sm hover:bg-[#f1f5f9] px-2 py-1.5 rounded">Edit </div>
              </DialogTrigger>
              <DialogContent  className="sm:max-w-[425px] mt-2">

               <EditUser payment={payment} />                        

                </DialogContent>
              </Dialog>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <div className="text-sm hover:bg-[#f1f5f9] px-2 py-1.5 rounded">Delete</div>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </AlertDialog>
          </DropdownMenu>
        )
      },
    },
  ]
  export const columnsCategory =( onRemove:any) => [
    {
      accessorKey: "_id",
      header: "Id",
      cell: ({ row }:any) => (
        <div className="capitalize">{row.getValue("_id")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }:any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }:any) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
   
    
   
   
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }:any) => {
        const payment = row.original
        return (
         
        
          <DropdownMenu>
             <AlertDialog>
         
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 py-3 mt-2 text-white"  onClick={()=>onRemove(payment._id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              
              <Dialog >
              <DialogTrigger asChild>
                <div className="text-sm hover:bg-[#f1f5f9] px-2 py-1.5 rounded">Edit </div>
              </DialogTrigger>
              <DialogContent  className="sm:max-w-[425px] mt-2">

               <EditCategory payment={payment} />                        

                </DialogContent>
              </Dialog>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <div className="text-sm hover:bg-[#f1f5f9] px-2 py-1.5 rounded">Delete</div>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </AlertDialog>
          </DropdownMenu>
        )
      },
    },
  ]