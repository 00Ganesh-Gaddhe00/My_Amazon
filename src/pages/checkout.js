import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
import CartCard from '../components/CartCard'


function Checkout() {
const items = useSelector(selectItems)

  return (
    <div className='bg-gray-100'>
     <Header></Header>
     <main className='lg:flex max-w-screen-xl mx-auto'>
      {/* left */}
   <div className='flex-grow m-5 shadow-sm' >
   <Image 
   src='https://links.papareact.com/ikj' 
   width={1020}
   height={250}
   objectFit='contain'
   />
<div className='flex flex-col p-5 space-y-10 bg-white  '>
    <h1 className='text-3xl border-b pb-4'>
        {items.length === 0 ? "Your Cart is Empty" : 'Shopping Cart' }
    </h1>
     {items.map((items,i)=>{
        return <CartCard
          key={i}
          id ={items.id}
          title={items.title}
          price={items.price}
          description={items.description}
          category={items.category}
          image={items.image}
          rating = {items.rating}
          hasPrime = {items.hasPrime}
        
        ></CartCard>
     })}

</div>
   </div>


      {/* right */}
      <div>

      </div>
     </main>
    </div>
  )
}

export default Checkout