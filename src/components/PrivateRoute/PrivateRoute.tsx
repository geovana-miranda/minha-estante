import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loading from "../Loading/Loading";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
