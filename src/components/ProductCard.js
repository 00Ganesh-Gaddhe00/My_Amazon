import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

function ProductCard({ id, title, price, description, category, image }) {
    const [rating] = useState(
        Math.floor(Math.random() * (5 - 1 + 1) + 1)
    )
    const dispatch = useDispatch()
    const [isClient, setIsClient] = useState(false)
    const [hasPrime] = useState(Math.random() < 0.5)

    useEffect(() => {
        setIsClient(true)
    })

    const additemsToBasket = ()=>{
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

    return (
        <div className='relative flex flex-col m-4 bg-white z-30 p-8 min-h-[400px]'>
        { isClient &&<p className='absolute top-2 right-2 text-xs italic  '>{category}</p>}
           <div className='h-52 flex justify-center'>
            <img
            src={image} 
            alt='ProductImage'
            className='max-h-52 object-contain'
            width={200}
            height={200}
            loading='lazy'
            />
            </div> 
            <h4 className='mt-4 line-clamp-1 '>{title}</h4>
            <p className='absolute top-2 right-2 text-xs italic  '>{category}</p>

            {isClient && <div className='flex min-h-[24px]'>
                {Array(rating).fill().map((_, i) => {
                    return <StarIcon className='h-5 text-yellow-500'></StarIcon>


                })}
            </div>
            }
            <p className='text-xs my-1 line-clamp-2'>{description}</p>

            <div className='mb-3'>
                <Currency quantity={price * 80} currency='INR' ></Currency>
            </div>

            {isClient && hasPrime && (
                <div className='flex items-center space-x-2 min-h-[35px] -mt-5'>
                    <img className='w-14' src='https://www.datocms-assets.com/22642/1699350082-18.png?h=1000&w=1000' alt='prime Tag'></img>
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}


         <button onClick={additemsToBasket} className='mt-auto button'>Add to Cart </button>
        </div>
    )
}

export default ProductCard