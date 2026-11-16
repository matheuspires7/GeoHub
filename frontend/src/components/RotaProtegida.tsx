import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// sem token, qualquer página manda pro login
const RotaProtegida: React.FC = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RotaProtegida;
