
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//    try{
//   const {items, email} = req.body
  
//   const createProductAndPrice = async (item) => {
//    const stripeProduct = await stripe.products.create({
//      name: item.title,
//      description: item.description,
//      images: [item.image],
//      metadata: {
//        category: item.category,
//        rating: JSON.stringify(item.rating)
//      }
//    });

//    const stripePrice = await stripe.prices.create({
//      unit_amount: Math.round(item.price * 100), // convert to cents
//      currency: 'usd',
//      product: stripeProduct.id
//    });

//    return stripePrice.id;

//  };

//  // Create prices for each product
//  const priceIds = await Promise.all(items.map(createProductAndPrice));
//  console.log(priceIds)

// const itemsarray =  priceIds.map(priceId => ({
//    price:  priceId,
//    quantity: 1,
//  }))

//  const sessin = await stripe.checkout.sessions.create({
//    line_items: itemsarray,
//    mode: 'payment',
//    success_url: `${process.env.HOST}/success`,
//    cancel_url: `${process.env.HOST}/checkout`,
// });

//   res.status(200).json({id:sessin.id})

// }
// catch (err) {
//    console.log(err)
//  }


// }

export default async(req, res)=>{
   const {items, email} = req.body;

   const transformedItems = items.map((item)=>({
      quantity:1,
      price_data:{
        currency:'gbp',
        unit_amount : item.price*100,
      product_data:{
            name:item.title,
            images:[item.image],
            description: item.description,
         },
      },
   }))

  const session = await stripe.checkout.sessions.create({
       payment_method_types:['card'],
       shipping_address_collection:{
             allowed_countries:['GB'],
       },
       line_items: transformedItems,
       mode:'payment',
       success_url:`${process.env.HOST}/success`,
       cancel_url:`${process.env.HOST}/checkout`,
       metadata: {
          email,
          images: JSON.stringify(items.map((item)=>item.image))
       }


  })



  res.status(200).json({id:session.id})
}


// Thhanks for this awesome stuff but i got an error 4.03.00 - error - StripeInvalidRequestError: 
// You cannot use `line_items.amount`, `line_items.currency`, `line_items.name`, `line_items.description`,
//  or `line_items.images` in this API version. Please use `line_items.price` or `line_items.price_data`.