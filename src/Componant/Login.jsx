import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChinuContext } from "./AuthContext";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Login = () => {
  const navigate = useNavigate();

  // useContext
  const { login } = useContext(ChinuContext);

  // State variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const formData = {
      email,
      password,
    };

    try {
      setLoading(true);

      // Make the API call
      const response = await fetch("http://localhost:9000/loginn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await response.json();

      if (!response?.ok || !result?.success) {
        // Handle errors from the backend

        setError(result.message || "Failed to login. Please try again.");
        toast.error(result.message || "Failed to login. Please try again.");
        return;
      }

      // Login the user and navigate to the posts page
      login(result?.user);
      toast.success("User login successful");
      navigate("/post");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setError("Server error. Please try again.");
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action (for demonstration)
  const handleDelete = () => {
    toast.error("Delete action triggered");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner color="white" />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/login" className="text-blue-500 font-semibold">
            Register
          </a>
        </p>

        <div className="mt-2 flex justify-center">
          <button
          className="text-white px-2 py-1 font-semibold bg-cyan-500"
            onClick={() => {
              navigate("/userpostlist");
            }}
          >See Post</button>
        </div>
        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;