import React from 'react'
import { Link } from 'react-router-dom';

function FeatureCard({category,title,description,image,slug})
{
  return ( <div className=" max-w-md bg-white rounded-lg w-full shadow-lg overflow-hidden">
  {/* Image placeholder - in a real implementation, this would be your actual image */}
  <div className="w-full h-64 bg-gray-100">
    <img 
      src={image} 
      alt="Minimalist interior design" 
      className="w-full h-full object-cover"
    />
  </div>
  
  <div className="p-6">
    <div className="uppercase text-yellow-700 font-medium text-sm tracking-wider mb-2">
  {category}
    </div>
    
    <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
      {title}
    </h2>
    
    <p className="text-gray-600 mb-5 line-clamp-6">
    {description}
    </p>
    
    <Link
      to={`/article/${slug}`}
      className="inline-flex items-center text-gray-800 font-medium"
    >
      Read Article 
      <svg 
        className="ml-2 w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </Link>
  </div>
</div>
);
}

export default FeatureCard