import React from 'react'
import { FaFacebookSquare, FaInstagram, FaUser } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
    {/* upper part */}
    <div className="grid grid-cols-3 p-3">
      {/* logo */}
      <div className="flex items-center">
        <img width={'50px'} height={'50px'} src="https://static.vecteezy.com/system/resources/previews/048/963/897/non_2x/bookstore-with-books-on-the-shelves-and-a-window-png.png" alt="logo" />
        <h1 className="text-2xl font-bold ms-2 md:hidden">BOOK STORE</h1>
      </div>
      {/* title */}
      <div className="md:flex justify-center items-center hidden">
        <h1 className="text-3xl font-bold ms-2 ">BOOK STORE</h1>
      </div>
      {/* login part */}
      <div className="md:flex justify-end items-center hidden">
        {/* social media icons */}
        <FaInstagram/>
        <FaXTwitter className='mx-1'/>
        <FaFacebookSquare/>
        {/* login link */}
        <Link to={'/login'} className='flex items-center border rounded py-2 px-3 ms-3 hover:bg-black hover:text-white'> <FaUser className='me-1'/> Login </Link>
      </div>
    </div>
    {/* lower part */}
    <nav className='bg-black w-full p-3 text-white flex justify-center items-center'>
      <ul className="flex ">
        <li><Link to={'/'} className='md:mx-4'>HOME</Link></li>
        <li><Link to={'/books'} className='md:mx-4'>BOOKS</Link></li>
        <li><Link to={'/contact'} className='md:mx-4'>CONTACT</Link></li>
      </ul>
    </nav>
    </>
  )
}

export default Header