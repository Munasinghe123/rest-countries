import { useSelector } from "react-redux";

function UserDashBoard() {
  const { user } = useSelector((state) => state.user);

  console.log("user state", user);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-white/5 text-white p-8 rounded-xl border border-cyan-500/20 shadow-lg max-w-md w-full text-center hover:shadow-[0_0_20px_#00c3ff] transition duration-300">
        <img
          src={user.photo}
          alt="User Profile"
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border border-cyan-400 shadow"
        />
        <h1 className="text-3xl font-bold mb-2 text-cyan-300">Welcome, {user.name}</h1>
        <p className="text-white/80 mb-1">Email: {user.email}</p>
      </div>
    </div>
  );
}

export default UserDashBoard;
