import { useContext } from "react";
import { ContextAPI } from "../Context/ContextAPI";
import { useNavigate } from "react-router-dom";

function CategoryCard({ name, image }) {

  const {setCurrentCategory}= useContext(ContextAPI);
  const navigate= useNavigate()

  const selectCategory =()=>{
    
    
    setCurrentCategory(name.toLowerCase());
    navigate('/category/tech')

  }



    return (
        <div onClick={selectCategory} className="bg-[#959595] rounded-lg overflow-hidden relative h-44 cursor-pointer hover:bg-[#cbb89e] hover:shadow-lg transition-all duration-400 ease-in-out">
        <img src={image} alt={name} className="w-full h-full object-cover absolute inset-0 opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-2xl font-bold">{name}</h3>
        </div>
      </div>
    );
  }
  export default CategoryCard