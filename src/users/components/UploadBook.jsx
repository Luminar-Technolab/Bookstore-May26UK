import React, { useState } from 'react'
import {FaPlus} from 'react-icons/fa'
import {toast} from 'react-toastify'
import { addBookAPI } from '../../services/allAPI'

function UploadBook() {

  const [bookDetails,setBookDetails] = useState({
    title:"",author:"",imageURL:"",price:"",discountPrice:"",abstract:"",category:"",uploadImages:[]
  })
  const [preview,setPreview] = useState("")
  const [previewList,setPreviewList] = useState([])

  // console.log(bookDetails);

  const handleUploadBookImages = (e)=>{
    const imageFile = e.target.files[0]
    const dummyUploadImages = bookDetails.uploadImages
    dummyUploadImages.push(imageFile)
    setBookDetails({...bookDetails,uploadImages:dummyUploadImages})
    const url = URL.createObjectURL(imageFile)
    setPreview(url)
    const dummyPreviewList = previewList
    dummyPreviewList.push(url)
    setPreviewList(dummyPreviewList)
  }

  const resetForm = ()=>{
    setBookDetails({
      title:"",author:"",imageURL:"",price:"",discountPrice:"",abstract:"",category:"",uploadImages:[]
    })
    setPreview("")
    setPreviewList([])
  }

  const handleAddBook = async ()=>{
    const {title,author,imageURL,price,discountPrice,abstract,category,uploadImages} = bookDetails
    if(!title || !author || !imageURL || !price || !discountPrice || !abstract || !category || uploadImages.length==0){
      toast.info("Please fill the form completely!!!")
    }else{
      const reqBody = new FormData()
      for(let key in bookDetails){
        if(key != "uploadImages"){
          reqBody.append(key,bookDetails[key])
        }else{
          bookDetails.uploadImages.forEach((bookImageFile)=>{
            reqBody.append("uploadImages",bookImageFile)
          })
        }
      }
      const result = await addBookAPI(reqBody)
      if(result.status==201){
        toast.success("Book Added Successfully!!!")
      }else{       
        toast.warning(result.response)
      }
      resetForm()
    }
  }
  
  return (
    <div className='p-10 my-20 mx-5 bg-gray-200'>
      <h1 className="text-center text-3xl font-medium">Upload Book Details</h1>
      <div className="md:grid grid-cols-2 mt-10 w-full">
        <div className="px-3">
          <div className="mb-3">
            <input value={bookDetails.title} onChange={e=>setBookDetails({...bookDetails,title:e.target.value})} placeholder='Book Name' type="text" className="w-full p-2 rounded bg-white" />
          </div>
          <div className="mb-3">
            <input value={bookDetails.price} onChange={e=>setBookDetails({...bookDetails,price:e.target.value})} placeholder='Original Price' type="text" className="w-full p-2 rounded bg-white" />
          </div>
          <div className="mb-3">
            <input value={bookDetails.imageURL} onChange={e=>setBookDetails({...bookDetails,imageURL:e.target.value})} placeholder='Book Cover Image URL' type="text" className="w-full p-2 rounded bg-white" />
          </div>
          <div className="mb-3">
            <textarea value={bookDetails.abstract} onChange={e=>setBookDetails({...bookDetails,abstract:e.target.value})} rows={'5'} placeholder='Abstract' className="w-full p-2 rounded bg-white" ></textarea>
          </div>
        </div>
        <div className="px-3">
          <div className="mb-3">
            <input value={bookDetails.author} onChange={e=>setBookDetails({...bookDetails,author:e.target.value})} placeholder='Author Name' type="text" className="w-full p-2 rounded bg-white" />
          </div>
          <div className="mb-3">
            <input value={bookDetails.discountPrice} onChange={e=>setBookDetails({...bookDetails,discountPrice:e.target.value})} placeholder='Discount Price' type="text" className="w-full p-2 rounded bg-white" />
          </div>
          <div className="mb-3">
            <input value={bookDetails.category} onChange={e=>setBookDetails({...bookDetails,category:e.target.value})} placeholder='Book Category' type="text" className="w-full p-2 rounded bg-white" />
          </div>
          {/* upload images */}
          <div className="mb-3 flex justify-center items-center ">
            <label htmlFor="bookImages">
              <input onChange={e=>handleUploadBookImages(e)} type="file" id='bookImages' hidden/>
              <img width={'150px'} height={'150px'} src={preview?preview:"https://www.pngall.com/wp-content/uploads/2/Upload-Transparent.png"} alt="upload" />
            </label>
          </div>
          {/* all upload image list */}
          {
            preview &&
            <div className="flex justify-center items-center">
              {
                previewList?.map((imageURL,index)=>(
                  <img className='mx-2' key={`${imageURL}-${index}`} width={'70px'} height={'70px'} src={imageURL} alt="book" />
                ))
              }
              {
                previewList.length<3 &&
                <label htmlFor="moreImages">
                  <input onChange={e=>handleUploadBookImages(e)} type="file" id='moreImages' hidden/>
                  <FaPlus className='text-3xl ms-2'/>
                </label>
              }
            </div>
          }
          
        </div>
      </div>
      <div className="flex md:justify-end justify-center w-full p-3 mt-8">
        <button onClick={resetForm} className="bg-gray-600 text-white py-2 px-3 rounded">RESET</button>
        <button onClick={handleAddBook} className="bg-blue-600 text-white py-2 px-3 rounded ms-5">ADD BOOK</button>
      </div>
    </div>
  )
}

export default UploadBook