import React from 'react'
import Image from 'next/image'
import { SearchIcon,ShoppingCartIcon, MenuIcon } from '@heroicons/react/outline';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

function Header() {

    const { data: session } = useSession()
    const router = useRouter();
    const items = useSelector(selectItems)
 
  return (
    <header>
        {/* 1st nav */}
        <div className=' flex items-center bg-amazon_blue p-1 flex-grow py-2 ' >
            <div className=' px-5 mt-2 mr-5 flex items-center flex-grow sm:flex-grow-0' >
            <Image 
            onClick={()=>router.push('/')} 
            alt='logo'
            src='https://links.papareact.com/f90'
            width={100}
            height={20}
            objectFit='contian'
            className=' cursor-pointer '
            />
            </div>

            {/* search */}
            <div className='hidden sm:flex items-center rounded-md h-10 flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500' >
                <input className=' p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none px-4  ' type='text'/>
                <SearchIcon className=' h-12 p-4' />
                
            </div>
            {/* right */}
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap '>
                <div onClick={!session? signIn: signOut} className=' link'>
                    <p>
                        {session? `Hello, ${session.user.name}`: 'Sign In'}
                    </p>
                    <p className='font-extrabold md:text-sm'>Account & Lists</p>
                </div>
                <div onClick={()=>router.push('/orders')} className=' link'>
                    <p>Returns</p>
                    <p className='font-extrabold md:text-sm'>& Orders</p>
                </div>
                <div onClick={()=>router.push('/checkout')} className='relative link flex items-center'>
                      <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold '>
                        {items.length}
                      </span>
                      <ShoppingCartIcon className='h-10' ></ShoppingCartIcon>
                      <p className=' hidden md:inline font-extrabold md:text-sm mt-2 '>Cart</p>
                </div>
            </div>
        </div>

        {/* 2nav */}
        <div className='flex items-center space-x-3 p-2 pl-6  bg-amazon_blue-light text-white text-sm'>
            <p className='link flex items-center'>
            <MenuIcon className='h-6 mr-1'></MenuIcon>
            All
            </p>
            <p className='link'>Prime video</p>
            <p className='link'>Amazon Business</p>
            <p className='link'>Today's Deals</p>
            <p className='link hidden lg:inline-flex'>Electronics</p>
            <p className='link hidden lg:inline-flex'>Food & Grocery</p>
            <p className='link hidden lg:inline-flex'>Prime</p>
            <p className='link hidden lg:inline-flex'>Buy Again</p>
            <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
            <p className='link hidden lg:inline-flex'>Health & personal care</p>

        </div>
    </header>
  )
}

export default Header