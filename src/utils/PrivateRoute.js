import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children, allowed }) {
  if (allowed) {
    return children;
  }
  return <Navigate to="/" />; 
}



