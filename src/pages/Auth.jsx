import React from 'react'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Auth({insideRegisterRoute}) {
  // console.log(insideRegisterRoute?'Register':'Login');
  
  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[url(/landing.png)] bg-cover bg-center text-white'>
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold">BOOKSTORE</h1>
        <div style={{width:'400px'}} className="bg-black text-white p-5 flex justify-center items-center flex-col my-5">
          <div style={{width:'80px',height:'80px',borderRadius:'50%'}} className="border mb-5 flex justify-center items-center">
          <FaUser className='text-3xl'/>
          </div>
          <h1 className="text-2xl"> {insideRegisterRoute?'Register':'Login'} </h1>
          <form className="my-5 w-full">
            {
              insideRegisterRoute &&
              <input type="text" placeholder='Username' className="bg-white p-2 w-full rounded mt-5 mb-3 text-black" />
            }
            <input type="email" placeholder='Email' className="bg-white p-2 w-full rounded  mb-3 text-black" />
            <input type="password" placeholder='Password' className="bg-white p-2 w-full rounded  mb-3 text-black" />
            <div className="text-start mb-5">
              <p className="text-xs text-orange-400">*Never share your password with others</p>
            </div>
            <div className="text-center">
              {
                insideRegisterRoute ?
                <button className="bg-green-700 p-2 w-full rounded">Register</button>
                :
                <button className="bg-green-700 p-2 w-full rounded">Login</button>
              }
            </div>
            {/* google authentication */}
            {
              !insideRegisterRoute &&
              <div className="my-5 text-center">
                <p>------------------or-------------------</p>
                google-authentication
              </div>
            }
            {/* new /already user */}
            <div className="my-5 text-center">
              {
                insideRegisterRoute ?
                  <p className="text-blue-600">Exisiting User? <Link to={'/login'} className='ms-3 underline'>Sign In</Link></p>
                :
                <p className="text-blue-600">New User? <Link to={'/register'} className='ms-3 underline'>Sign Up</Link></p>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth