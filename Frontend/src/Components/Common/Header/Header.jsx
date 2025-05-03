import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/UserSlice";
import Earth from '../../../assets/earth.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark,faUser,faRightFromBracket,faGlobe,faHouse  } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

function Header() {
  const { isAuthenticated,user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen,setMenuOpen] = useState(false);

  const toggleMenu =()=>  setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`, {}, { withCredentials: true });
      dispatch(logout());
      setMenuOpen(!menuOpen);
      console.log("Logged out, navigating to /");
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="w-full px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md shadow-md text-white fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <img src={Earth} alt="Earth Logo" className="w-8 h-8" />
        <Link to="/" className="text-2xl font-bold tracking-wide text-cyan-400">
          Earth Explorer
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (

          <>
            <div className="text-white">Welcome {user.name}</div>
           
            <div className="relative z-50">
 
      <button
        onClick={toggleMenu}
        className="cursor-pointer text-cyan-500 text-2xl hover:text-cyan-400 transition p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 shadow-md"
      >
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
      </button>

  
      {menuOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg shadow-lg p-4 space-y-3">

          <Link to='/homePage'
          onClick={()=>setMenuOpen(!menuOpen)}
          className=" flex gap-2 items-center text-cyan-500 hover:text-cyan-400">
            <FontAwesomeIcon icon={faHouse} />
            Home page

          </Link>

          <Link to ='/favourite-countries'
          className="block text-pink-500 hover:text-pink-400 transition font-medium gap-2 flex items-center"
          onClick={()=>setMenuOpen(!menuOpen)}>
              <FontAwesomeIcon icon={faGlobe}/>
             <span className="whitespace-nowrap">Favourite countries</span> 
              
          </Link>

          <Link
            to="/userdashboard"
            className="block text-cyan-500 hover:text-cyan-400 transition font-medium gap-2 flex items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FontAwesomeIcon icon={faUser} />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-400 hover:text-red-500 font-medium transition gap-2 flex items-center cursor-pointer"
          >
             <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>
      )}
    </div>
                     
          </>
          
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold rounded-lg transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
