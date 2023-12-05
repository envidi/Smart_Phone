import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"

import { Link } from "react-router-dom"
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {Menu,Coffee,Layers3 ,ShoppingCart,User} from 'lucide-react'


function AdminLayout() {
  return (
    <div>
          <Sheet key='left'>
          <SheetTrigger asChild className="ms-5 mt-4">
            <Button variant="outline">
              <Menu/>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className="bg-sideBar text-colorSidebar w-[300px]">
            <SheetHeader>
              <SheetTitle className="text-white mb-2">
                <Link to='/'>Smart World</Link>
              </SheetTitle>
              {/* <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription> */}
            </SheetHeader>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className={`  hover:text-white border-[#404c57]`}>
                <AccordionTrigger className="font-normal hover:no-underline hover:bg-hoverSideBar px-4 py-3">
                  <div className="d-flex items-end gap-2">
                  <Coffee size={20} />Product
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <li className="hover:bg-[#3f4b57] hover:text-[#b3bfd0]  px-4 py-2">
                    <Link to='/admin' className="text-base">
                      List
                    </Link>
                    </li>
                    <li className="hover:bg-[#3f4b57] hover:text-[#b3bfd0]  px-4 py-2">
                      <Link to='/admin/product/add' className="text-base">
                        Add
                      </Link>
                    </li>
                  </ul>
                
                
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className={`hover:text-white border-[#404c57]`}>
                <AccordionTrigger className="font-normal hover:no-underline hover:bg-hoverSideBar px-4 py-3">
                  <div className="d-flex items-end gap-2">
                  <Layers3 size={20} /> Category
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                <ul>
                    <li className="hover:bg-[#3f4b57] hover:text-[#b3bfd0]  px-4 py-2">
                    <Link to='/admin/category' className="text-base">
                      List
                    </Link>
                    </li>
                    <li className="hover:bg-[#3f4b57] hover:text-[#b3bfd0]  px-4 py-2">
                      <Link to='/admin/category/add' className="text-base">
                        Add
                      </Link>
                    </li>
                  </ul>
                
                
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className={`hover:text-white border-[#404c57]`}>
                <AccordionTrigger className="font-normal hover:no-underline hover:bg-hoverSideBar px-4 py-3">
                  <div className="d-flex items-end gap-2">
                  <User size={20} /> User
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                <ul>
                    <li className="hover:bg-[#3f4b57] hover:text-[#b3bfd0]  px-4 py-2">
                    <Link to='/admin/user' className="text-base">
                      List
                    </Link>
                    </li>
                    <li className="hover:bg-[#3f4b57] hover:text-[#b3bfd0]  px-4 py-2">
                      <Link to='/admin/user/add' className="text-base">
                        Add
                      </Link>
                    </li>
                  </ul>
                
                
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className={`hover:text-white border-[#404c57]`}>
                <AccordionTrigger className="font-normal hover:no-underline hover:bg-hoverSideBar px-4 py-3">
                <div className="d-flex items-end gap-2">
                  <ShoppingCart  size={20} /> Cart
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                <ul>
                    <li className="hover:bg-[#3f4b57] hover:text-[#b3bfd0]  px-4 py-2">
                    <Link to='/admin/cart' className="text-base">
                      List
                    </Link>
                    </li>
                   
                  </ul>
                
                
                </AccordionContent>
              </AccordionItem>
            </Accordion>
           
          </SheetContent>
        </Sheet>
        <Outlet/>
    </div>
  )
}

export default AdminLayout