import React from 'react';
import dynamic from "next/dynamic";

// Dynamically import ProductCard
const ProductCard = dynamic(() => import('./ProductCard'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-[400px] w-full rounded-md"></div>, // Fallback placeholder
});

function ProductFeed({ products }) {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:-mt-72 mx-auto'>
      {products.length === 0
        ? Array(8)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className='animate-pulse bg-gray-200 min-h-[400px] w-full rounded-md'
              ></div>
            ))
        : products.slice(0, 4).map(({ id, title, price, description, category, image }) => (
            <ProductCard
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          ))}

      <div className='md:col-span-full'>
        <img
          src='https://links.papareact.com/dyz'
          alt='Banner'
          className='w-full object-cover rounded-md'
          style={{
            maxHeight: '500px',
            width: '100%',
            display: 'block',
          }}
        />
      </div>

      <div className='md:col-span-2'>
        {products.slice(4, 5).map(({ id, title, price, description, category, image }) => (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
      </div>

      {products.slice(5).map(({ id, title, price, description, category, image }) => (
        <ProductCard
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          category={category}
          image={image}
        />
      ))}
    </div>
  );
}

export default ProductFeed;
