import { useEffect, useState } from 'react';
import { fetchAllCountries, fetchCountryByName, fetchByRegion } from '../User/Services/CountryService';
import { FaGlobe, FaCity, FaUsers, FaLanguage } from "react-icons/fa";
import Earth from '../../assets/earth.png';
import { Link } from "react-router-dom";
import StarBackground from '../User/Threejs/StarBackground';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart,faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [baseCountries, setBaseCountries] = useState([]);
  const [favourites, setFavourites] = useState(new Set());

  useEffect(()=>{
      const fetchFavCountries=async()=>{
        try{

          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/country/get-favourite-country`,{
            withCredentials:true
          })
          const favSet = new Set(response.data.favouriteCountries.map(item => item.countryCode));
          setFavourites(favSet);
        }catch(err){
          console.log(err);
        }
      }

      fetchFavCountries();
  },[])


  const toggleFavourite = async (countryCode, countryName) => {
    const isAlreadyFav = favourites.has(countryCode);
  
    try {
      if (isAlreadyFav) {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/country/delete-fav-country`, {
          data: { countryCode },
          withCredentials: true
        });
  
        toast.info(
          <span>
            <FontAwesomeIcon icon={faTimesCircle}  className='mr-2 text-red-500'/>
            Removed {countryName} from favourites
          </span>
       );
        setFavourites(prev => {
          const newSet = new Set(prev);
          newSet.delete(countryCode);
          return newSet;
        });
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/country/add-favourite-country`, {
          countryName,
          countryCode
        }, { withCredentials: true });
  
        toast.success( 
        <span>
          <FontAwesomeIcon icon={faSolidHeart} className="text-red-500 mr-2" />
          Added {countryName} to favourites
        </span>);
        setFavourites(prev => {
          const newSet = new Set(prev);
          newSet.add(countryCode);
          return newSet;
        });
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error("Failed to toggle favourite:", err);
    }
  };
  
  

  // Search by name
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim() === "") {
        fetchAllCountries()
          .then(res => setCountries(res.data))
          .catch(err => console.error("Error fetching countries:", err));
      } else {
        fetchCountryByName(searchTerm)
          .then(res => setCountries(res.data))
          .catch(err => {
            console.error("Search failed:", err);
            setCountries([]);
          });
      }
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  // Filter by region
  useEffect(() => {
    if (selectedRegion) {
      fetchByRegion(selectedRegion)
        .then(res => {
          setBaseCountries(res.data);
          setCountries(res.data);
        })
        .catch(err => console.error("Region filter failed:", err));
    } else if (searchTerm.trim() === "") {
      fetchAllCountries()
        .then(res => {
          setBaseCountries(res.data);
          setCountries(res.data);
        })
        .catch(err => console.error("Error fetching countries:", err));
    }
  }, [selectedRegion]);

  // Filter by language
  useEffect(() => {
    if (!selectedLanguage) {
      setCountries(baseCountries);
      return;
    }
    const filtered = baseCountries.filter(country =>
      country.languages &&
      Object.values(country.languages).some(lang =>
        lang.toLowerCase().includes(selectedLanguage.toLowerCase())
      )
    );
    setCountries(filtered);
  }, [selectedLanguage, baseCountries]);

  return (
    <div className="relative min-h-screen bg-black pt-24 px-6 overflow-hidden pb-4">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarBackground />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src={Earth} alt="Earth Icon" className="w-10 h-10" />
          <h1 className="text-3xl text-white font-bold">Explore Countries</h1>
        </div>

        {/* Language Filter */}
        <div className="max-w-xl mx-auto mb-4">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="cursor-pointer w-full px-4 py-2 rounded-md bg-black text-white border border-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
            <option value="Arabic">Arabic</option>
            <option value="Chinese">Chinese</option>
            <option value="Russian">Russian</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Sinhala">Sinhala</option>
          </select>
        </div>

        {/* Region Filter */}
        <div className="max-w-xl mx-auto mb-4">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="cursor-pointer w-full px-4 py-2 rounded-md bg-black text-white border border-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search country by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-black text-white placeholder-white/40 border border-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* No Result */}
        {countries.length === 0 && searchTerm.trim() !== "" && (
          <div className="text-center text-white text-xl font-semibold mb-6">
            No countries found for "<span className="text-cyan-400">{searchTerm}</span>"
          </div>
        )}

        {/* Country Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <div
              key={country.cca3}
              className="bg-white/5 text-white p-4 rounded-lg shadow-md border border-white/10 hover:shadow-[0_0_20px_#00c3ff] transition duration-300"
            >
              <Link to={`/country/${country.cca3}`}>
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-full h-32 object-cover rounded cursor-pointer"
                />
                <h3 className="text-xl font-semibold mt-2 cursor-pointer">{country.name.common}</h3>
              </Link>
              <div className="space-y-1 text-sm mt-2">
                <p className="flex items-center gap-2">
                  <FaGlobe className="text-cyan-400" />
                  Region: {country.region}
                </p>
                <p className="flex items-center gap-2">
                  <FaCity className="text-cyan-400" />
                  Capital: {country.capital?.[0] || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaUsers className="text-cyan-400" />
                  Population: {country.population.toLocaleString()}
                </p>
                <p className="flex items-center gap-2">
                  <FaLanguage className="text-cyan-400" />
                  Languages: {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                </p>
                <FontAwesomeIcon
                  icon={favourites.has(country.cca3) ? faHeart : faHeartRegular}
                  className={`text-2xl cursor-pointer mt-2 ${
                    favourites.has(country.cca3) ? "text-red-500" : "text-white"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(country.cca3, country.name.common);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
    
  );
}

export default Home;
