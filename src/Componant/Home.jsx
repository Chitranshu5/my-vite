// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Spinner from "./Spinner";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Home = () => {
//   // State variables for form fields
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Initialize navigate hook
//   const navigate = useNavigate();

//   // Handle the button click event
//   const handleButtonClick = async () => {
//     // Reset success and error messages
//     toast.dismiss(); // To clear any existing toasts

//     // Validate passwords
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     // Prepare the data to be sent
//     const formData = {
//       username,
//       email,
//       password,
//       confirmPassword,
//     };

//     setLoading(true);

//     try {
//       // Make the API call
//       const response = await fetch("http://localhost:9000/res", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         // Handle non-OK responses
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();

//       // Success handling
//       toast.success(result.message);
//       console.log(result.message);

//       // Redirect after successful submission
//       navigate("/");

//     } catch (error) {
//       // Handle any errors that occurred during the fetch
//       console.error("There was a problem with the fetch operation:", error);

//       if (error.message === "Failed to fetch") {
//         toast.error("Network error. Please check your connection and try again.");
//       } else {
//         toast.error(`Error: ${error.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }

//   };

//   return (
//     <div className="h-screen flex justify-center items-center">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Create an Account
//         </h2>
//         <div className="mb-4">
//           <label
//             htmlFor="username"
//             className="block text-gray-700 font-semibold mb-2"
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your username"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="block text-gray-700 font-semibold mb-2"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-gray-700 font-semibold mb-2"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="confirmPassword"
//             className="block text-gray-700 font-semibold mb-2"
//           >
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Confirm your password"
//             required
//           />
//         </div>
//         <button
//           onClick={handleButtonClick}
//           className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
//         >
//           {loading ? (
//             <div className="flex justify-center items-center">
//               <Spinner color="white" />
//             </div>
//           ) : (
//             "Register"
//           )}
//         </button>
//         <p className="text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a href="/" className="text-blue-500 font-semibold">
//             Sign In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "./FormInput";

const Home = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    toast.dismiss();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const formData = { username, email, password, confirmPassword };
    setLoading(true);

    try {
      const response = await fetch("http://localhost:9000/res", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      toast.success(result.message);
      navigate("/");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      if (error.message === "Failed to fetch") {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <FormInput
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />

        <FormInput
        id={"email"}
        label={"Email"}
        type={"email"}
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        placeholder={"Enter you email"}
        />
       
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
        <button
          onClick={handleButtonClick}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner color="white" />
            </div>
          ) : (
            "Register"
          )}
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 font-semibold">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
