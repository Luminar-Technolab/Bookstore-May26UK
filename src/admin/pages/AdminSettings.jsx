import React,{useState,useEffect} from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSidebar from '../components/AdminSidebar'
import { FaPen } from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminUpdateAPI } from '../../services/allAPI'
import axiosInstance from '../../api/axiosInstance'

function AdminSettings() {

   const [userDetails,setUserDetails] = useState({
      id:"",username:"",password:"",cPassword:"",picture:"",bio:""
    })
    const [existingPicture,setExistingPicture] = useState("")
    const [passwordMatch,setPasswordMatch] = useState(true)
    const [imageFileType,setImageFileType] = useState(false)
    const [preview,setPreview] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
      if(sessionStorage.getItem("user")){
        const user = JSON.parse(sessionStorage.getItem("user"))
        setUserDetails({...userDetails,id:user._id,username:user.username,bio:user.bio})
        setExistingPicture(user.picture)
      }
    },[])

    const handleFileUpload = (e)=>{
    // console.log(e.target.files[0]);
    const imageFile = e.target.files[0]
    if(imageFile.type.startsWith("image/")){
      setUserDetails({...userDetails,picture:imageFile})
      const url = URL.createObjectURL(imageFile)
      setPreview(url)
      setImageFileType(true)
    }else{
      setImageFileType(false)
    }
  }

  const checkPasswordMatch = (e)=>{
    setUserDetails({...userDetails,cPassword:e.target.value})
    userDetails.password == e.target.value ? setPasswordMatch(true) : setPasswordMatch(false)
  }

  const resetUpdateForm = ()=>{
    const user = JSON.parse(sessionStorage.getItem("user"))
    setUserDetails({...userDetails,id:user._id,username:user.username,bio:user.bio})
    setExistingPicture(user.picture)
    setPreview("")
    setImageFileType(false)
    setPasswordMatch(true)
  }

  const handleProfileUpdate = async ()=>{
      const {id,username,password,cPassword,bio,picture} = userDetails
      if(!username || !password || !cPassword ){
        toast.info("Please fill the form completely!!!")
      }else if(passwordMatch){
        //api call
        const reqbody = new FormData()
        for(let key in userDetails){
          if(key != "picture"){
            reqbody.append(key,userDetails[key])
          }else{
            preview ? reqbody.append("picture",picture) : reqbody.append("picture",existingPicture)
          }
        }
        const result = await adminUpdateAPI(id,reqbody)
        console.log(result);
        if(result.status==200){
          toast.success("Admin profile updated successfully... Please login to continue!!!")
          setTimeout(() => {
            sessionStorage.clear()
            navigate("/login")
          }, 2500);
        }
      }
    }

  return (
    <>
    <AdminHeader/>
    <div className="md:grid grid-cols-5 gap-2">
      <div className="col-span-1">
        <AdminSidebar/>
      </div>
      <div className="col-span-4">
        <h1 className="font-bold text-3xl text-center mb-10">Settings</h1>
        <div className="md:grid grid-cols-2 items-center gap-5">
          <div>
            
            <h1 className='text-xl mb-5 font-bold'>Welcome, Admin 👋</h1>
            <p className='text-justify'>
              This is your personal administration space where you can manage your account details, system preferences, and platform roles with ease. From here, you can update essential information such as your username, password, contact details, and notification preferences — ensuring your access remains secure and personalized.
              
            </p>
            <h2 className='text-lg font-bold my-5'>🔧 What You Can Manage in This Section:</h2>
            <p>✏️ Update personal details (name, email, role, profile picture)</p>
            <p>🔐 Change or reset your password</p>
            <p>📢 Configure notification and alert preferences</p>
            <p>👥 Manage permissions based on assigned access level</p>
            <p>🧩 Customize dashboard visibility and layout</p>
            <p className='text-justify my-5'>Your profile settings help ensure your administrative tools work the way you need them to — securely, efficiently, and with complete control. Thank you for keeping the platform organized and running smoothly. Continue managing, updating, and improving the system — one step at a time. 🚀📚</p>
          </div>
         {/* body */}
         <div className="m-10 bg-blue-100 rounded p-5 flex items-center justify-center flex-col">
                {/* upload image */}
                <label htmlFor="userProfile">
                  <input onChange={e=>handleFileUpload(e)} type="file" id='userProfile' hidden/>
                  {
                    existingPicture==""?
                    <img width={'100px'} height={'100px'} style={{borderRadius:'50%'}} src={preview?preview:"https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png"} alt="profile" />
                    :
                    existingPicture.startsWith("https://lh3.googleusercontent.com/")?
                    <img width={'100px'} height={'100px'} style={{borderRadius:'50%'}} src={preview?preview:existingPicture} alt="profile" />
                    :
                    <img width={'100px'} height={'100px'} style={{borderRadius:'50%'}} src={preview?preview:`${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`} alt="profile" />
                  }
                  <button className=' bg-blue-500 py-2 px-3 rounded z-53 text-white ' style={{marginLeft:'50px',marginTop:'-10px'}}><FaPen/> </button>
                </label>
                {
                  !imageFileType && <div className='mt-8 text-yellow-500 text-sm'>*Only Accept Image File!</div>
                }
                {/* name */}
                <div className="mt-10 mb-3 w-full px-5">
                  <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder='Useranme' className="w-full border border-gray-300 rounded p-2" />
                </div>
                {/* new password */}
                <div className="mb-3 w-full px-5">
                  <input value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} type="password" placeholder='New Password' className="w-full border border-gray-300 rounded p-2" />
                </div>
                {/* confirm password */}
                <div className="mb-3 w-full px-5">
                  <input value={userDetails.cPassword} onChange={e=>checkPasswordMatch(e)} type="password" placeholder='Confirm Password' className="w-full border border-gray-300 rounded p-2" />
                </div>
                {
                  !passwordMatch && <div className='mb-3 text-yellow-500 text-sm'>*Password and Confirm password must be same!</div>
                }
               
                {/* update & reset btn */}
                <div className="mt-5 w-full px-5 flex justify-end">
                  <button onClick={resetUpdateForm} className='bg-gray-400 px-3 py-2 rounded text-white'>Reset</button>
                  <button onClick={handleProfileUpdate} className='bg-blue-400 px-3 py-2 rounded text-white ms-5'>Update</button>
                </div>
              </div>

        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default AdminSettings