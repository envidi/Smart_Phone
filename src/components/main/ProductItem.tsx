import Card from 'react-bootstrap/Card';
import { Button } from '../ui/button';
import { formatter } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { cartAction } from '@/store/cartSlice'; 
import { useToast } from "@/components/ui/use-toast"
import { Link } from 'react-router-dom';

function ProductItem({
    name , price , image , desc, id,id_cate
} :any) {
  const { toast } = useToast()
  const dispatch = useDispatch()

  const handleAddToCart = ()=>{
    dispatch(cartAction.increase({
      name , price , image , desc , id : Math.floor(Math.random() * 10000), id_product : id, quantity : 1,id_cate
    } as any))
    toast({
      variant: "success",
      title: "Success",
      description: "Add item to cart successfully !",
    })

  }

  return (
    <>
    <Card key={id}>
      <Card.Img className='mt-2' variant="top" src={image} />
      <Card.Body>
        <Card.Title>
          <Link to={`/product/${id}`}>
            {name}
          </Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted mt-1">{formatter.format(price)}</Card.Subtitle>
        <Card.Text>
          {desc}
        </Card.Text>
        <Button className='mt-2' variant="secondary" onClick={handleAddToCart}>Add to cart</Button>
      </Card.Body>
    </Card>
   
    </>
  )
}

export default ProductItem