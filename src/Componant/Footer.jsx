import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate= useNavigate();
  return (
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
  )
}

export default Footer