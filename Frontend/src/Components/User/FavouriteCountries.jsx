import StarBackground from '../User/Threejs/StarBackground';
import heart from '../../assets/heartEarth.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaGlobe, FaCity, FaUsers, FaLanguage } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FavouriteCountries(){

    const[fav,setFav] = useState([]);
   
    useEffect(()=>{

        const fetchFavCountries =async ()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/country/get-favourite-country`,{
                    withCredentials:true
                })
                console.log("fav countruis from the db",response.data.favouriteCountries);

                const countryCodes = response.data.favouriteCountries.map(c=>c.countryCode);
                if(countryCodes.length === 0){
                    return;
                } 
                const codes = countryCodes.join(",");    
               
                const details = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${codes}`);
                console.log("fav countries from the api",details.data);

                setFav(details.data);

            }catch(err){
                console.log(err)
            }
        }
        fetchFavCountries();
    },[])

    const removeFavoutire =async (countryCode,countryName)=>{
        try{
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/country/delete-fav-country`,{
                data:{countryCode},
                withCredentials:true
            })
            setFav(prev => prev.filter(country => country.cca3 !== countryCode));

        }catch(err){
            console.log(err);
        }
        toast.info(
            <span>
              <FontAwesomeIcon icon={faTimesCircle}  className='mr-2 text-red-500'/>
              Removed {countryName} from favourites
            </span>
         );
    }
   


    return(
        <div className='relative min-h-screen bg-black pt-24 px-6 overflow-hidden pb-4'>
            <div className="absolute inset-0 z-0 pointer-events-none">
                <StarBackground />
            </div>
            <div className='flex justify-center items-center mb-6 gap-2'>
                <img src={heart} className="w-10 h-10" />
                <h1 className=' text-3xl  text-white font-bold '>Favourite countries</h1>
            </div>

            <div className='relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {fav.map((f)=>{

                    return(
                        <div key={f.cca3}
                        className="bg-white/5 text-white p-4 rounded-lg shadow-md border border-white/10 hover:shadow-[0_0_20px_#00c3ff] transition duration-300"
                    >
                        <Link to={`/country/${f.cca3}`}>
                            <img
                                src={f.flags.png}
                                alt={f.name.common}
                                className="w-full h-32 object-cover rounded cursor-pointer"
                            />
                            <h3 className="text-xl font-semibold mt-2 cursor-pointer">{f.name.common}</h3>
                            
                                <div className="space-y-1 text-sm mt-2">
                                    <p className="flex items-center gap-2">
                                    <FaGlobe className="text-cyan-400" />
                                     Region: {f.region}
                                    </p>
                                    <p className="flex items-center gap-2">
                                    <FaCity className="text-cyan-400" />
                                    Capital: {f.capital?.[0] || "N/A"}
                                    </p>
                                    <p className="flex items-center gap-2">
                                    <FaUsers className="text-cyan-400" />
                                    Population: {f.population.toLocaleString()}
                                    </p>
                                    <p className="flex items-center gap-2">
                                    <FaLanguage className="text-cyan-400" />
                                    Languages: {f.languages ? Object.values(f.languages).join(", ") : "N/A"}
                                    </p>
                                </div>
                        </Link>
                        <div className='mt-2'>
                            <FontAwesomeIcon icon={faTimesCircle}
                            className='mr-2 text-red-500 cursor-pointer'
                            onClick={()=>{removeFavoutire(f.cca3,f.name.common)}}/>
                        </div>    
                        </div>  
                    )
                    
                })}
            </div>
            <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        </div>
    )

}

export default FavouriteCountries;