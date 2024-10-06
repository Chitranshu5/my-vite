import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"; // Import the CSS file

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9000/getPosts?page=${page}&limit=10`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPosts(data?.data || []);
      setTotalPages(data?.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error("There was a problem with fetching posts:", error);
      setError("Failed to load posts. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:9000/deletePost/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.info("Post deleted successfully");
        fetchPosts(); // Refresh the list of posts
      } else {
        setError("Failed to delete the post. Please try again later.");
      }
    } catch (error) {
      console.error("There was a problem with deleting the post:", error);
      setError("Failed to delete the post. Please try again later.");
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="min-h-screen">
      <nav className="py-3 bg-zinc-500 text-center flex justify-between">
        <div>
          <button
            onClick={() => navigate("/log")}
            className="bg-blue-600 py-2 px-4 rounded-sm text-white"
          >
            Logout
          </button>
        </div>
        <h1 className="font-semibold text-2xl text-white">ChatGPT</h1>
        <div></div>
      </nav>

      <div className="mt-10 border flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            All Posts
          </h2>
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="post-list-container">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post._id} className="post-container">
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-zinc-500 text-sm font-bold mt-2">
                      Views: {post.views} {/* Display the view count here */}
                    </p>
                    <p className="post-preview">{post.content}</p>
                    <button
                      className="view-button"
                      onClick={() => navigate(`/visitPost/${post._id}`)}
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
              onClick={() => handlePageChange(page - 1)}
              className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
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

export default PostList;
