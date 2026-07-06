import React from 'react'
import { useState } from 'react'
import { getAllUserUploadBooksAPI, removeUserUploadBookAPI } from '../../services/allAPI'
import { useEffect } from 'react'

function BookStatus() {

  const [allUserUploadBooks,setAllUserUploadBooks] = useState([])

  // console.log(allUserUploadBooks);
  
  useEffect(()=>{
    getAllUserUplodsBooks()
  },[])

  const getAllUserUplodsBooks = async ()=>{
    const result = await getAllUserUploadBooksAPI()
    setAllUserUploadBooks(result.data)
  }

  const removeBook = async(id)=>{
    await removeUserUploadBookAPI(id) 
    getAllUserUplodsBooks()
  }

  return (
    <div className='p-10 my-15 shadow rounded'>
      {
        allUserUploadBooks?.length>0?
          allUserUploadBooks?.map(book=>(
            <div key={book?._id} className="p-5 rounded mt-4 bg-gray-100">
              <div className="md:grid items-center grid-cols-[3fr_1fr]">
                <div className="px-4">
                    <h1 className="text-2xl"> {book?.title} </h1>
                    <h2 className="text-xl"> {book?.author} </h2>
                    <h3 className="text-lg text-blue-500">$ {book?.discountPrice} </h3>
                    <p className="text-justify mt-5"> {book?.abstract} </p>
                    {/* status book - pending / approve / sold */}
                    <div className="flex mt-3">
                      {
                        book?.status=="pending"?
                          <img width={'120px'} src="https://pnggallery.com/wp-content/uploads/pending-stamp-03.png" alt="pending" />
                        :
                        book?.status=="approve"?
                        <img width={'100px'} src="https://www.pngall.com/wp-content/uploads/2/Approved-Stamp.png" alt="approve" />
                        :
                        <img width={'100px'} src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="sold" />
                      }
                    </div>
                </div>
                <div className="px-4 mt-4 md:mt-0">
                  <img className='w-full' src={book?.imageURL} alt="book" />
                  <div className="mt-4 flex justify-end">
                    <button onClick={()=>removeBook(book?._id)} className="bg-red-600 text-white p-2 rounded cursor-pointer">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        :
        <div className="font-bold text-xl">You haven't upload any books yet!!!</div>
      }
    </div>
  )
}

export default BookStatus