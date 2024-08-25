import React from 'react'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import moment from 'moment';
// import { getDocs, limit } from 'firebase/firestore';
import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore';
import Order from '../components/Order';
import db from '../../firebase';

function Orders({orders}) {

    const { data: session, status } = useSession();
    console.log(orders)

  return (
    <div>
        <Header></Header>
        <main className='max-w-screen-lg mx-auto p-10'>
            <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
            {session?(
                <h2>{orders.length} Orders</h2>
            ): (
                <h2>Please sign in to see your orders</h2>
            )}

            <div className='mt-5 space-y-4 '>
                {orders?.map(order=>(
                    <Order
                    key={order.id}
                    id={order.id}
                    amount={order.amount}
                    items={order.items}
                    timestamp={order.timestamp}
                    images={order.images}
                    ></Order>
                ))}
            </div>
        </main>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context){
    const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY)
   
    // get the users logged in credentials...
   const session = await getSession(context);

   if(!session){
    return{
        props:{},
    }
   }

   //firebase db
//    const firebasestripeOrders = await db
//                         .collection('users')
//                         .doc(session.user.email)
//                         .collection('orders')
//                         .orderBy('timestamp', 'desc')
//                         .get();

const userOrdersRef = collection(db, 'user', session.user.email, 'orders')  
const q = query(userOrdersRef, orderBy('timestamp', 'desc'));

const firestoreOrders = await getDocs(q);

console.log(firestoreOrders.docs)

//stripe orders
const orders = await Promise.all(
firestoreOrders.docs.map(async(order)=>{

    let stripeItems;

      try {
        const stripeResponse = await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 });
        stripeItems = stripeResponse.data || []; // Fallback to empty array if undefined
      } catch (error) {
        console.error(`Failed to fetch Stripe items for order ID ${order.id}:`, error);
        stripeItems = []; // Fallback to empty array on error
      }

    return{
         id:order.id,
         amount:order.data().amount,
         images:order.data().images,
         timestamp: moment(order.data().timestamp.toDate()).unix(),
         items:stripeItems
        }
    })
)

return{
    props:{
        orders
    }
}

}