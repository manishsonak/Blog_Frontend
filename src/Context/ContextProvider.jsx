import { useEffect, useState } from "react";
import { ContextAPI } from "./ContextAPI";
import Cookies from "js-cookie";
import axios from "axios";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthanticate, setIsAuthanticate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUser = async () => {

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/get-user`,
        {
          withCredentials: true,
        }
      );

      const userData = response.data.User;
      
      setUser(userData);
      
      setIsAuthanticate(true);
      
      setIsAdmin(userData.email === "admin@gmail.com");
      
    } catch (error) {
      setUser(null);
      setIsAuthanticate(false);
      Cookies.remove("token");
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
  
    const initializeUser = async () => {


      
      
      if (token) {
        
        return await fetchUser();
      } else {
        setUser(null);
        setIsAuthanticate(false);
        console.warn("No token found in cookies");
      }
    };
  
    initializeUser();
  }, []);
  return (
    <ContextAPI.Provider
      value={{
        user,
        setUser,
        isAuthanticate,
        setIsAuthanticate,
        currentCategory,
        setCurrentCategory,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};

export default ContextProvider;
