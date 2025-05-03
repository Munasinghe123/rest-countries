
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/UserSlice";
import { jwtDecode } from "jwt-decode";

const AuthChecker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/checktoken`, {
          withCredentials: true,
        });

        console.log("Checked token :", response.data.token);;

        const decoded = jwtDecode(response.data.token);
        const user = decoded;
         
        console.log("Auth check successful:", user);

        dispatch(loginSuccess({ user }));
      } catch (err) {
        console.log("Auth check failed:", err.response?.data?.message || err.message);
      }
    };

    checkAuth();
  }, []);

  return null; 
};

export default AuthChecker;
