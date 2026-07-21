import React, { useContext, useEffect, useState } from 'react'
import { FaFacebookSquare, FaInstagram, FaUser } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosInstance'
import { routeContext } from '../../context API/AuthGuard'

function Header() {

  const {role,setRole,isAuthorised,setIsAuthorised} = useContext(routeContext)
  const [token,setToken] = useState("")
  const [dp,setDp] = useState("")
  const [dropdown,setDropdown] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      const userToken = sessionStorage.getItem("token")
      const user = JSON.parse(sessionStorage.getItem("user"))
      setToken(userToken)
      setDp(user.picture)
    }
  },[token])

  const logout = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    setToken("")
    setDp("")
    setDropdown(false)
    navigate('/')
  }

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
        {
          !token ?
          <Link to={'/login'} className='flex items-center border rounded py-2 px-3 ms-3 hover:bg-black hover:text-white'> <FaUser className='me-1'/> Login </Link>
          :
          <div>
            {/* profile icon */}
            <button onClick={()=>setDropdown(!dropdown)} className="shadow-sm rounded ms-5 p-1">
              <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} src={dp==""?"https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png":dp.startsWith('https://lh3.googleusercontent.com/')?dp:`${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="profile icon" />
            </button>
            {/* drop down menu */}
            {
              dropdown &&
              <div className="absolute right-0 z-10 mt-2 w-40 bg-white shadow rounded ring-1 ring-black/5 p-2">
                {/* profile link */}
                <Link to={'/profile'} className='flex px-3 py-2'>Profile</Link>
                {/* logout btn */}
                <button onClick={logout} className='flex cursor-pointer px-3 py-2'>Logout</button>
              </div>
            }
          </div>
        }
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