import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

function Edit() {
  const [openCanvas,setOpenCanvas] = useState(false)
  return (
    <div>
      {/* button */}
      <button onClick={()=>setOpenCanvas(true)} className="bg-black text-white p-2 flex items-center rounded"> <FaPen className='me-2'/> Edit </button>
      {/* offcanvas */}
      {
        openCanvas &&
        <div>
          <div className="fixed inset-0 bg-gray-500/75 w-full h-full"></div>
            {/* off canvas form */}
            <div className="bg-white h-full w-90 z-50 fixed top-0 left-0">
              {/* header */}
              <div className="bg-black text-white px-3 py-4 flex justify-between text-2xl">
                <h1>Update User Profile</h1>
                <FaX onClick={()=>setOpenCanvas(false)}/>
              </div>
              {/* body */}
              <div className="my-5 flex items-center justify-center flex-col">
                {/* upload image */}
                <label htmlFor="userProfile">
                  <input type="file" id='userProfile' hidden/>
                  <img width={'100px'} height={'100px'} style={{borderRadius:'50%'}} src="https://www.pngkey.com/png/full/349-3499617_person-placeholder-person-placeholder.png" alt="profile" />
                  <button className='fixed bg-blue-500 py-2 px-3 rounded z-53 text-white ' style={{marginLeft:'50px',marginTop:'-10px'}}><FaPen/> </button>
                </label>
                {/* name */}
                <div className="mt-10 mb-3 w-full px-5">
                  <input type="text" placeholder='Useranme' className="w-full border border-gray-300 rounded p-2" />
                </div>
                {/* new password */}
                <div className="mb-3 w-full px-5">
                  <input type="password" placeholder='New Password' className="w-full border border-gray-300 rounded p-2" />
                </div>
                {/* consfirm password */}
                <div className="mb-3 w-full px-5">
                  <input type="password" placeholder='Confirm Password' className="w-full border border-gray-300 rounded p-2" />
                </div>
                {/* bio */}
                <div className="mb-3 w-full px-5">
                  <input type="text" placeholder='Bio' className="w-full border border-gray-300 rounded p-2" />
                </div>
                {/* update & reset btn */}
                <div className="mt-5 w-full px-5 flex justify-end">
                  <button className='bg-gray-400 px-3 py-2 rounded text-white'>Reset</button>
                  <button className='bg-blue-400 px-3 py-2 rounded text-white ms-5'>Update</button>
                </div>
              </div>
            </div>
        </div>
      }
    </div>
  )
}

export default Edit