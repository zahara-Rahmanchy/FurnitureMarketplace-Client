import {useCurrentToken} from "../redux/features/auth/authSlice";
import {useAppSelector} from "../redux/hooks"; // Adjust path as needed

import {verifyToken} from "../utils/verifyToken";
// Token verification function

export const useAuth = () => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }
  return user;
};
