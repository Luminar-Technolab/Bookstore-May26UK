import React, { useContext } from 'react'
import { routeContext } from '../context API/AuthGuard'
import { Link, useNavigate } from 'react-router-dom'

function Pnf() {
  const {role,setRole,isAuthorised,setIsAuthorised} =  useContext(routeContext)
  const navigate = useNavigate()

  const backToHome = ()=>{
    if(role=="user"){
      navigate('/')
    }else{
      navigate('/admin')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
      <h1 className="text-4xl">Page Not Found!</h1>
      <p>The Page You are looking is not available</p>
      {
        isAuthorised ?
        <button onClick={backToHome} className='bg-black p-2 mt-5 text-white'>Back to Home</button>
        :
        <Link to={'/'} className='bg-black p-2 mt-5 text-white'>Back To Home</Link>
      }
    </div>
  )
}

export default Pnf