import React from 'react'
import ProductCard from './ProductCard'

function ProductFeed({products}) {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  md:-mt-52 mx-auto'>
<<<<<<< HEAD
      {products.slice(0,4)
       .map(({id,title, price, description, category, image})=>{
=======
   {products.map(({id,title, price, description, category, image})=>{
>>>>>>> a321cf85289f8c689ed4114cb79a45ecfded72a0
      return <ProductCard
                key={id}
                id ={id}
                title={title}
                price={price}
                description={description}
                category={category}
<<<<<<< HEAD
                image={image} 
=======
                image={image}
>>>>>>> a321cf85289f8c689ed4114cb79a45ecfded72a0
      
             />
   })}

<<<<<<< HEAD
  <img className='md:col-span-full ' src='https://links.papareact.com/dyz' alt=''/>

   <div className='md:col-span-2'>
   {products.slice(4,5)
       .map(({id,title, price, description, category, image})=>{
      return <ProductCard
                key={id}
                id ={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image} 
      
             />
   })}
   </div >

   {products.slice(5, products.length)
       .map(({id,title, price, description, category, image})=>{
      return <ProductCard
                key={id}
                id ={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image} 
      
             />
   })}
  
=======
>>>>>>> a321cf85289f8c689ed4114cb79a45ecfded72a0
    </div>
  )
}

export default ProductFeed