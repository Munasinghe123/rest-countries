import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, setCheckedAuth } from "../Redux/UserSlice";
import { jwtDecode } from "jwt-decode";

const AuthChecker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/checktoken`,
          { withCredentials: true }
        );
        const decoded = jwtDecode(response.data.token);
        dispatch(loginSuccess({ user: decoded }));
      } catch (err) {
      
      } finally {
        dispatch(setCheckedAuth(true));
      }
    };

    checkAuth();
  }, []);

  return null;
};

export default AuthChecker;
