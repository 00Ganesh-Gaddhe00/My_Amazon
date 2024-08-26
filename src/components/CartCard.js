import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
import { removeFromBasket } from '../slices/basketSlice';

function CartCard({id, title, price, description, category, image, rating, hasPrime}) {

  const dispatch = useDispatch()
  
  const additemstocart = ()=>{
    const product = {
        id,
       title, 
       price, 
       description, 
       category, 
       image,
       rating,
       hasPrime 
       }
       dispatch(addToBasket(product))
  }
  
  const removeItem = ()=>{
    
   dispatch(removeFromBasket({id}))
  }

    return (
    <div className='grid grid-cols-5 items-center'>
     <Image
      src={image}
      height={100}
      width={100}
      objectFit='contain'
      className='ml-10'
     />
      {/* middle */}
     <div className='col-span-3 mx-5'>
        <p className='text-sm mt-5'>{title}</p>
        <div className='flex mt-2'>
            {Array(rating).fill().map((_,i)=>{
                return <StarIcon key={i} className='h-4 text-yellow-500'></StarIcon>
            })}
        </div>
        <p className='text-xs line-clamp-3'>{description}</p>
        {/* <Currency quantity={price*80} currency='INR'></Currency> */}
        
        { hasPrime && (
            <div className='flex items-center space-x-1'>
            <img loading='lazy' className='w-12' src='https://www.datocms-assets.com/22642/1699350082-18.png?h=1000&w=1000' alt='PrimeTag'/>
            <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
            </div>
        )

        }
     </div>
     <div className='flex flex-col space-y-2 text-sm justify-self-end'>
     <Currency quantity={price*80} currency='INR'></Currency>

     <button onClick={additemstocart}  className='flex items-center justify-center button mt-3 h-8'>Add +1</button>
     <button onClick={removeItem} className='flex items-center justify-center button mt-auto h-8'> Remove from Cart</button>

     </div>
    </div>
  )
}

export default CartCard