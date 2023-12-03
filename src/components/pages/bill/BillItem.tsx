import './bill.css'
import { formatter } from '@/lib/utils'


function BillItem({bill}:any) {              
  return (
    <li key={bill.id}>
    <div className='d-flex item-bill justify-between'>
      <span className='item-bill-name'>{bill.name} ({bill.quantity})</span>
      <span className='item-bill-price'>{formatter.format(bill.total)}</span>
    </div>
  </li>
  )
}

export default BillItem