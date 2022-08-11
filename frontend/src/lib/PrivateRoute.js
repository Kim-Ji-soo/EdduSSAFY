// PrivateRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PrivateRoute({ component: Component }) {
  const accessToken = useSelector((state) => state.token.value);
  return accessToken.accessToken ? Component : <Navigate to="/login" />;
}

export default PrivateRoute;
