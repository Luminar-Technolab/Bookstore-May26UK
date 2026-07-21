import React, { useContext } from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { routeContext } from '../../context API/AuthGuard'

function AdminHeader() {

  const {role,setRole,isAuthorised,setIsAuthorised} = useContext(routeContext)
  const naviagte = useNavigate()

  const logout = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    naviagte('/')
  }
  return (
    <>
    {/* header top */}
    <div className="flex justify-between items-center p-3 md:px-20">
      {/* logo */}
      <div className="flex items-center">
        <img width={'50px'} height={'50px'} src="https://static.vecteezy.com/system/resources/previews/048/963/897/non_2x/bookstore-with-books-on-the-shelves-and-a-window-png.png" alt="logo" />
        <h1 className="text-2xl font-bold ms-2 ">BOOK STORE</h1>
      </div>
      {/* logout btn */}
      <div onClick={logout} className="flex items-center px-3 py-2 bg-black text-white rounded"> Logout <FaPowerOff className='ms-2'/> </div>
    </div>
    {/* header body */}
    <div className="w-full p-3 bg-black text-white">
      <marquee >Welcome Admin, Your all set to manage and monitor the system. Let's get into work!!!</marquee>
    </div>
    </>
  )
}

export default AdminHeader