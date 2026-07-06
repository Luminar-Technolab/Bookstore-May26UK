import React from 'react'
import { useState } from 'react'
import { getallAdminBooksAPI } from '../../services/allAPI'
import { useEffect } from 'react'

function AdminResources() {

  const [allBooks,setAllBooks] = useState([])

  console.log(allBooks);
  

  useEffect(()=>{
    getAllBooks()
  },[])

  const getAllBooks = async ()=>{
    const result =  await getallAdminBooksAPI()
    setAllBooks(result.data)
  }
  return (
    <div>AdminResources</div>
  )
}

export default AdminResources