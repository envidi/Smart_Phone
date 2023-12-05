import Carousel from 'react-bootstrap/Carousel';
import './carousel.css'

function CarouselComponent() {
  return (
    <Carousel className='h-100 bg-black '>
      <Carousel.Item>
        <img className='image-slide' src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1701743998/mobileworld_banner3_eegorh.jpg" alt="" />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img className='image-slide' src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1701743998/mobileworld_banner-ipad_znjsgq.jpg" alt="" />
        
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img className='image-slide' src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1701743998/s23_banner_mei7tx.jpg" alt="" />
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselComponent