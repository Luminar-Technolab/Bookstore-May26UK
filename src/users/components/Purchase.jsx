import React from 'react'
import { useState } from 'react'
import { getAllUserPurchaseBooksAPI } from '../../services/allAPI'
import { useEffect } from 'react'

function Purchase() {

  const [allPurchaseBooks,setAllPurchaseBooks] = useState([])

  useEffect(()=>{
    getAllBooksPurchased()
  },[])

  const getAllBooksPurchased = async ()=>{
    const result = await getAllUserPurchaseBooksAPI()
    setAllPurchaseBooks(result.data)
  }

  return (
     <div className='p-10 my-15 shadow rounded'>
      {
        allPurchaseBooks?.length>0?
          allPurchaseBooks?.map(book=>(
            <div key={book?._id} className="p-5 rounded mt-4 bg-gray-100">
              <div className="md:grid items-center grid-cols-[3fr_1fr]">
                <div className="px-4">
                    <h1 className="text-2xl"> {book?.title} </h1>
                    <h2 className="text-xl"> {book?.author} </h2>
                    <h3 className="text-lg text-blue-500">$ {book?.discountPrice} </h3>
                    <p className="text-justify mt-5"> {book?.abstract} </p>
                    <div className="flex mt-3">
                      <img width={'100px'} src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="sold" />
                    </div>
                </div>
                <div className="px-4 mt-4 md:mt-0">
                  <img className='w-full' src={book?.imageURL} alt="book" />
                </div>
              </div>
            </div>
          ))
        :
        <div className="font-bold text-xl">You haven't purchased any books yet!!!</div>
      }
    </div>
  )
}

export default Purchase