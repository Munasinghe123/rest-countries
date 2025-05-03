import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCountryByCode } from "./Services/CountryService";
import StarBackground from "../../Components/User/Threejs/StarBackground";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetchCountryByCode(code)
      .then(res => setCountry(res.data[0]))
      .catch(err => console.error("Failed to fetch details:", err));
  }, [code]);

  if (!country) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
<div className="relative min-h-screen bg-black flex items-center justify-center px-4 pt-28 pb-10 sm:px-6 sm:pt-20 lg:pt-24">
<div className="absolute inset-0 z-0 pointer-events-none">
        <StarBackground />
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-md border border-cyan-500/20 rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md sm:max-w-xl text-white text-center hover:shadow-[0_0_20px_#00c3ff] transition duration-300">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-24 sm:w-32 h-auto mx-auto mb-4 rounded shadow"
        />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
          {country.name.common}
        </h1>

        <div className="text-white/90 space-y-2 text-left text-sm sm:text-base">
          <p><span className="font-semibold text-cyan-300">Region:</span> {country.region}</p>
          <p><span className="font-semibold text-cyan-300">Capital:</span> {country.capital?.[0] || "N/A"}</p>
          <p><span className="font-semibold text-cyan-300">Population:</span> {country.population.toLocaleString()}</p>
          <p><span className="font-semibold text-cyan-300">Languages:</span> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
          <p><span className="font-semibold text-cyan-300">Area:</span> {country.area} km²</p>
          <p><span className="font-semibold text-cyan-300">Timezones:</span> {country.timezones.join(", ")}</p>
        </div>

        <div className="mt-6">
          <Link
            to="/homePage"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
