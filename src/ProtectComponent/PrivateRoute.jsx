import { useContext } from "react";

import { ContextAPI } from "../Context/ContextAPI";
import { Navigate } from "react-router-dom";


function PrivateRoute ({ children }) {
    const { user } = useContext(ContextAPI);

   
    
    return user ? children : <Navigate to="/login" />;
  }

  export default PrivateRoute