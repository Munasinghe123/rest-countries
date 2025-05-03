import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import StarBackground from "../../User/Threejs/StarBackground";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (photo) {
      formData.append("userPhoto", photo);
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
        formData,
        { withCredentials: true }
      );
  
      setMessage(response.data.message);
      setName('');
      setEmail('');
      setPassword('');
      setPhoto(null);
      setPreview(null);
      setError('');
  
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false); 
    }
  };
  
  return (
     <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
     <StarBackground />
      <div className="hover:shadow-[0_0_20px_#00c3ff] transition duration-300 w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-md text-white border border-cyan-400/30">
        <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Register</h1>

        {message && <p className="text-green-400 text-center mb-2">{message}</p>}
        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        <form onSubmit={registerUser} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full bg-black text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 cursor-pointer"
          />

          {preview && (
            <div className="mt-4">
              <p className="text-white/60 text-sm mb-1">Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover mx-auto border border-cyan-400 shadow-lg"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full mt-4 py-2 rounded-lg shadow transition duration-300 font-semibold text-white ${
              isSubmitting
                ? "bg-cyan-300 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;
