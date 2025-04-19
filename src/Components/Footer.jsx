import React, { useContext } from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom'
import {ContextAPI} from '../Context/ContextAPI'

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate=useNavigate();

  const {setCurrentCategory}=useContext(ContextAPI)

  const setCategory = (e)=>{


    setCurrentCategory(e.target.textContent);
    navigate('/category/tech')
    
    
  }

  return (
    <footer className="bg-black text-gray-300 py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h2 className="text-white text-2xl font-bold mb-4">SonakBlog</h2>
            <p className="mb-6 text-gray-400">
            A vibrant blog platform delivering fresh insights, stories, and tips across technology, travel, food, lifestyle, business, health, education, and entertainment.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100025851462616" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/ManishSonak?t=2o5YiTZjag4Iso_813el-w&s=09" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/manish-sonak-26233129a/" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/manish_sonak/" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4 relative">
              Categories
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gray-300"></span>
            </h3>
            <ul className="space-y-3">
              <li><button onClick={setCategory} className="hover:text-white transition-colors">Technology</button></li>
              <li><button onClick={setCategory} className="hover:text-white transition-colors">Travel</button></li>
              <li><button onClick={setCategory} className="hover:text-white transition-colors">Lifestyle</button></li>
              <li><button onClick={setCategory} className="hover:text-white transition-colors">Food</button></li>
              <li><button onClick={setCategory} className="hover:text-white transition-colors">Business</button></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4 relative">
              Resources
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gray-300"></span>
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Design Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Color Palettes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">eBooks</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4 relative">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gray-300"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/category/tech" className="hover:text-white transition-colors">Category</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left text-gray-500">
          © {currentYear} Manish Blog • All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;