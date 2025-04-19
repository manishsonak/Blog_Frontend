
import React, { useContext, useState } from 'react';
import signup from '../assets/images/SignUp.png'

import { Link, useNavigate } from 'react-router-dom';

import { ContextAPI } from '../Context/ContextAPI';
import axios from 'axios';
import toast from 'react-hot-toast';

function RegisterPage() {
  const [signUp,setSignUp]=useState({
    firstName:"", lastName:"", email:"", phone:"", password:"",otp:""

   })
  const [verifyOTP,setVerifyOTP]=useState({
    email:"",otp:""

   })
   const [isOTP,setIsOTP]=useState(false)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState()
    const {setUser,setIsAdmin,setIsAuthanticate } = useContext(ContextAPI);
    const navigate = useNavigate();
  


    const handleChange=(e)=>{

      if(error){
        setError(null)
      }

      const {name,value}=e.target;

      setSignUp((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));

    }

    const handleSubmit= async(e)=>{
      e.preventDefault();

      try {
        setLoading(true)

        if (
          signUp.firstName?.toLowerCase().includes('admin') ||
          signUp.email?.toLowerCase().includes('admin')
        ) {
          return toast.error("Something went wrong. Please try again later.");
        }
        
      const response= await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        signUp,
        {
          withCredentials: true 
        }
      );

      if(response.status===200){
   
        setIsAuthanticate(true)
        setVerifyOTP((prevForm) => ({
          ...prevForm,
          ['email']: signUp.email,
        }));
 
        
        setUser(response.data.user)
        toast.success(response.data.message)
        setIsOTP(true)
    
        
      }
     
    

  
      }catch (error) {
        console.log(error);
        
        const errors = error?.response?.data?.errors;
        const message = error?.response?.data?.message;
      
        if (errors && errors.length > 0) {
          toast.error(errors[0].msg);
        } else if (message) {
          toast.error(message);
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      }
      finally{
        // setSignUp({
        //   email:"",
        //   password:""
        // })
        setLoading(false)
      }


    }

    const VerifyOtp= async(e)=>{
      e.preventDefault();
      setLoading(true)
        try {

     
          

          const response= await axios.post(`${import.meta.env.VITE_API_URL}/users/verify-otp`,
            verifyOTP,
            {
              withCredentials:true
            }
          )

          console.log(response);
          
          if(response.status===200){
            toast.success(response.data.message)
            setIsAuthanticate(true)
            if(response.data.user.email==='admin@gmail.com'){
              setIsAdmin(true)
            }
            setUser(response.data.user)
            setIsOTP(false);
            navigate('/')
          }
          
        } catch (error) {
          console.log(error);
          
          const errors = error?.response?.data?.errors;
          const message = error?.response?.data?.msg;
          if (errors && errors.length > 0) {
            setError(errors[0].msg);
            } else if (message) {
              setError(message);
              } else {
                setError('Something went wrong. Please try again.');
                }
          
        }
        finally{
          setLoading(false)
        }
     

    }
  
    
  
   
  
    return (
      <div className="min-h-screen flex  items-center justify-center">
        <div className=" lg:p-8 min-h-[80vh] md:h-[70vh]  flex justify-center items-center md:flex-row rounded md:shadow-md w-full lg:max-w-5xl">

         <div className="md:w-1/2 lg:px-10 w-full  mb-10  flex justify-center items-center h-full flex-col">
         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
          
          <form onSubmit={isOTP?VerifyOtp:handleSubmit} className="w-full px-8">
            <div className="mb-4 w-full flex gap-2 ">
             
              <input
                className=" text-center w-full  shadow outline-none border-none bg-gray-100 appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder=" First Name*"
                value={signUp.firstName}
                name="firstName"
                disabled={isOTP}
                onChange={handleChange}
                required
              />
            {/* </div>
            <div className="mb-4 w-full "> */}
             
              <input
                className=" text-center w-full  shadow outline-none border-none bg-gray-100 appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={signUp.lastName}
                name="lastName"
                disabled={isOTP}
                onChange={handleChange}
              
              />
            </div>
            <div className="mb-4 w-full ">
             
              <input
                className=" text-center w-full  shadow outline-none border-none bg-gray-100 appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email*"
                value={signUp.email}
                name="email"
                disabled={isOTP}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 w-full ">
             
              <input
                className=" text-center w-full  shadow outline-none border-none bg-gray-100 appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="number"
                placeholder="Phone Number"
                value={signUp.phone}
                disabled={isOTP}
                name="phone"
                onChange={handleChange}
              
              />
            </div>
            
            <div className="mb-6">
              
              <input
                className=" text-center  shadow outline-none border-none bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password*"
                value={signUp.password}
                disabled={isOTP}
                // minLength={6}
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="flex flex-col space-y-4">

            <div className={`mb-6 ${isOTP?"block":"hidden"}  `} >
              <label htmlFor="otp" className='text-center w-full block text-gray-500'> ---- OTP ----</label>
              
              <input
                className=" text-center  shadow outline-none border-none bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="number"
                placeholder="Enter 6 digit OTP"
                value={verifyOTP.otp}
                minLength={6}
                name="otp"
                onChange={
                  (e)=>{
                    setVerifyOTP((prev)=>({
                      ...prev,otp:e.target.value
                    }))
                  }
                }
                required={isOTP}
                disabled={false}
              />
            </div>

              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold mt-1 py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Loading...' : `${isOTP?"Verify OTP":"Sign Up"}`}
              </button>
              
              
              <div className="text-center">
                <span className="text-gray-600 text-sm">Already have an account? </span>
                <Link to="/login" className="text-blue-500 hover:text-blue-800 text-sm">
                  Login
                </Link>
              </div>
            </div>
          </form>
         </div>
         <div className="w-1/2 hidden md:block ">    

          <img src={signup} alt="signUp"  />

         </div>
        </div>
      </div>
    );
  }
  
export default RegisterPage;
