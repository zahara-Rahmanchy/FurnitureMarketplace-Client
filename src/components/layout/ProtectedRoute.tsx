import {ReactNode} from "react";
import {useAppSelector} from "../../redux/hooks";
import {useCurrentToken} from "../../redux/features/auth/authSlice";
import {Navigate} from "react-router-dom";
import {verifyToken} from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string;
};

export type TUser = {
  username: string;
  role: string;
  iat: number;
  exp: number;
};

const ProtectedRoute = ({children, role}: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user;

  if (token) {
    user = verifyToken(token);
  }

  console.log("user: ", user);
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  if (role !== "both" && (user as TUser)?.role !== role) {
    console.log("role: ", role);
    return <Navigate to="/login" replace={true} />;
  }
  if (role === "both" && ((user as TUser)?.role === "seller" || "buyer")) {
    console.log("role: ", role);
    return children;
  }

  return children;
};

export default ProtectedRoute;
