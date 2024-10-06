import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import Logout from "./Logout";
import Protect from "./Protect";
import FullPost from "./FullPost";
import UserPostList from "./UserPostList";
import UserSinglePost from "../Module/User/UserSinglePost";
import CategoryPostList from "../Module/User/CategoryPostList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path:"/login",
    element:<Home/>
  },
  {
    path:"/post",
    element: <Protect> <CreatePost/> </Protect>
  },
  {
    path:"/show",
    element:<Protect> <PostList/> </Protect>
  },{
    path:"/log",
    element:<Logout/>
  },
  {
    path:"/visitPost/:id",
    element:<FullPost/>
  },
  {
    path:"/userpostlist",
    element:<UserPostList/>
  },
  {
    path:"/visitUserPost/:id",
    element:<UserSinglePost/>
  },
  {
    path:"/category/:categoryName",
     element:< CategoryPostList/>
  }

]);

const Page_Routes = () => {
  return <RouterProvider router={router} />;
};


export default Page_Routes;