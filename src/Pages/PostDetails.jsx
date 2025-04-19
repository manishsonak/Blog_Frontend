import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from "js-cookie";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate= useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/${slug}`,{
            headers: {
              Authorization: `Bearer ${token}`,
              },
          },
          {
            withCredentials: true
          }
        );
        
        
        if (response.status !== 200) {
         
          throw new Error(`Failed to fetch post: ${response.status}`);
        }
        
        const data = response.data;
        setPost(data);
      } catch (err) {
        setError(err.message);
        navigate('/login')
        console.error('Error fetching post details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPostDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md">
          <p>Post not found</p>
        </div>
      </div>
    );
  }

  // Fix the condition check to properly render content with spaces
  const renderContent = () => {
    if (post.content) {
      // Use dangerouslySetInnerHTML for HTML content
      return <div dangerouslySetInnerHTML={{ __html: post.content }} className="whitespace-pre-wrap" />;
    } else if (post.description) {
      // For plain text with preserved spaces
      return <pre className="font-sans whitespace-pre-wrap break-words">{post.description}</pre>;
    } else {
      return <p>No content available</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
      {/* Post Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center text-gray-600 mb-4">
          {post.author && post.author.email && (
            <div className="flex items-center mr-6 mb-2">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Manish Sonak</span>
            </div>
          )}
          
          {post.date && (
            <div className="flex items-center mr-6 mb-2">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          )}
          
          {post.category && (
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              <span>{post.category}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Image */}
      {post.image && (
        <div className="mb-8">
          <img 
            src={post.image} 
            alt={post.title}
            onError={(e) => {
              e.target.src = "/api/placeholder/800/400";
              e.target.alt = "Image not available";
            }}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      )}
      
      {/* Post Content with space preservation */}
      <div className="prose max-w-none">
        {renderContent()}
      </div>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Back Button */}
      <div className="mt-12">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Posts
        </button>
      </div>
    </div>
  );
}