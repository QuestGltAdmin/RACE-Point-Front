import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SuperUserRoutes = ({ children }) => {
  const { isUserAuthenticated ,user} = useAuth();
  
  const location = useLocation();
  if (isUserAuthenticated && user?.role == "super user") {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default SuperUserRoutes;
