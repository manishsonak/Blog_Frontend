/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function NotificationMsg() {
    const [Notifications, setNotifications] = useState([])
    const [page,setPage]=useState(1)
    const [hasMore,setHasMore]= useState(true);

    const fetchData= async ()=>{
        try {

            const response= await axios.get(`${import.meta.env.VITE_API_URL}/users/get-feedback?limit=10&page=${page}`,{
                withCredentials:true
            })

            if(response.status===200){
             
                
                setNotifications((prev) => {
                    const newData = response.data.feedbacks;
                    const merged = [...prev, ...newData];
                  
                    const uniqueByEmail = [...new Map(merged.map(item => [item.email, item])).values()];
                  
                    return uniqueByEmail;
                  });

            } 
            if(response.data.feedbacks.length < 10){
                setHasMore(false)
            }

        }
        catch (error) {
          toast.error("Someting went worng, Try again later")
            }
    }

    const FindMore= ()=>{
                
    
        if(hasMore){

            

            setPage((prev)=>prev+1)
        }
    }


    useEffect(() => {
        
      
        fetchData();
     
    }, [page,hasMore])
    

  return (
    <>
 { Notifications && Notifications.map((msg, idx) => (
  <div key={idx} className='shadow-2xl p-3 my-3 rounded-2xl flex gap-2 justify-start items-center'>
    <img
      className='w-10 bg-transparent h-10 rounded-full'
      src="https://tse2.mm.bing.net/th/id/OIP.28jmE4s4hgzuaJnqvGffRQHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=2"
      alt=""
    />
    <div>
      <h2 className='text-md font-bold'>{msg.name}</h2>
      <p className='text-sm text-gray-600'>{msg.email}</p>
      <p>{msg.subject}</p>
      <p className='text-sm text-gray-600'>{msg.message}</p>
    </div>
  </div>
)) }

   {hasMore? ( <div className='w-full '>
        <button onClick={FindMore} className='text-blue-500 cursor-pointer  w-full block font-bold py-
        2 px-4 rounded'>See More</button>
    </div>):( <div className='w-full '>
        <button  className='text-blue-500  w-full block font-bold py-
        2 px-4 rounded'>No More Notifications</button>
    </div>)}
  
    </>
  )
}

export default NotificationMsg