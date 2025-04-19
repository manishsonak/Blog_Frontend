import React from 'react'
import LatestArticalCard from './LatestArticalCard'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function LatestArticle() {

    const [latestArticle,setLatestArticle]=useState([])

    useEffect(()=>{

        const fetchLatestArticle= async ()=>{
            const response= await axios.get(`${import.meta.env.VITE_API_URL}/posts/getAll-posts?limit=10&page=1`);
         
            
            setLatestArticle(response.data.posts)
        }
        fetchLatestArticle()

    },[])

  return (
    <div className='min-h-[60vh] flex justify-center items-center flex-col py-16 px-4 md:px-8'>
        <div className='text-center mb-12'>
        <h1 className="lg:text-4xl text-2xl font-bold text-black mb-4" >Latest Article</h1>
        <div className="w-16 h-1 bg-yellow-600 mx-auto mb-4"></div>
        <p className="lg:text-lg text-md text-[#959595]" >Fresh content from our design contributors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-16 w-full max-w-5xl">
   {
        latestArticle && latestArticle.map((latest)=>(
            <LatestArticalCard key={latest._id} category={latest.category}
            title={latest.title}
            date={latest.updated_at}
            readTime={5}
            description={latest.content}
            slug={latest.slug} />
        ))
   }
     
    </div>

    </div>
  )
}

export default LatestArticle