import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { purchaseBookAPI, viewBookAPI } from '../../services/allAPI'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaBackward, FaCamera, FaEye } from 'react-icons/fa'
import axiosInstance from '../../api/axiosInstance'
import {loadStripe} from '@stripe/stripe-js'

function View() {

  const [modal,setModal] = useState(false)
  const [bookDetails,setBookDetails] = useState({})
  const {id} = useParams()
  // console.log(bookDetails);
  

  useEffect(()=>{
    getBookDetails()
  },[])

  const getBookDetails = async ()=>{
    const result = await viewBookAPI(id)
    setBookDetails(result.data)
  }

  const purchaseBook = async ()=>{
    const stripe = loadStripe(import.meta.env.VITE_STRIPE_PK)
    //api call - update book buyer mail
    const result = await purchaseBookAPI(id)
    const {checkoutURL} = result.data
    window.location.href = checkoutURL
  }

  return (
    <>
    <Header/>
    <div className="md:m-10 m-5">
      <div className="border p-5 shadow border-gray-200">
          <div className="md:grid grid-cols-4 gap-x-10">
            <div className="col-span-1">
              <img src={bookDetails?.imageURL} alt="book" className="w-full" />
            </div>
            <div className="col-span-3">
              <div className="flex justify-between  mt-5">
                <h3 className="text-2xl font-bold"> {bookDetails?.title} </h3>
                <button onClick={()=>setModal(true)} className="text-gray-400"> <FaEye/> </button>
              </div>
              <h3 className="text-xl font-bold text-blue-600 my-5"> {bookDetails?.author} </h3>
              <div className="md:grid grid-cols-3 gap-5 my-10">
                <p className="font-bold">Category : {bookDetails?.category} </p>
                <p className="font-bold">Original Price : {bookDetails?.price} </p>
                <p className="font-bold">Seller Contact : {bookDetails?.sellerMail} </p>
              </div>
              <p className="font-bold text-lg">Abstract : {bookDetails?.abstract} </p>
              <div className="flex justify-end mt-10">
                <Link to={'/books'} className='bg-blue-800 text-white p-2 flex items-center me-5'> <FaBackward className='me-2'/> Back</Link>
                <button onClick={purchaseBook} className='bg-green-800 text-white p-2 flex items-center font-bold'>Buy ${bookDetails?.discountPrice} </button>
              </div>
            </div>
          </div>
      </div>
    </div>
    {/* modal */}
    {
      modal &&
      <div>
          <div className="fixed inset-0 bg-gray-500/75 w-full h-full" onClick={()=>setModal(false)}>
            {/* off canvas form */}
            <div className='flex justify-center items-center min-h-screen'>
              <div className="bg-white rounded-2xl md:w-250 w-100" >
                {/* header */}
                <div className="bg-black text-white px-3 py-4  text-2xl">
                  <h1>Book Images</h1>
                </div>
                {/* body */}
                <div className="relative p-5">
                  <p className="text-blue-700 flex items-center"> <FaCamera className='me-3'/> Camera clicks of the book</p>
                  <div className="md:flex flex-wrap my-4">
                    {/* duplicate book images */}
                    {
                      bookDetails?.uploadImages?.length>0 ?
                        bookDetails?.uploadImages?.map(filename=>(
                          <img className='md:w-75 w-25 md:me-2 mb-3 md:mt-0' src={`${axiosInstance.defaults.baseURL}/uploads/${filename}`} alt="book" />
                        ))
                      :
                      <div className="my-5 font-semi-bold">Images are not available!!!</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    }
    <Footer/>
    </>
  )
}

export default View