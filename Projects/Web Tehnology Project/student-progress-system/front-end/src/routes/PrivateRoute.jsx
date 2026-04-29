import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuth = true; // later use token

  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;