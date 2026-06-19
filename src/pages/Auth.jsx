import React from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from 'yup'
import { googleLoginAPI, loginAPI, registerAPI } from '../services/allAPI';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Auth({insideRegisterRoute}) {
  // console.log(insideRegisterRoute?'Register':'Login');

  const navigate = useNavigate()
  const formik = useFormik({
    initialValues:{
      username:"",email:"",password:""
    },
    validationSchema:Yup.object({
      username:insideRegisterRoute ? Yup.string().min(3,"Must be atleast 3 characters").required("Username Required") : Yup.string(),
      email:Yup.string().email("Invalid Email").required("Email Required"),
      password:Yup.string().required("Password Required")
    }),
    onSubmit:(values,{resetForm})=>{
      if(insideRegisterRoute){
        console.log("register api call");
        handleRegister(values)
      }else{
        console.log("login api call");
        handleLogin(values)
      }
      resetForm()
    }
  })
  
  const handleRegister = async(userData)=>{
    const result = await registerAPI(userData)
    if(result.status==201){
      toast.success("Successfully registered... Please Login!!!")
    }else{
      toast.error(result.response)
    }
    //navigate login
    navigate('/login')
  }

  const handleLogin = async(userData)=>{
    const result = await loginAPI(userData)
    if(result.status==200){
      toast.success("Login Successfull...")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setTimeout(() => {
        if(result.data.user.role=="admin"){
          navigate('/admin')
        }else{
          navigate('/')
        }
      }, 2500);
    }else{
      toast.error(result.response)
    }
  }
  
  const handleGoogleLogin = async (credentialResponse)=>{
    console.log(jwtDecode(credentialResponse.credential));
    const {name,email,picture} = jwtDecode(credentialResponse.credential)
    //api call
    const result = await googleLoginAPI({username:name,email,password:"googlePassword",picture})
    if(result.status==200){
      toast.success("Login Successfull...")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setTimeout(() => {
        if(result.data.user.role=="admin"){
          navigate('/admin')
        }else{
          navigate('/')
        }
      }, 2500);
    }
  }

  return (
   
      <div className='w-full min-h-screen flex justify-center items-center bg-[url(/landing.png)] bg-cover bg-center text-white'>
        <div className="p-10 text-center">
          <h1 className="text-3xl font-bold">BOOKSTORE</h1>
          <div style={{width:'400px'}} className="bg-black text-white p-5 flex justify-center items-center flex-col my-5">
            <div style={{width:'80px',height:'80px',borderRadius:'50%'}} className="border mb-5 flex justify-center items-center">
            <FaUser className='text-3xl'/>
            </div>
            <h1 className="text-2xl"> {insideRegisterRoute?'Register':'Login'} </h1>
            <form onSubmit={formik.handleSubmit} className="my-5 w-full">
              {
                insideRegisterRoute &&
                <>
                  <input name='username' value={formik.values.username} onChange={formik.handleChange} type="text" placeholder='Username' className="bg-white p-2 w-full rounded mt-5 mb-3 text-black" />
                  <div className="mb-3 text-xs text-yellow-400">{formik.errors.username}</div>
                </>
              }
              <input name='email' value={formik.values.email} onChange={formik.handleChange} type="email" placeholder='Email' className="bg-white p-2 w-full rounded  mb-3 text-black" />
              <div className="mb-3 text-xs text-yellow-400">{formik.errors.email}</div>
              <input name='password' value={formik.values.password} onChange={formik.handleChange} type="password" placeholder='Password' className="bg-white p-2 w-full rounded  mb-3 text-black" />
              <div className="mb-3 text-xs text-yellow-400">{formik.errors.password}</div>
              <div className="text-start mb-5">
                <p className="text-xs text-orange-400">*Never share your password with others</p>
              </div>
              <div className="text-center">
                {
                  insideRegisterRoute ?
                  <button type='submit' className="bg-green-700 p-2 w-full rounded">Register</button>
                  :
                  <button type='submit' className="bg-green-700 p-2 w-full rounded">Login</button>
                }
              </div>
              {/* google authentication */}
              {
                !insideRegisterRoute &&
                <div className="my-5 text-center ">
                  <p>------------------or-------------------</p>
                  <div className='mt-2 flex justify-center items-center w-full'>
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        handleGoogleLogin(credentialResponse)
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                  </div>
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