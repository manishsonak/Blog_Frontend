import React, { useContext, useState } from 'react';
import { BellDotIcon, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContextAPI } from '../Context/ContextAPI';
import axios from 'axios';
import toast from 'react-hot-toast';
import NotificationMsg from './NotificationMsg';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isAuthanticate,setIsAuthanticate,isAdmin,setIsAdmin}= useContext(ContextAPI);

  const [isNotification,setIsNotification]= useState(false)

  const Logout = async ()=>{
    try {
      const response= await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`,{
        withCredentials: true
      })
      if(response.status===200){

        setIsAuthanticate(false)
        setIsAdmin(false)
        toast.success(response.data.message)
        
        }
    } catch (error) {
      toast.error(error.response.data.message)
      
    }
  }

  return (
    <nav className="py-5 px-4 md:px-8 lg:px-20 flex justify-between items-center max-w-7xl mx-auto">
      <h2 className="font-bold text-xl ">SonakBlog</h2>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Desktop menu */}
      <ul className="hidden md:flex md:space-x-6 lg:space-x-8">
        <Link to="/" className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Home</Link>
        <Link to='/category/tech' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Category</Link>
        
        <Link to='/about' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">About</Link>
        <Link to='/contact' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Contact</Link>
        {isAdmin && <Link to='/dashboard' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Dashboard</Link>}
        {isAdmin && <button onClick={()=>{setIsNotification(prev=> !prev)}}  className="text-sm hidden lg:block uppercase font-medium text-blue-600 cursor-pointer" > <BellDotIcon/></button>}
        {isAuthanticate? (<button onClick={Logout} className="text-sm uppercase hover:text-red-600 font-medium  cursor-pointer">Logout</button>):<Link to='/login' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Login</Link>}
      </ul>


      {isNotification && <div className='absolute right-12 p-3 overflow-y-scroll shadow-2xl bg-white rounded-lg z-10 top-12 hidden lg:block min-h-3/4 max-h-4/5 w-96'>
          <NotificationMsg/>
        </div>}

      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-4 md:hidden z-10">
          <ul className="flex flex-col space-y-4">
          <Link to="/" className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Home</Link>
        <Link to='/category/tech' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Category</Link>
        
        <Link to='/about' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">About</Link>
        <Link to='/contact' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Contact</Link>
        {isAdmin && <Link to='/dashboard' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Dashboard</Link>}
        {isAuthanticate? (<button onClick={Logout} className="text-sm uppercase hover:text-red-600 font-medium  cursor-pointer">Logout</button>):<Link to='/login' className="text-sm uppercase font-medium hover:text-gray-600 cursor-pointer">Login</Link>}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;