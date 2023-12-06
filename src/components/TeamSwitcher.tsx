import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export default function TeamSwitcher({ className,categories,setValueSelect,valueSelect }: any) {
  
  const handlevalueChange = (value:any)=>{
    setValueSelect(value)
  }

  return (
    <Select onValueChange={handlevalueChange} value={valueSelect} >
    <SelectTrigger className={`w-[180px] ${className}` }>
      <SelectValue placeholder="Select a categories" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Categories</SelectLabel>
        <SelectItem  value='all'>All</SelectItem>
        {
          categories.map((category:any) =>{
            return <SelectItem key={category._id} value={category.name}>{category?.name || 'Uncategories'}</SelectItem>
          })
        }
    
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}