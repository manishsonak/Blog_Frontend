import { Link } from "react-router-dom";

function LatestArticalCard({ category, title, date, readTime, description,slug }) {

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

    return (
      <div className="mb-8 p-4   shadow-md rounded-lg my-2 ">
        {/* Category */}
        <div className="uppercase text-yellow-700  font-medium text-sm tracking-wider mb-2">
          {category}
        </div>
        
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>
        
        {/* Date and read time */}
        <div className="text-gray-500 text-xs mb-3 line-clamp-4">
        {formattedDate} • {readTime} min read
        </div>
        
        {/* Description */}
        <p className="text-gray-600 line-clamp-6">
          {description}
        </p>

         <Link
              to={`/article/${slug}`}
              className="inline-flex items-center  mt-3 text-gray-800 font-medium"
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
    );
  }
  export default LatestArticalCard;