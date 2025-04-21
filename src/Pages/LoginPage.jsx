
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContextProvider from "../Context/ContextProvider";
import { ContextAPI } from "../Context/ContextAPI";
import login from '../assets/images/Login.png'
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage() {
   const [loginForm,setLoginForm]=useState({
    email: "",
    password: "",

   })
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState()
    const {setUser,setIsAuthanticate,setIsAdmin } = useContext(ContextAPI);
    const navigate = useNavigate();



    const handleChange=(e)=>{

      if(error){
        setError(null)
      }

      const {name,value}=e.target;

      setLoginForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));

    }

    const handleSubmit= async(e)=>{
      e.preventDefault();

      try {
        setLoading(true)
        
      const response= await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        loginForm,
        {
          withCredentials: true 
        }
      );

      if(response.status===200){
   
        setIsAuthanticate(true)
        if (response.data.user.email==='admin@gmail.com') {
    
          
          setIsAdmin(true)
        }
 
        
        setUser(response.data.user)
  
        
        toast.success('User Login Sucessfully')
          
        navigate('/')
        
      }
     
    

  
      }catch (error) {
        const errors = error?.response?.data?.errors;
        const message = error?.response?.data?.msg;
      
        if (errors && errors.length > 0) {
          toast.error(errors[0].msg);
        } else if (message) {
          toast.error(message);
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      }
      finally{
        setLoginForm({
          email:"",
          password:""
        })
        setLoading(false)
      }


    }

 
   
    
  
   
  
    return (
      <div className="min-h-screen flex  items-center justify-center">
        
        <div className=" lg:p-8 min-h-[70vh] md:h-[70vh] relative  flex justify-center items-center md:flex-row rounded md:shadow-md w-full lg:max-w-5xl">

    
        
            <div className="md:w-1/2 lg:px-10 w-full  mb-10   flex justify-center items-center h-full flex-col">
            <div className="absolute top-0 left-7">
        <Link to='/' 
          
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          
        </Link>
      </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
             
             
             {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
             
             <form onSubmit={handleSubmit} className="w-full px-8">
               <div className="mb-4 w-full ">
                
                 <input
                   className=" text-center w-full shadow outline-none border-none bg-gray-100 appearance-none border rounded-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="email"
                   type="email"
                   placeholder="Email"
                   value={loginForm.email}
                   name="email"
                   onChange={handleChange}
                   required
                 />
               </div>
               
               <div className="mb-6">
                 
                 <input
                   className=" text-center  shadow outline-none border-none bg-gray-100 appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="password"
                   type="password"
                   placeholder="Password"
                   value={loginForm.password}
                   minLength={6}
                   name="password"
                   onChange={handleChange}
                   required
                 />
               </div>
               
               <div className="flex flex-col space-y-4">
                 <div className="text-end">
                 <Link to='/forgot-password' className="text-blue-500 hover:text-blue-800 text-sm">
                     Forgot Password?
                   </Link>
                 </div>
                 <button
                   className="bg-orange-500 hover:bg-orange-600 text-white font-bold mt-1 py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                   type="submit"
                   disabled={loading}
                 >
                   {loading ? 'Loading...' : 'Sign In'}
                 </button>
                 
                 
                 <div className="text-center">
                   <span className="text-gray-600 text-sm">Don't have an account? </span>
                   <Link to="/register" className="text-blue-500 hover:text-blue-800 text-sm">
                     Register
                   </Link>
                 </div>
               </div>
             </form>
            </div>
     
          
         <div className="w-1/2 hidden md:block ">    

          <img src={login} alt="LoginForm"  />

         </div>
        </div>
        

      </div>
    );
  }
  
  export default LoginPage;