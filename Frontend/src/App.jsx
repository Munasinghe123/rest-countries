import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// token checker when refreshing
import AuthChecker from "./Auth/AuthChecker";

// common routes
import Login from "./Components/Common/Login/Login";
import Register from "./Components/Common/Register/Register";
import LandingPage from "./Components/Common/LandingPage/LandingPage";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";

// authenticated routes
import UserDashBoard from "./Components/User/UserDashBoard";
import HomePage from "./Components/User/HomePage";
import CountryDetails from "./Components/User/CountryDetails";
import FavouriteCountries from "./Components/User/FavouriteCountries";
import Splash from "./Components/User/Splash";

function App() {
  const { isAuthenticated, checkedAuth } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
      <AuthChecker />
      <Header />

      <Routes>
        {/* public routes (always shown) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* private routes (only after token check passes) */}
        {checkedAuth && isAuthenticated && (
          <>
            <Route path="/userdashboard" element={<UserDashBoard />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/country/:code" element={<CountryDetails />} />
            <Route path="/favourite-countries" element={<FavouriteCountries />} />
            <Route path="/splash" element={<Splash />} />
          </>
        )}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
