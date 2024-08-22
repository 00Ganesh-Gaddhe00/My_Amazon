import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';

function ProductCard({ id, title, price, description, category, image }) {
    const [rating] = useState(
        Math.floor(Math.random() * (5 - 1 + 1) + 1)
    )

    const [isClient, setIsClient] = useState(false)
    const [hasPrime] = useState(Math.random() < 0.5)

    useEffect(() => {
        setIsClient(true)
    })


    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
        { isClient &&<p className='absolute top-2 right-2 text-xs italic  '>{category}</p>}
           <div className='h-52 flex justify-center'>
            <img
            src={image} 
            alt='ProductImage'
            className='max-h-52 object-contain'
            />
            </div> 
            <h4 className='my-3 line-clamp-1 '>{title}</h4>
            <p className='absolute top-2 right-2 text-xs italic  '>{category}</p>

            {isClient && <div className='flex'>
                {Array(rating).fill().map((_, i) => {
                    return <StarIcon className='h-5 text-yellow-500'></StarIcon>


                })}
            </div>
            }
            <p className='text-xs my-2 line-clamp-2'>{description}</p>

            <div className='mb-5'>
                <Currency quantity={price * 80} currency='INR' ></Currency>
            </div>

            {isClient && hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-14' src='https://www.datocms-assets.com/22642/1699350082-18.png?h=1000&w=1000' alt='prime Tag'></img>
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}


         <button className='mt-auto button'>Add to Basket </button>
        </div>
    )
}

export default ProductCard