import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaCircleCheck } from 'react-icons/fa6'
import Edit from '../components/Edit'
import UploadBook from '../components/UploadBook'
import BookStatus from '../components/BookStatus'
import Purchase from '../components/Purchase'

function Profile() {
  const [currentTab,setCurrentTab] = useState(1)
  return (
    <>
    <Header/>
    <div className="bg-black" style={{height:'200px'}}></div>
    <div style={{width:'230px',height:'230px',borderRadius:'50%',marginTop:'-130px',marginLeft:'70px'}} className="bg-white p-3">
      <img width={'200px'} height={'200px'} style={{borderRadius:'50%'}} src="https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png" alt="profile" />
    </div>
    <div className="md:flex justify-between px-20 mt-5">
      <div className="flex items-center">
        <h1 className="font-bold md:text-3xl text-2xl">username</h1>
        <FaCircleCheck className='text-blue-600'/>
      </div>
      <Edit/>
    </div>
    <p className="text-xl text-justify px-20 mt-5">✨ bio</p>
    <p className="text-justify md:px-20 px-5 my-5">This is your personal space where you can manage your account, explore your reading activity, track your orders, and save books you love. Whether you're building a wishlist, discovering new arrivals, or reviewing your recent purchases, this page keeps everything organized and easy to access. Your reading journey continues here — enjoy exploring, discovering, and collecting stories that inspire you. </p>
    <div className="md:px-40">
      {/* tabs */}
      <div className="flex justify-center items-center my-8 font-medium text-lg">
      <p onClick={()=>setCurrentTab(1)} className={currentTab==1?'p-4 border-gray-200 border-l border-r border-t rounded cursor-pointer':'p-4 border-gray-200 border-b rounded cursor-pointer'}>Upload Book</p>
      <p onClick={()=>setCurrentTab(2)} className={currentTab==2?'p-4 border-gray-200 border-l border-r border-t rounded cursor-pointer':'p-4 border-gray-200 border-b rounded cursor-pointer'}>Upload Book status</p>
      <p onClick={()=>setCurrentTab(3)} className={currentTab==3?'p-4 border-gray-200 border-l border-r border-t rounded cursor-pointer':'p-4 border-gray-200 border-b rounded cursor-pointer'}>Purchase History</p>
      </div>
      {/* tab contents */}
      {
        currentTab==1 &&
        <div><UploadBook/></div>
      }
      {
        currentTab==2 &&
        <div><BookStatus/></div>
      }
      {
        currentTab==3 &&
        <div><Purchase/></div>
      }
    </div>
    <Footer/>
    </>
  )
}

export default Profile