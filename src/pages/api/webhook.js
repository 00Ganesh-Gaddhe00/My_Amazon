import { buffer } from "micro"
import * as admin from 'firebase-admin'

//secure a connection to FireBase from the backend
const serviceAccount = require('../../../permissions.json')
const app = !admin.apps.length ? admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
}):admin.app();

//Establish connection to Stripe STRIPE_SECRET_KEY
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = async (session)=>{
    //console.log('Fulfilling order', session)
    return app.firestore()
              .collection('user')
              .doc(session.metadata.email)
              .collection('orders')
              .doc(session.id)
              .set({
                amount: session.amount_total/100,
                images:JSON.parse(session.metadata.images),
                timestamp:admin.firestore.FieldValue.serverTimestamp(),
              })
              .then(()=>{
                console.log(`Success:Order ${session.id} had been added to the DB`)
              })
}

export default async (req,res)=>{
    if(req.method === 'POST'){
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"]

        let event
       
        //Verify that the Event came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        } catch (err){
            console.log('Error', err.message)
            return res.status(400).send(`Webhook verification error: ${err.message}`)
        }

        //Handle the checkout.session.completed event
        if(event.type === 'checkout.session.completed'){
            const session = event.data.object;
            
            //Fulfill the order
            return fulfillOrder(session)
                  .then(()=>res.status(200))
                  .catch((err)=>res.status(400).send(`webhook fullfillment Error: ${err.message}`))
        }
    }
}

export const config = {
    api:{
        bodyParser: false,
        externalResolver:true 
    }
}