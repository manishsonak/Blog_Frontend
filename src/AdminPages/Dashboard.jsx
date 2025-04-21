/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { 
  PlusCircle, 
  Trash2, 
  Edit, 
  Search, 
  Upload,
  RefreshCcw,
  Link as LinkIcon,
  Image as ImageIcon,
  Menu,
  X
} from "lucide-react";
import toast from "react-hot-toast";

// Sample categories for dropdown
const categories = [
  "Technology",
  "Travel",
  "Food",
  "Lifestyle",
  "Business",
  "Health",
  "Education",
  "Entertainment"
];

export default function BlogDashboard() {
  // Post state management
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // UI state management
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Form state for editing or adding posts
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Technology",
    image: "",
    link: ""
  });

  // Observer for infinite scroll
  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Initial data fetch
  useEffect(() => {
    fetchPosts();
  
  }, []);

  // Fetch when page changes (for infinite scroll)
  useEffect(() => {
    if (page > 1) {
      fetchMorePosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/getAll-posts?limit=10&page=1`
      );
      
      setPosts(response.data.posts || []);
      setHasMore(response.data.posts?.length === 10);
    } catch (err) {
      toast.error("Failed to fetch posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch more posts (for infinite scroll)
  const fetchMorePosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/getAll-posts?limit=10&page=${page}`
      );
      const newPosts = response.data.posts || [];
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length === 10);
    } catch (err) {
      toast.error("Failed to fetch more posts. Please try again.");
     
    } finally {
      setLoading(false);
    }
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle post selection
  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title || "",
      content: post.content || "",
      category: post.category || "Technology",
      image: post.image || "",
      link: post.link || ""
    });
    // Close mobile menu when selecting a post
    setMobileMenuOpen(false);
  };

  // Handle creating a new post
  const handleAddPost = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedPost(null);
    setFormData({
      title: "",
      content: "",
      category: "Technology",
      image: "",
    });
    // Close mobile menu when adding a post
    setMobileMenuOpen(false);
  };

  // Handle editing an existing post
  const handleEditPost = () => {
    if (selectedPost) {
      setIsEditing(true);
      setIsAdding(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission for edit/add
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isAdding) {
     
        
        // Add new post
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/posts/create-post`,
          formData,{
            withCredentials:true
          }
        );
        setPosts([response.data, ...posts]);
        setIsAdding(false);
      } else if (isEditing && selectedPost) {
        // Update existing post
        await axios.put(
          `${import.meta.env.VITE_API_URL}/posts/update-post/${selectedPost._id}`,
          formData,{
            withCredentials:true
          }
        );
        setPosts(posts.map(post => 
          post._id === selectedPost._id ? { ...post, ...formData } : post
        ));
        setIsEditing(false);
      }
    } catch (err) {
      toast.error("Failed to save post. Please try again.");

    }
  };

  // Handle post deletion
  const handleDeletePost = async (postId) => {
    try {
       

        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) {
  
         toast.error('Data Not Deleted')
          return

        } 

        
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/delete-post/${postId}`,{
        withCredentials:true
      });
      setPosts(posts.filter(post => post._id !== postId));
      if (selectedPost && selectedPost._id === postId) {
        setSelectedPost(null);
        setIsEditing(false);
      }
    } catch (err) {
      toast.error("Failed to delete post. Please try again.");
    
    }
  };

  // Handle image upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
    }
  };

  // Handle image upload submission
  const handleUpload = async (e) => {
    e.preventDefault();
    if (fileToUpload) {
      try {
        const formData = new FormData();
        formData.append("file", fileToUpload);
        
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        // Assuming the server returns the image URL
        setFormData(prev => ({
          ...prev,
          image: response.data.imageUrl
        }));
        
        alert("Image uploaded successfully!");
        setFileToUpload(null);
      } catch (err) {
        setError("Failed to upload image. Please try again.");
        
      }
    }
  };

  // Reset all forms and selected states
  const handleReset = () => {
    setSelectedPost(null);
    setIsEditing(false);
    setIsAdding(false);
    setFileToUpload(null);
    setFormData({
      title: "",
      content: "",
      category: "Technology",
      image: "",
      link: ""
    });
  };

  // Refresh posts
  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    setPosts([]);
    fetchPosts();
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Blog Dashboard</h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label="Refresh posts"
            >
              <RefreshCcw size={20} />
            </button>
            
            {/* Search - hidden on small screens */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Add post button - visible on medium screens and up */}
            <button
              onClick={handleAddPost}
              className="hidden md:flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              New Post
            </button>
            
            {/* Mobile menu button - visible only on small screens */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile search - visible only on small screens */}
        <div className="md:hidden mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Mobile menu - visible only when toggled on small screens */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 py-2 bg-gray-50 rounded-lg">
            <button
              onClick={handleAddPost}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              <PlusCircle className="mr-2 h-5 w-5 text-blue-600" />
              New Post
            </button>
          </div>
        )}
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar / Post List - Responsive layout */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block md:w-1/3 lg:w-1/4 bg-white shadow-md overflow-y-auto`}>
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Posts</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="space-y-2 overflow-y-scroll max-h-screen" >
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => {
                  if (filteredPosts.length === index + 1) {
                    return (
                      <div
                      ref={lastPostElementRef}
                        key={post._id}
                        className={`p-3 rounded-lg cursor-pointer ${selectedPost && selectedPost._id === post._id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                        onClick={() => handleSelectPost(post)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-800 truncate">{post.title}</h3>
                          
                            <p className="text-sm text-gray-500 truncate">{post.category} • {new Date(post.created_at).toLocaleDateString()}</p>
                          </div>
                          {post.image && (
                            <div className="ml-2 flex-shrink-0">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="h-10 w-10 object-cover rounded"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/api/placeholder/40/40"; 
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex mt-2 space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPost(post);
                              handleEditPost();
                            }}
                            className="p-1 text-gray-500 hover:text-blue-600"
                            aria-label="Edit post"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post._id);
                            }}
                            className="p-1 text-gray-500 hover:text-red-600"
                            aria-label="Delete post"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg cursor-pointer ${selectedPost && selectedPost._id === post._id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                        onClick={() => handleSelectPost(post)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-800 truncate">{post.title}</h3>
                            <p className="text-sm text-gray-500 truncate">{post.category} • {new Date(post.createdAt).toLocaleDateString()}</p>
                          </div>
                          {post.image && (
                            <div className="ml-2 flex-shrink-0">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="h-10 w-10 object-cover rounded"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/api/placeholder/40/40"; 
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex mt-2 space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPost(post);
                              handleEditPost();
                            }}
                            className="p-1 text-gray-500 hover:text-blue-600"
                            aria-label="Edit post"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post._id);
                            }}
                            className="p-1 text-gray-500 hover:text-red-600"
                            aria-label="Delete post"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="text-center py-6 text-gray-500">
                  {loading ? "Loading posts..." : "No posts found. Create a new post or adjust your search."}
                </div>
              )}
              
              {loading && (
                <div className="text-center py-4 text-gray-500">
                  Loading more posts...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area - Responsive layout */}
        <div className={`${mobileMenuOpen ? 'hidden' : 'block'} md:block flex-1 p-4 md:p-6 overflow-y-auto`}>
          {isAdding && (
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h2 className="text-xl font-bold mb-4">Create New Post</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Image URL"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">or</span>
                    <label
                      className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200"
                    >
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Browse
                    </label>
                    {fileToUpload && (
                      <button
                        type="button"
                        onClick={handleUpload}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </button>
                    )}
                  </div>
                  {formData.image && (
                    <div className="mt-2">
                      <img 
                        src={formData.image} 
                        alt="Post preview" 
                        className="h-32 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/320/128"; 
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                    Link URL
                  </label>
                  <div className="flex items-center">
                    <LinkIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <input
                      type="url"
                      id="link"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      placeholder="https://example.com/article"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Create Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {isEditing && selectedPost && (
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h2 className="text-xl font-bold mb-4">Edit Post</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Image URL"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">or</span>
                    <label
                      className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200"
                    >
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Browse
                    </label>
                    {fileToUpload && (
                      <button
                        type="button"
                        onClick={handleUpload}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </button>
                    )}
                  </div>
                  {formData.image && (
                    <div className="mt-2">
                      <img 
                        src={formData.image} 
                        alt="Post preview" 
                        className="h-32 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/320/128"; 
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                    Link URL
                  </label>
                  <div className="flex items-center">
                    <LinkIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <input
                      type="url"
                      id="link"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      placeholder="https://example.com/article"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {!isAdding && !isEditing && selectedPost && (
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                <h2 className="text-xl font-bold mb-2 sm:mb-0">{selectedPost.title}</h2>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <button
                    onClick={handleEditPost}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                   onClick={() => handleDeletePost(selectedPost._id)}
                   className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                 >
                   <Trash2 className="h-4 w-4 mr-1" />
                   Delete
                 </button>
               </div>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4">
               {/* Left column with details */}
               <div className="flex-1">
                 <div className="mb-4">
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                     {selectedPost.category}
                   </span>
                   <p className="text-sm text-gray-500 mt-1">
                     Published on {new Date(selectedPost.created_at).toLocaleDateString()}
                   </p>
                 </div>
                 
                 {selectedPost.link && (
                   <div className="mb-4 flex items-center">
                     <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
                     <a 
                       href={selectedPost.link} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-600 hover:underline truncate"
                     >
                       {selectedPost.link}
                     </a>
                   </div>
                 )}
                 
                 <div className="prose max-w-none">
                   <p className="whitespace-pre-line">{selectedPost.content}</p>
                 </div>
               </div>
               
               {/* Right column with image if available */}
               {selectedPost.image && (
                 <div className="sm:w-1/3 flex-shrink-0">
                   <img 
                     src={selectedPost.image} 
                     alt={selectedPost.title} 
                     className="w-full h-auto rounded-lg object-cover shadow-md"
                     onError={(e) => {
                       e.target.onerror = null;
                       e.target.src = "/api/placeholder/400/300"; 
                     }}
                   />
                 </div>
               )}
             </div>
           </div>
         )}

         {!isAdding && !isEditing && !selectedPost && !loading && (
           <div className="flex flex-col items-center justify-center h-full py-12 text-center">
             <div className="bg-white rounded-lg shadow p-8 max-w-md mx-auto">
               <h2 className="text-xl font-bold mb-4">Welcome to your Blog Dashboard</h2>
               <p className="text-gray-600 mb-6">
                 Select a post from the sidebar to view details or create a new post to get started.
               </p>
               <button
                 onClick={handleAddPost}
                 className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
               >
                 <PlusCircle className="h-5 w-5 mr-2" />
                 Create New Post
               </button>
             </div>
           </div>
         )}
       </div>
     </div>

     {/* Footer */}
     <footer className="bg-white shadow-inner px-4 py-3 mt-auto">
       <div className="flex justify-between items-center">
         <p className="text-sm text-gray-600">
           © {new Date().getFullYear()} Blog Dashboard
         </p>
         <div className="text-sm text-gray-500">
           {posts.length} posts total
         </div>
       </div>
     </footer>
   </div>
 );
}