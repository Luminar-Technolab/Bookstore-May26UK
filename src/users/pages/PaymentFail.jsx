import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa'

function PaymentFail() {
  return (
    <>
        <Header/>
        <div className='container min-h-screen flex justify-center items-center'>
            <div className="md:grid grid-cols-2 px-20 justify-center items-center my-10">
                <div>
                    <h1 className="text-red-600 md:text-3xl font-bold">Sorry!!! Payment is Decliend...</h1>
                    <p className="text-2xl my-10">we appologize for the inconvieince caused and appreciate your visit to Bookstore...</p>
                    <Link to={'/books'} className='flex bg-blue-600 p-2 text-white font-bold w-60 items-center'> <FaBackward className='me-3'/> Explore More Books...</Link>
                </div>
                <div className="flex justify-center items-center">
                    <img src="https://cdn.dribbble.com/users/107759/screenshots/4594246/15_payment-error.gif" alt="payment failed" />
                </div>
            </div>
        </div>
        <Footer/>
        </>
  )
}

export default PaymentFail