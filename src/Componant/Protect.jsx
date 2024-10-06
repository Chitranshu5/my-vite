import React, { useContext } from "react";
import { ChinuContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

// const {authen} = useContext(ChinuContext);

const Protect = ({ children }) => {
  const { authen } = useContext(ChinuContext);

  if (!authen) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" />;
  }

  // Render the protected component if authenticated
  return children;
};

export default Protect;
