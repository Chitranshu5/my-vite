// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css"; // Import the CSS file

// const UserPostList = () => {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [error, setError] = useState("");
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showCategories, setShowCategories] = useState(false);

//   const fetchPosts = async () => {
//     setLoadingPosts(true);
//     try {
//       const response = await fetch(`http://localhost:9000/getPost?page=${page}&limit=10`, {
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       setPosts(data?.data || []);
//       setTotalPages(data?.totalPages || 1);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setError("Failed to load posts. Please try again later.");
//     } finally {
//       setLoadingPosts(false);
//     }
//   };

//   const fetchCategories = async () => {
//     setLoadingCategories(true);
//     try {
//       const response = await fetch("http://localhost:9000/categories");

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       if (data.success && Array.isArray(data.data)) {
//         setCategories(data.data);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setError("Failed to load categories. Please try again later.");
//     } finally {
//       setLoadingCategories(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [page]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="min-h-screen">
//       <nav className="py-3 bg-gray-700 text-center flex justify-between items-center">
//         <button
//           onClick={() => navigate("/log")}
//           className="bg-blue-600 py-2 px-4 rounded-sm text-white"
//         >
//           Logout
//         </button>
//         <h1 className="font-semibold text-2xl text-white">ChatGPT</h1>
//         <div>
//           <button
//             onClick={() => setShowCategories(prev => !prev)}
//             className="bg-gray-800 text-white py-2 px-4 rounded-sm"
//           >
//             Categories
//           </button>
//           {showCategories && (
//             <div className="category-menu absolute right-4 bg-white shadow-lg mt-2 rounded-lg p-4 border border-gray-200 w-64">
//               {loadingCategories ? (
//                 <p className="text-center text-gray-500">Loading categories...</p>
//               ) : (
//                 <ul className="space-y-2">
//                   {categories.length > 0 ? (
//                     categories.map((category, index) => (
//                       <li key={index} className="hover:bg-gray-100 rounded-lg">
//                         <button
//                           onClick={() => console.log("Category selected:", category)}
//                           className="w-full text-left py-2 px-4 text-gray-800 hover:text-blue-600 focus:outline-none"
//                         >
//                           {category}
//                         </button>
//                       </li>
//                     ))
//                   ) : (
//                     <p className="text-center text-gray-500">No categories available.</p>
//                   )}
//                 </ul>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       <div className="mt-10 flex justify-center">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">All Posts</h2>
//           {error && <p className="text-center text-red-500 mb-4">{error}</p>}
//           {loadingPosts ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : (
//             <div className="post-list-container">
//               {posts.length > 0 ? (
//                 posts.map(post => (
//                   <div key={post._id} className="post-container mb-6 p-4 border rounded-lg shadow-sm">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
//                     <p className="text-zinc-500 text-sm font-bold mt-2">Views: {post.views}</p>
//                     <p className="post-preview mt-2">{post.content}</p>
//                     <button
//                       className="view-button mt-4 bg-blue-500 text-white py-2 px-4 rounded"
//                       onClick={() => navigate(`/visitPost/${post._id}`)}
//                     >
//                       View Full Post
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">No posts available.</p>
//               )}
//             </div>
//           )}
//           <div className="pagination mt-6 flex justify-center items-center space-x-2">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage(prev => Math.max(prev - 1, 1))}
//               className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
//               className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPostList;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "../App.css"; // Import the CSS file

const UserPostList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1); // Get page from query params or default to 1
  const [totalPages, setTotalPages] = useState(1);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to fetch posts based on the current page and selected category
  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const url = selectedCategory
        ? `http://localhost:9000/postByCategories?category=${selectedCategory}&page=${page}&limit=10`
        : `http://localhost:9000/getPost?page=${page}&limit=10`;

      const response = await fetch(url, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPosts(data?.data || []);
      setTotalPages(data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch("http://localhost:9000/categories");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again later.");
    } finally {
      setLoadingCategories(false);
    }
  };

  // Effect to fetch posts whenever the page or selected category changes
  useEffect(() => {
    fetchPosts();
  }, [page, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSearchParams({ page });
  }, [page]);
  

  const handleCategoryClick = (category) => {
    // Use window.open to open the URL in a new tab
    window.open(`/category/${category}`, '_blank');
  };

    return (
    <div className="min-h-screen">
      <nav className="py-3 bg-gray-700 text-center flex justify-between items-center">
        <button
          onClick={() => navigate("/log")}
          className="bg-blue-600 py-2 px-4 rounded-sm text-white"
        >
          Logout
        </button>
        <h1 className="font-semibold text-2xl text-white">ChatGPT</h1>
        <div>
          <button
            onClick={() => setShowCategories((prev) => !prev)}
            className="bg-gray-800 text-white py-2 px-4 rounded-sm"
          >
            Categories
          </button>
          {showCategories && (
            <div className="category-menu absolute right-4 bg-white shadow-lg mt-2 rounded-lg p-4 border border-gray-200 w-64">
              {loadingCategories ? (
                <p className="text-center text-gray-500">Loading categories...</p>
              ) : (
                <ul className="space-y-2">
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <li key={index} className="hover:bg-gray-100 rounded-lg">
                        <button
                          onClick={() => handleCategoryClick(category)}
                          className="w-full text-left py-2 px-4 text-gray-800 hover:text-blue-600 focus:outline-none"
                        >
                          {category}
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No categories available.</p>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="mt-10 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">All Posts</h2>
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          {loadingPosts ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="post-list-container">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post._id} className="post-container mb-6 p-4 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                    <p className="text-zinc-500 text-sm font-bold mt-2">Views: {post.views}</p>
                    <p className="post-preview mt-2">{post.content}</p>
                    <button
                      className="view-button mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                      onClick={() => navigate(`/visitUserPost/${post._id}`)}
                    >
                      View Full Post
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No posts available.</p>
              )}
            </div>
          )}
          <div className="pagination mt-6 flex justify-center items-center space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostList;
