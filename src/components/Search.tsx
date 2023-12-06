import { Input } from "./ui/input"

export function Search({setSearch,className}:any) {
 
    const handleChange = (e:any)=>{
      setSearch(e.target.value)
    }
   

  return (
        <>
      <Input
        type="search"
        placeholder="Search..."
        className={`md:w-[100px] lg:w-[300px] border rounded ${className}`}
        onChange={handleChange}
      />
      
    
</>
    
  )
}