import React, { useState, useEffect } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [manualCategory, setManualCategory] = useState(false); // Toggle for manual category input

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:9000/fetchCategory");
        const data = await response.json();

        if (!response.ok) {
          setError("Failed to fetch categories. Please try again.");
          return;
        }

        setCategories(data.data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError("Failed to fetch categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      category,
      subcategory,
    };

    try {
      const response = await fetch("http://localhost:9000/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError("Failed to create post. Please try again.");
      } else {
        setError("");
        setContent("");
        setTitle("");
        setCategory("");
        setSubcategory("");
        console.log("Post created successfully:", result);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-lg text-center font-semibold text-gray-800 mb-6">
          Create Post
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the post title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the post content"
              rows="6"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
              Category
            </label>

            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="manualCategoryToggle"
                checked={manualCategory}
                onChange={() => setManualCategory(!manualCategory)}
                className="mr-2"
              />
              <label htmlFor="manualCategoryToggle" className="text-gray-700">
                Enter category manually
              </label>
            </div>

            {!manualCategory ? (
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select a category</option>
                {Array.isArray(categories) &&
                  categories.map((cat, index) => (
                    <option key={index} value={cat.name}>
                      <li>{cat}</li>
                    </option>
                  ))}
              </select>
            ) : (
              <input
                type="text"
                id="categoryInput"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter a category"
                required
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="subcategory" className="block text-gray-700 font-semibold mb-2">
              Subcategory
            </label>
            <input
              type="text"
              id="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter the post subcategory"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Create Post
          </button>
        </form>

        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CreatePost;






// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChinuContext } from "./AuthContext";
// import { toast } from "react-toastify";
// import Spinner from "./Spinner";

// const CreatePost = () => {
//   // useContext
//   const { login, user } = useContext(ChinuContext);
//   console.log(user);

//   // State variables for form fields
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [profilePic, setProfilePic] = useState(null);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setProfilePic(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     setLoading(true)
//     e.preventDefault();

//     // Print form values to the console
//     console.log("Title:", title);
//     console.log("Content:", content);
//     console.log("Category:", category);
//     console.log("Subcategory:", subcategory);
//     console.log("ProfilePic:", profilePic);

//     // Prepare form data to be sent
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     formData.append("category", category);
//     formData.append("subcategory", subcategory);
//     if (profilePic) {
//       formData.append("profilePic", profilePic);
//     }

//     try {
//       // Make the API call
//       const response = await fetch("http://localhost:9000/createPost", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       const result = await response.json();
//       if (response.ok) {
//         toast.success("Post created successfully");
//         navigate("/show");
//       } else {
//         toast.error(result.message || "Failed to create post.");
//         setError(result.message || "Failed to create post.");
//       }
//     } catch (error) {
//       console.error("There was a problem with the fetch operation:", error);
//       setError("Failed to create post. Please try again.");
//     }
//     finally{
//       setLoading(false)
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//         <h4 className="text-2xl text-center font-bold text-blue-400 mb-6">
//           Welcome {user?.username}
//         </h4>
//         <h2 className="text-lg text-center font-semibold text-gray-800 mb-6">
//           Create Post
//         </h2>

//         <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter the post title"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
//               Content
//             </label>
//             <textarea
//               id="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter the post content"
//               rows="6"
//               required
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
//               Category
//             </label>
//             <input
//               type="text"
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter the post category (e.g., sports)"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="subcategory" className="block text-gray-700 font-semibold mb-2">
//               Subcategory
//             </label>
//             <input
//               type="text"
//               id="subcategory"
//               value={subcategory}
//               onChange={(e) => setSubcategory(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter the post subcategory (e.g., football)"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="profilePic" className="block text-gray-700 font-semibold mb-2">
//               Profile Picture
//             </label>
//             <input
//               type="file"
//               id="profilePic"
//               onChange={handleFileChange}
//               className="w-full px-4 py-2 border rounded-lg"
//               accept="image/*"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
//           >
//            {loading ? (
//               <div className="flex justify-center items-center">
//                 <Spinner color="white" />
//               </div>
//             ) : (
//               "Create Post"
//             )}
//           </button>
//         </form>
//         <div className="flex justify-end">
//           <p
//             onClick={() => navigate("/show")}
//             className="text-sm inline-block mt-2 hover:cursor-pointer text-blue-500 border-b-2 border-transparent hover:border-blue-500 transition-all duration-300 ease-in-out"
//           >
//             Previous post see
//           </p>
//         </div>

//         {success && <p className="text-center text-green-500 mt-4">{success}</p>}
//         {error && <p className="text-center text-red-500 mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default CreatePost;
