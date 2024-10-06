import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";

const CategoryPostList = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  console.log(categoryName);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const response = await fetch(
        `http://localhost:9000/postByCategories?category=${categoryName}&page=${page}&limit=10`
      );
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

  useEffect(() => {
    fetchPosts();
  }, [categoryName, page]);

  return (
    <div className="min-h-screen">
      <div className="mt-10 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <div className="flex items-center justify-between mb-6">
            <button
            onClick={()=>{navigate("/userpostlist")}}
             className="bg-slate-950 px-1 py-1 rounded-lg text-white">
              Home
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              Posts in {categoryName}
            </h2>
            <div className="w-1/12"></div>{" "}
            {/* Empty div to balance the alignment */}
          </div>
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          {loadingPosts ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="post-list-container">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="post-container mb-6 p-4 border rounded-lg shadow-sm"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-zinc-500 text-sm font-bold mt-2">
                      Views: {post.views}
                    </p>
                    <p className="post-preview mt-2">{post.content}</p>
                    <button
                      className="view-button mt-4 bg-slate-950 text-white py-2 px-4 rounded hover:text-orange-300"
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

export default CategoryPostList;
