import { useContext } from "react";
import { ContextAPI } from "../Context/ContextAPI";
import { Navigate } from "react-router-dom";

function AdminProtector({ children }) {
  const { user, isAuthanticate } = useContext(ContextAPI);

  // Optional: a better loading check
  if (user === null || !isAuthanticate) {

    // You can show a loader or just wait
    return <div>Loading...</div>;
  }

  const isAdmin = user?.email === "admin@gmail.com";

  return isAdmin ? children : <Navigate to="/login" />;
}

export default AdminProtector;
