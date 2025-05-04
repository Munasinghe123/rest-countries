import { Routes,Route } from "react-router-dom";
import { useSelector } from "react-redux";


//token checker when refreshing
import AuthChecker from "./Auth/AuthChecker";

//common routes
import Login from "./Components/Common/Login/Login";
import Register from "./Components/Common/Register/Register";
import LandingPage from "./Components/Common/LandingPage/LandingPage";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";


//Authenticated Routes
import UserDashBoard from "./Components/User/UserDashBoard";
import HomePage from "./Components/User/HomePage";
import CountryDetails from "./Components/User/CountryDetails";
import FavouriteCountries from "./Components/User/FavouriteCountries";
import Splash from "./Components/User/Splash";


function App(){

  const { isAuthenticated} = useSelector((state) => state.user);

  console.log("from app",isAuthenticated);

  return(
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      <AuthChecker />
      <Header />
      
      {isAuthenticated ? (
        <>
          <Routes>
            <Route path="/userdashboard" element={<UserDashBoard/>}/>
            <Route path ='/homePage' element={<HomePage/>} />
            <Route path="/" element={<LandingPage/>}/>
            <Route path='/country/:code' element={<CountryDetails/>}/>
            <Route path="/favourite-countries" element={<FavouriteCountries/>}/>
            <Route path="/splash" element={<Splash/>}/>
          </Routes>
        </>
      ):
      (
        <>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </>
      )}
    <Footer/> 
      
    </div>
  )

}

export default App;