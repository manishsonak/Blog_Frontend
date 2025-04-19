import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="h-screen md:h-[80vh] bg-gradient-to-r from-[#4c4c4c] to-[#d8d8d8] flex justify-center flex-col items-center w-full px-4 md:px-8 relative overflow-hidden">
    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '100px 100px'
    }}></div>
    
    <div className="w-full max-w-xl text-white relative z-10">
      <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
      Discover What's Next in Tech, Health & Beyond
      </h1>
      <p className="text-lg mt-6 opacity-90">
        Explore curated content from the world's most innovative designers, architects, and creative visionaries.
      </p>
      <Link to='/category/tech' className="inline-block mt-6">
        <button className="py-3 px-7 border-0 rounded bg-[#8a714e] hover:bg-[#ad8e63] font-bold transition-colors duration-300 text-white">
          Discover Our Articles
        </button>
      </Link>
    </div>
    
    {/* Decorative element */}
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mb-32"></div>
    <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mt-16"></div>
  </div>
  );
}

export default HeroSection;