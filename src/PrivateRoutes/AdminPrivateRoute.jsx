import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminPrivateRoute = ({ children }) => {
  const { isUserAuthenticated } = useAuth();
  const location = useLocation();
  if (isUserAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default AdminPrivateRoute;
