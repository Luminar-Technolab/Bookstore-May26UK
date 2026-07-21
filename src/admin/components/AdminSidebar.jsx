import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { Link } from 'react-router-dom'
import { FaChartSimple, FaGears } from 'react-icons/fa6'
import { FaDatabase } from 'react-icons/fa'

function AdminSidebar() {
  const [dp,setDp] = useState("")
  const [username,setUsername] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setDp(user?.picture)
      setUsername(user?.username)
    }
  },[])

  return (
    <div className='bg-blue-100 md:min-h-screen h-fit py-10'>
      {/* image */}
      <div className="flex justify-center">
        <img style={{width:'100px',height:'100px',borderRadius:'50%'}} className='border border-gray-300 z-52' src={dp==""?"https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png":dp.startsWith('https://lh3.googleusercontent.com/')?dp:`${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="picture" />
      </div>
      {/* name */}
      <h3 className="text-xl font-bold my-5 text-center"> {username} </h3>
      {/* links */}
      <div className="mt-10 flex flex-col justify-center items-center">
        <div className="mt-3">
          <Link to={'/admin'} className='flex items-center'> <FaChartSimple className='me-2'/> Dashboard</Link>
        </div>
        <div className="mt-3">
          <Link to={'/resources'} className='flex items-center'> <FaDatabase className='me-2'/> Resources</Link>
        </div>
        <div className="mt-3">
          <Link to={'/settings'} className='flex items-center'> <FaGears className='me-2'/> Settings</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar