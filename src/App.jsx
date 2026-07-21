import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './users/pages/Home'
import Books from './users/pages/Books'
import Contact from './users/pages/Contact'
import Profile from './users/pages/Profile'
import View from './users/pages/View'
import Auth from './pages/Auth'
import Pnf from './pages/Pnf'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminResources from './admin/pages/AdminResources'
import AdminSettings from './admin/pages/AdminSettings'
import Preloader from './components/Preloader'
import { useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import PaymentFail from './users/pages/PaymentFail'
import PaymentSuccess from './users/pages/PaymentSuccess'
import { routeContext } from './context API/AuthGuard'

function App() {

  const [loading,setLoading] = useState(true)
  const {role,setRole,isAuthorised,setIsAuthorised} = useContext(routeContext)

  setTimeout(() => {
    setLoading(false)
  }, 6000);

  return (
    <>
      <Routes>
        <Route path='/' element={loading?<Preloader/>:<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/books' element={<Books/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='/register' element={<Auth insideRegisterRoute/>} />

        {
          role=="user" &&
          <>
            <Route path='/profile' element={<Profile/>} />
            <Route path='/books/:id' element={<View/>} />
            <Route path='/payment-success' element={<PaymentSuccess/>} />
            <Route path='/payment-fail' element={<PaymentFail/>} />
          </>
        }

        {
          role=="admin" &&
          <>
            <Route path='/admin' element={<AdminDashboard/>} />
            <Route path='/resources' element={<AdminResources/>} />
            <Route path='/settings' element={<AdminSettings/>} />
          </>
        }

        <Route path='/*' element={<Pnf/>} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} theme="colored"/>
    </>
  )
}

export default App
