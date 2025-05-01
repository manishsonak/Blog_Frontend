/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ContextAPI } from "./ContextAPI";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthanticate, setIsAuthanticate] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUser = async () => {

    try {

      const token = Cookies.get('token');
      console.log(token);
      
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/get-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      toast.error('Error fetaching users')
    }
  };

  useEffect(() => {

  
    const initializeUser = async () => {

         await fetchUser();
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
