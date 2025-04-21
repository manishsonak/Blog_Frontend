import { useContext } from "react";

import { ContextAPI } from "../Context/ContextAPI";
import { Navigate } from "react-router-dom";


function PrivateRoute ({ children }) {
    const { user,isAuthanticate } = useContext(ContextAPI);

    if (user === null || !isAuthanticate) {

      // You can show a loader or just wait
      return <div>Loading...</div>;
    }
    
    return user ? children : <Navigate to="/login" />;
  }

  export default PrivateRoute