import React, { useContext } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getlatestBooksAPI } from '../../services/allAPI'
import { useEffect } from 'react'
import {toast} from'react-toastify'
import { searchContext } from '../../context API/ContextShare'

function Home() {

  const [latestBooks,setLatestBooks] = useState([])
  const {searchKey,setSearchKey} = useContext(searchContext)
  const navigate = useNavigate()

  // console.log(latestBooks);

  useEffect(()=>{
    getHomepageBooks()
  },[])
  
  const getHomepageBooks = async ()=>{
    const result = await getlatestBooksAPI()   
    setLatestBooks(result.data)
  }

  const handleSearch = ()=>{
    if(!searchKey){
      toast.warning("Please input Book title here!!!")
    }else if(!sessionStorage.getItem("token")){
      toast.warning("Please Login!!!")
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    }else if(searchKey && sessionStorage.getItem("token")) {
      navigate('/books')
    }else{
      toast.error("Something went wrong!!!")
    }
  }

  return (
    <>
    <Header/>
      {/* hero section */}
      <div style={{height:'500px'}} className="flex flex-col justify-center items-center text-white bg-[url(/landing.png)] bg-cover bg-center">
        <div style={{height:'500px',backgroundColor:'rgba(0,0,0,0.4)'}} className="w-full flex-col flex justify-center items-center">
          <h1 className="text-6xl font-bold">Wonderful Gifts</h1>
          <p>Gift your family and friends a book</p>
          <div className="mt-9 flex items-center">
            <input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search book here' className="bg-white p-2 rounded-3xl w-100 text-black" />
            <FaSearch onClick={handleSearch} className='text-gray-500 cursor-pointer' style={{marginLeft:'-40px'}}/>
          </div>
        </div>
      </div>
      {/* new book arrival */}
      <section className="md:px-40 my-5 p-5 flex flex-col justify-center items-center">
        <h1 className='text-3xl font-bold'>NEW ARRIVALS</h1>
        <h1 className='text-4xl my-2'>Explore Our Latest Collection</h1>
        <div className="md:grid grid-cols-4 w-full my-10">
          {/* card 1*/}
          {
            latestBooks?.length>0?
              latestBooks?.map(book=>(
                <div key={book?._id} className="shadow rounded p-3 m-4 md:my-0">
                  <img width={'100%'} height={'300px'} src={book?.imageURL} alt="book" />
                  <div className="flex flex-col justify-center items-center mt-4">
                    <h2 className="text-xl font-bold">{book?.author}</h2>
                    <h3 className="text-lg">{book?.title}</h3>
                    <p className="font-bold text-red-600">$ {book?.discountPrice}</p>
                    
                  </div>
                </div>
              ))
            :
            <p className="font-bold">Loading...</p>
          }
        </div>
        <div className="text-center my-10">
          <Link to={'/books'} className='bg-black p-3 text-white font-black'>Explore More...</Link>
        </div>
      </section>
      {/* authors */}
      <section className="md:grid grid-cols-2 items-center gap-10 p-5 md:px-40">
        <div className="text-center">
          <h1 className="text-xl font-bold">FEATURED AUTHORS</h1>
          <h3 className="text-xl">Captivates with every word</h3>
          <p className='my-5 text-justify'>Welcome to the Author Spotlight section of our bookstore website! This feature is designed to celebrate writers, showcase their creative journeys, and help readers discover the minds behind their favorite books.</p>

          <p className='text-left'>Our Author Features include:</p>

          <p className='my-3 text-justify'><span className='font-bold'>✨ Author Profiles</span> : Get to know each author through detailed profiles that highlight their biography, writing style, achievements, and personal inspirations.</p>

          <p className='my-3 text-justify'><span className='font-bold'>📖 Published Works </span>: Explore a curated list of books written by the author with quick access to book details, reviews, and purchase options.</p>

          <p className='my-3 text-justify'><span className='font-bold'>🎤 Interviews & Insights</span> : Exclusive interviews, behind-the-scenes stories, and writing tips that offer a deeper look into the author’s creative world.</p>
        </div>
        <div className="p-5 flex items-center justify-center">
          <img src="https://images.squarespace-cdn.com/content/v1/64bfd6aa127fba0754a78d65/1690617601186-7MS4W32UWBXKFKZTCQ14/authorphotos5-1024x683.jpg" alt="author" />
        </div>
      </section>
      {/* testimony */}
    <Footer/>
    </>
  )
}

export default Home