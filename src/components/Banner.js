import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader



function Banner() {
  return (
    <div className='relative'>
       
        <div className='absolute  w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20  '/>
        <Carousel 
         autoPlay
         infiniteLoop
         showStatus={false}
         showIndicators={false}
         showThumbs={false}
         interval={5000}
        >
        <div>
           <img className='relative h-[500px]' loading='eager' src='https://links.papareact.com/6ff' alt='Banner img'></img>
        </div>

        <div>
           <img className='relative h-[500px]' loading='lazy' src='https://links.papareact.com/gi1' alt='Banner img'></img>
        </div>

        <div>
           <img className='relative h-[500px]' loading='lazy' src='https://links.papareact.com/7ma' alt='Banner img'></img>
        </div>

</Carousel>
    </div>
  )
}

export default Banner