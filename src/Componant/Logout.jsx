import { useContext } from "react";
import { ChinuContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Logout = () => {
  const navigate = useNavigate();

  const {logout,user } = useContext(ChinuContext);

  const handleLogout = async () => {
    try {
      // Perform the logout request
      const response = await fetch("http://localhost:9000/log", {
        method: "POST",
        credentials: "include", // Include cookies if used for authentication
      });

      if (response.ok) {
      
      } else {
        // Handle unsuccessful logout
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("There was a problem with the logout operation:", error);
    }
    finally{
      logout();
      navigate("/")
      toast.success("Logout Successfully!")
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Logout</h2>

        <h2 className="text-xl font-semibold text-gray-500 mb-6">
          Welcome {user?.username}
        </h2>
        <p className="text-gray-700 mb-4">Are you sure you want to log out?</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Logout;
