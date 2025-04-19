import React from 'react'
import CategoryCard from './CategoryCard'

function BrowseByCategory() {

    const categories = [
        { id: 1, name: "Technology", image: "https://th.bing.com/th/id/OIP.89uvk8TA6-reQ7koKTfAwwHaEX?w=315&h=186&c=7&r=0&o=5&dpr=2&pid=1.7" },
        { id: 2, name: "Travel", image: "https://th.bing.com/th/id/OIP.KyuYNSYvT9c6TLoLSrnRngHaE7?w=266&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" },
        { id: 3, name: "Food", image: "https://th.bing.com/th/id/OIP.jUfCu2A6ilKJAdybISEMgwHaHa?w=179&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" },
        { id: 4, name: "Lifestyle", image: "https://th.bing.com/th/id/OIP.MPEkcevn3LG1o0ZVbC8sYgHaE7?w=286&h=190&c=7&r=0&o=5&dpr=2&pid=1.7" }
      ];

  return (
    <div className='min-h-[60vh] flex justify-center items-center flex-col py-16 px-4 md:px-8'>
    <div className="text-center mb-12">
      <h1 className="lg:text-4xl text-2xl font-bold text-black mb-4">Browse by Category</h1>
      <div className="w-16 h-1 bg-yellow-600 mx-auto mb-4"></div>
      <p className="lg:text-lg text-md text-[#959595]">
        Dive into your favorite design topics
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
      {categories.map(category => (
        <CategoryCard key={category.id} name={category.name} image={category.image} />
      ))}
    </div>
  </div>
  )
}

export default BrowseByCategory