import { Search } from '@/components/Search'
import TeamSwitcher from '@/components/TeamSwitcher'

function SubBar({setSearch,categories,setValueSelect,valueSelect}:any) {
  return (
    <div className="border-b px-12">
    <div className="flex h-16 items-center justify-center px-4">
      <TeamSwitcher valueSelect={valueSelect} categories={categories} setValueSelect={setValueSelect} />
      <Search setSearch={setSearch} className="ms-2" />
      
    </div>
  </div>

  )
}

export default SubBar