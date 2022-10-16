import { Outlet, Navigate } from "react-router-dom";

//import { useUserContext } from "../contexts/userContext";
// commented out because context is yet to be implimened with new backend

const ProtectedRoutes = ({ isLoggedIn }) => {
  //const { user } = useUserContext();

  //return user.firstName ? <Outlet /> : <Navigate to="/" />;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
