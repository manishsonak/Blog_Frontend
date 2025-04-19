/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ContextAPI } from '../Context/ContextAPI';
import forgot from '../assets/images/Login.png'
import toast from 'react-hot-toast';


function ForgotPassword() {

    
        const [loading,setLoading]=useState(false)
        const [email,setEmail]=useState("");
        const [otp,setOtp]=useState("");
        const [section,setSection]=useState(1);
        const [password,setPassword]=useState("");
        const [confirmPassword,setConfirmPassword]=useState("");
        // const {setUser,setIsAuthanticate } = useContext(ContextAPI);
        const navigate = useNavigate();
    
    
    
       
      
    
        const handleSubmit= async(e)=>{
          e.preventDefault();
    
          try {
            setLoading(true)


        
            
          const response= await axios.post(
            `${import.meta.env.VITE_API_URL}/users/forgot-password`,
            {email:email},
            {
              withCredentials: true 
            }
          );

        
          
    
          if(response.status===200){
    
            toast.success(response.data.message)
            setSection(2)
            
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
            setLoading(false)
          }
    
    
        }
        const VerifyOTP= async(e)=>{
          e.preventDefault();
    
          try {
            setLoading(true)


            
          const response= await axios.post(
            `${import.meta.env.VITE_API_URL}/users/verify-otp`,
            {email:email,otp:otp},
            {
              withCredentials: true 
            }
          );
    
          if(response.status===200){
    
            toast.success(response.data.message)
            setSection(3)
            
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
            setLoading(false)
          }
    
    
        }
    
        const ResetPassword = async (e)=>{
            e.preventDefault();

           try {
            setLoading(true)

            const response= await axios.post(`${import.meta.env.VITE_API_URL}/users/reset-password`,
                {email:email,newPassword:password},
                {
                    withCredentials:true
                }
            )

            if(response.status === 200){
                toast.success(response.data.message)
                setSection(1)
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setOtp("")
                navigate('/login')
            }


           } catch (error) {
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
            setLoading(false)
            setSection(1)
            
            
           }

           }
        
     
       
        
      

  return (
    <div className="min-h-screen flex  items-center justify-center">
           <div className=" lg:p-8 min-h-[70vh] md:h-[70vh] relative  flex justify-center items-center md:flex-row rounded md:shadow-md w-full lg:max-w-5xl">

           <div className="absolute top-7 left-7">
        <button to='/' 
          onClick={() => window.history.back()}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          
        </button>
      </div>
                {section ===1 && (
                 <div className="md:w-1/2 lg:px-10 w-full  mb-10   flex justify-center items-center h-full flex-col">
                 <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                                    
                  <form onSubmit={handleSubmit} className="w-full px-8">
                    <div className="mb-4 w-full ">
                     
                      <input
                        className=" text-center w-full shadow outline-none border-none bg-gray-100 appearance-none border rounded-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                     required
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold mt-1 py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Send OTP'}
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
          
            )}

            {section === 2 && (
                 <div className="md:w-1/2 lg:px-10 w-full  mb-10   flex justify-center items-center h-full flex-col">
                 <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                  
                
                  
                  <form onSubmit={VerifyOTP} className="w-full px-8">
                  
                    
                    <div className="mb-6">
                      
                      <input
                        className=" text-center  shadow outline-none border-none bg-gray-100 appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="otp"
                        type="number"
                        placeholder="Enter OTP"
                        value={otp}
                        minLength={6}
                        name="otp"
                        onChange={(e)=>{
                            setOtp(e.target.value)
                        }}
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                   
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold mt-1 py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Verify OTP'}
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
          
            )}

            {
                section === 3 && (
                    <div className="md:w-1/2 lg:px-10 w-full  mb-10   flex justify-center items-center h-full flex-col">
                    <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                     
                     <form onSubmit={ResetPassword} className="w-full px-8">
                       <div className="mb-4 w-full ">
                        
                         <input
                           className=" text-center w-full shadow outline-none border-none bg-gray-100 appearance-none border rounded-lg py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           id="password"
                           type="password"
                           placeholder="Enter New Password"
                           value={password}
                           name="password"
                           onChange={(e)=>{
                            setPassword(e.target.value)
                           }}
                           required
                         />
                       </div>
                       
                       <div className="mb-6">

                        { confirmPassword && confirmPassword!==password  && (
                            <p className='text-red-600'>Password and Confirm Password is not match</p>
                        )}
                         
                         <input
                           className=" text-center  shadow outline-none border-none bg-gray-100 appearance-none border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           id="c-password"
                           type="password"
                           placeholder="Confirm Password"
                           value={confirmPassword}
                           minLength={6}
                           name="c-password"
                           onChange={(e)=>{
                            setConfirmPassword(e.target.value)
                           }}
                           required
                         />
                       </div>
                       
                       <div className="flex flex-col space-y-4">
                         
                         <button
                           className="bg-orange-500 hover:bg-orange-600 text-white font-bold mt-1 py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                           type="submit"
                           disabled={loading}
                         >
                           {loading ? 'Loading...' : 'Reset Password'}
                         </button>
                         
                         
                         
                       </div>
                     </form>
                    </div>
             
                )
            }
              
             
            <div className="w-1/2 hidden md:block ">    
   
             <img src={forgot} alt="LoginForm"  />
   
            </div>
           </div>
           
   
         </div>
  )
}

export default ForgotPassword