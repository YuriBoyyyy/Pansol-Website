import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";

function PrivateRoutes() {
  const auth = getAuth();
  const user = auth.currentUser;

  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin-first" state={{ from: location }} replace />
  );
}

export default PrivateRoutes;
