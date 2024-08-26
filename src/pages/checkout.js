import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CartCard from '../components/CartCard'
import Currency from 'react-currency-formatter';
import { useSession, signIn, signOut } from "next-auth/react"
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromise  = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function Checkout() {
  const { data: session } = useSession()
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)

  const createcheckoutsession = async()=>{

  //  console.log(session.user.email)
      // call the backend to create a checkout session!
    const checkoutSession = await axios.post('/api/checkout_sessions', {
      items:items,
      email:session.user.email,
       })

      
        const stripe = await stripePromise

      // Redirect user/customer to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId:checkoutSession.data.id
        
      })
      if(result.error){
        alert(result.error.message)
      }
       
      
     
    }
     
      
  

  return (
    <div className='bg-gray-100'>
     <Header></Header>
     <main className='lg:flex max-w-screen-xl mx-auto'>
      {/* left */}
   <div className='flex-grow m-4 mt-2 shadow-sm' >
   <Image 
   src='https://links.papareact.com/ikj' 
   width={750}
   height={150}
   objectFit='contain'
   />
<div className='flex flex-col p-5 space-y-10 bg-white  '>
    <h1 className='text-3xl border-b pb-2'>
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
      <div className='flex flex-col bg-white shadow-md p-10 lg:pt-32'>
         {items.length>0 && (
            <>
             <h2 className='whitespace-nowrap text-sm'>Subtotal ({items.length} items):{' '}
              <span className='font-bold text-base'>
               <Currency quantity={total*80} currency='INR'></Currency>
                
              </span>
                
             </h2>
            <button onClick={createcheckoutsession}
            role='link' disabled={!session} className= {`button mt-3 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
              {!session ? 'sign in to checkout': 'Proceed to checkout'}
            </button>
           </>
         )  }
      </div>
     </main>
    </div>
  )
}

export default Checkout