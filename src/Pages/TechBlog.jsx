/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LatestArticalCard from '../Components/LatestArticalCard';
import FeatureCard from '../Components/FeatureCard';
import { ContextAPI } from '../Context/ContextAPI';
import toast from 'react-hot-toast';

export default function TechBlog() {
  // Your predefined categories - replace with your actual categories
  const categories = [
    { id: 1, name: 'Technology', slug: 'technology' },
    { id: 2, name: 'Travel', slug: 'travel' },
    { id: 3, name: 'Food', slug: 'food' },
    { id: 4, name: 'Lifestyle', slug: 'lifestyle' },
    { id: 5, name: 'Business', slug: 'business' },
    { id: 6, name: 'Health', slug: 'health' },
    { id: 7, name: 'Education', slug: 'education' },
    { id: 8, name: 'Entertainment', slug: 'entertainment' }

  ];

  // State for managing current category and blog posts
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data,setData]=useState([]);
  const [page,setPage]= useState(1);
  const [hasMore,setHasMore]=useState(true)

  const {currentCategory,setCurrentCategory}= useContext(ContextAPI)

  // Sample blog data - replace with your actual data or API call
 

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle category selection
  const handleCategorySelect = async (category) => {

    setIsLoading(true)
    setCurrentCategory(category)

    if (category === 'all') {
          
       
        setIsLoading(false)
        return setData(blogs)
        
    }
    
    const SelectedCategory = blogs.filter((data) => {
      return data.category.toLowerCase() === category.toLowerCase();
  });
  
    

    
    setData(SelectedCategory)   
    
    setIsLoading(false)
    
  };
  const fetchData = async () => {
    try {
      setIsLoading(true);
  
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/getAll-posts?limit=9&page=${page}`);
      const newPosts = response.data.posts;
      
  
      // Check if there's more data to load
      if (newPosts.length === 0 || newPosts.length < 9) {
        setHasMore(false);
      }
  
      // Combine and deduplicate posts
      const updatedBlogs = Array.from(
        new Map([...blogs, ...newPosts].map(post => [post._id, post])).values()
      );
  
      // Update blogs state
      setBlogs(updatedBlogs);
  
      // Filter if category is selected
      if (currentCategory !== 'all') {
        const filtered = updatedBlogs.filter((data) =>
          data.category.toLowerCase() === currentCategory.toLowerCase()
        );
        setData(filtered);
      } else {
        setData(updatedBlogs);
      }
  
    } catch (error) {
      toast.error('Error Featchin Posts')
    } finally {
      setIsLoading(false);
    }
  };
  


  // On initial load, show all blogs
  useEffect(() => {

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;
    
        // Check if user is near bottom (within 100px)
        if (scrollHeight - scrollTop - clientHeight < 100 && !isLoading && hasMore) {
          setPage(prev => prev + 1);
        }
      };
    
      window.addEventListener("scroll", handleScroll);
      
      return () => {
        window.removeEventListener("scroll", handleScroll); // Cleanup
      };


  },);




  useEffect(  ()=>{

    
    fetchData();
    if (currentCategory!=='all') {
      

      
      
      const SelectedCategory=   blogs.filter((data)=>{
        return data.category.toLowerCase() === currentCategory.toLowerCase();
       })
     
       
       
       setData(SelectedCategory)
       
       setIsLoading(false)
      
       return;
   }
  },[page])

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Navigation Bar */}
      <nav className="bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to='/' className="text-xl font-bold text-gray-800">SonakBlog</Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`py-2 px-3 text-sm font-medium ${
                  currentCategory === 'all' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                All Posts
              </button>
              
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.slug)}
                  className={`py-2 px-3 text-sm font-medium ${
                    currentCategory === category.slug 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                className="p-2 text-gray-500 hover:text-blue-600"
                onClick={toggleMenu}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-2 space-y-1">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`block w-full text-left py-2 px-3 text-sm font-medium ${
                  currentCategory === 'all' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Posts
              </button>
              
              {categories.map((category,idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategorySelect(category.slug)}
                  className={`block w-full text-left py-2 px-3 text-sm font-medium ${
                    currentCategory === category.slug 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Category Header */}
      <div className="py-8">
        <h1 className="text-3xl font-bold">
          {currentCategory === 'all' 
            ? 'All Blog Posts' 
            : categories.find(cat => cat.slug === currentCategory)?.name || 'Blog'}
        </h1>
        <p className="text-gray-600 mt-2">
          {currentCategory === 'all' 
            ? 'Browse all our latest articles and resources' 
            : `Articles related to ${categories.find(cat => cat.slug === currentCategory)?.name || 'this category'}`}
        </p>
      </div>

      {/* Blog Posts */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          
          {data.length > 0 ? (
            data.map(blog => (
              <div key={blog._id} className=" rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              
              <FeatureCard key={blog._id}  category={blog.category}
      title={blog.title}
      description={blog.content}
      image={blog.image}
      slug={blog.slug} />
              
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-500">No blog posts found in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}