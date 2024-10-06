import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false); // Ref to track initial load

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch the post data from the backend
        const response = await fetch(`http://localhost:9000/singlePost/${id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        setPost(data.data);

        // Log post data for debugging
        console.log("Fetched Post Data:", data.data);
        console.log("Author:", data.data.author);

        // Ensure that the view count is incremented only once
        if (!hasFetched.current) {
          hasFetched.current = true;
          // The view count is already incremented in the backend, so no further action is required here
        }

      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load the post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No post found.</p>
      </div>
    );
  }

  // Function to split content into paragraphs
  const splitIntoParagraphs = (text) => {
    return text.split('\n').map((line, index) => (
      <p key={index}  style={{ lineHeight: '2.4' }} className="mt-2 text-zinc-700 text-lg">{line}</p>
    ));
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <nav className="py-3 bg-zinc-500 text-center relative">
        <h1 className="font-semibold text-2xl text-white">ChatGPT</h1>
        <button
          className="absolute right-5 top-2 logout-button"
          onClick={() => navigate("/log")}
        >
          Logout
        </button>
      </nav>
  
      <main className="mt-5 bg-zinc-100 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h1 className="text-2xl text-cyan-600 font-semibold">{post.title}</h1>
          <p className="text-zinc-500 text-sm font-bold mt-2">
            Posted on: {/* Add a date here if available */} by 
            <span className="text-cyan-600"> {post?.author?.username} </span>.
            You can message me at 
            <span className="text-cyan-600"> {post?.author?.email} </span>
          </p>
          <p className="text-zinc-500 text-sm font-bold mt-2">
            Views: {post.views} {/* Display the view count here */}
          </p>
          {splitIntoParagraphs(post.content)}
        </div>
      </main>
  
      <footer className="bg-zinc-500 text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p className="mb-2">
            Want to create a new post? 
            <button className="text-cyan-300 underline" onClick={() => navigate("/new-post")}>
              Create Post
            </button>
          </p>
          <p className="mb-2">
            Return to 
            <button className="text-cyan-300 underline" onClick={() => navigate("/")}>
              Home
            </button>
          </p>
          <p>&copy; 2024 ChatGPT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
  
};

export default FullPost;
