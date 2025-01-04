import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
export default function Home({products}) {
  
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch products from the API
  //   fetch("https://fakestoreapi.com/products") // This is your local API route
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //       setLoading(false);  // Data fetched, set loading to false
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //       setLoading(false); // In case of error, stop loading
  //     });
  // }, []); 

  // if (loading) {
  //   return (
  //     <div className="bg-gray-100">
  //       <Head>
  //         <title>My_Amzn</title>
  //       </Head>
  //       <Header className="sticky top-0 z-50 bg-white shadow-md"></Header>
  //       <main className="max-w-screen-xl mx-auto min-h-[800px]">
  //         {/* Loading Screen */}
  //         <div className="text-center mt-10">Loading products...</div>
  //       </main>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-100"  >
      <Head>
        <title>My_Amzn</title>
        <link
          rel="preload"
          href="https://links.papareact.com/6ff"
          as="image"
          type="image/jpeg"
        />
      </Head>

      <Header className="sticky top-0 z-50 bg-white shadow-md"></Header>
      <main className="max-w-screen-xl mx-auto min-h-[800px]">
        {/* banner */}
        <div className="relative min-h-[300px]">
        <Banner></Banner>
        </div>
        
        {/* ProductionFeed */}
        <ProductFeed products={products}></ProductFeed>
      </main>

    </div>
  );
}

export async function getServerSideProps(context){
  const session = await getSession(context)
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res)=> res.json()
  )
  
  return {
    props:{
      products
    },
   
  }

}