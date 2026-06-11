import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Books() {
  const [toggle,setToggle] = useState(false)
  return (
    <>
    <Header/>
    <div className='flex flex-col justify-center items-center my-5'>
      <h1 className="text-3xl font-bold my5">All Books</h1>
      <div className="flex my-5">
        <input type="text" placeholder='Search Book by Title' className="p-2 border border-gray-200 w-100" />
        <button className="bg-blue-900 p-2 text-white">Search</button>
      </div>      
    </div>
          {/* grid - filter & books */}
    <div className="md:grid grid-cols-4 p-5 md:px-40 mb-10">
      <div className="col-span-1">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Filter</h1>
          <button onClick={()=>setToggle(!toggle)} className="font-bold text-2xl md:hidden">
            <FaBars/>
          </button>
        </div>
        {/* category */}
        <div className={toggle? "block":"hidden md:block"}>
          <div className="mt-3">
            <label htmlFor="all">
              <input type="radio" name='filter' id="all" /> All
            </label>
          </div>
          {/* duplicate according to books category */}
          <div className="mt-3">
            <label htmlFor="category">
              <input type="radio" name='filter' id="category" /> category
            </label>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="md:grid grid-cols-4 w-full mt-5 md:mt-0">
          {/* card 1*/}
          <div className="shadow rounded p-2 m-2 ">
            <img width={'100%'} height={'300px'} src="https://tse4.mm.bing.net/th/id/OIP.DM7rcrtxuQKeb4xhB7WsogHaFj?pid=Api&P=0&h=180" alt="book" />
            <div className="flex flex-col justify-center items-center mt-4">
              <h2 className="text-xl font-bold">author</h2>
              <h3 className="text-lg">title</h3>
              <Link to={`/books/id`} className='bg-blue-700 p-2 text-white mt-2'>View More...</Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Books