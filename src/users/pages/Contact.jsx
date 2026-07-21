import React, { useRef } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaLocationPin } from 'react-icons/fa6'
import { FaEnvelope, FaPaperPlane, FaPhone } from 'react-icons/fa'
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify'

function Contact() {

  const form = useRef()
   const sendEmail = (e) => {
    e.preventDefault();
    const {name,email,message} = form.current
    if(name.value && email.value && message.value){
       emailjs
      .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Thank you for contacting with us... Our team will contact you shortly!!!")
         form.current.reset()
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    }else{
      toast.warning("Please fill the form completely!!!")
    }
   
  };

  return (
    <>
    <Header/>
    <div className='md:px-20 p-5 my-5'>
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      <p className="text-justify my-5">Have questions, feedback, or need help finding the perfect book? We’d love to hear from you! Why Contact Us? Order-related support Book availability inquiries Return/replacement queries Bulk/Institutional purchase requests Author or partnership inquiries. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic veniam id eveniet recusandae pariatur, facilis fuga? Iusto, asperiores modi cum praesentium et, libero nisi eaque harum sed deleniti odio eveniet. Maiores delectus iusto voluptatibus officia eveniet sunt quibusdam mollitia, error fugit laborum dolorum deserunt! Quaerat magni ad, veritatis dolor iusto, aliquam nisi consequatur officiis perferendis unde, maiores quos praesentium voluptatibus. Magni dolores impedit, officia doloribus repellat fuga quos ad natus recusandae sed numquam fugiat, sapiente minima, nam vero incidunt libero earum. Minima praesentium laborum tenetur corporis quod dolorum maxime pariatur.</p>
    <div className="md:grid grid-cols-3 items-center md:px-40 p-5 mt-5 md:mt-0">
      <div className="flex items-center">
        <div style={{width:'50px',height:'50px',borderRadius:'50%'}} className="bg-gray-200 flex items-center justify-center">
          <FaLocationPin/>
        </div>
        <p className="ms-5">123 Main Street, Apt 4B, Anytown, CA 91234</p>
      </div>
      <div className="flex items-center">
        <div style={{width:'50px',height:'50px',borderRadius:'50%'}} className="bg-gray-200 flex items-center justify-center">
          <FaPhone/>
        </div>
        <p className="ms-5">+098765432123</p>
      </div>
      <div className="flex items-center">
        <div style={{width:'50px',height:'50px',borderRadius:'50%'}} className="bg-gray-200 flex items-center justify-center">
          <FaEnvelope/>
        </div>
        <p className="ms-5">contact@bookstore.com</p>
      </div>
    </div>
    <div className="md:grid grid-cols-2 gap-10 my-5 p-5 md:px-40">
      {/* form */}
      <div className="bg-gray-100 p-5 text-center">
        <h1 className="text-semi-bold text-2xl">Send Us Message!</h1>
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-5 mt-10">
            <input name='name' type="text" placeholder='Name' className="bg-white w-full p-2" />
          </div>
           <div className="mb-5 ">
            <input name='email' type="email" placeholder='Email' className="bg-white w-full p-2" />
          </div>
          <div className="mb-5 ">
            <textarea name='message' placeholder='Message' className="bg-white w-full p-2"></textarea>
          </div>
          <div className="mb-5 ">
            <button type='submit' className="bg-black w-full p-2 text-white flex justify-center items-center">Submit <FaPaperPlane className='ms-2'/></button>
          </div>
        </form>
      </div>
      {/* map embed */}
      <div className="mt-5 md:mt-0">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.97521744499!2d76.3426426!3d10.018903600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080ffce877d5ef%3A0x8bef6870ad11b98!2sLuminar%20Technolab!5e0!3m2!1sen!2sin!4v1784626781663!5m2!1sen!2sin" width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Contact