import React, { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";
import axios from 'axios'

function FeatureArtical() {

  const [article,setArticle]=useState([])

  useEffect(() => {
    
   const fetchArticle= async ()=>{

    const response= await axios.get(`${import.meta.env.VITE_API_URL}/posts/getAll-posts?limit=9&page=1`);

    setArticle(response.data.posts)
   }

   fetchArticle();
    
   
  },[] );


  return (
    <div className="min-h-[90vh] flex justify-center gap-3 items-center flex-col px- py-16 ">
      <div className="text-center mb-8">
        <h1 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">
          Featured Articles
        </h1>
        <div className="w-16 h-1 bg-yellow-600 mx-auto mb-4"></div>
        <p className="lg:text-lg text-md text-gray-700">
          Our selection of must-read content from the design world
        </p>
      </div>
      <div className="px-4 mt-7 grid gap-6 lg:max-w-[1200px] w-full mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

    {article && article.map((article)=>(
      <FeatureCard key={article._id}  category={article.category}
      title={article.title}
      description={article.content}
      image={article.image}
      slug={article.slug} />
    ))}

       
      </div>
    </div>
  );
}

export default FeatureArtical;
