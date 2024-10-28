import React from "react";
import { Route, Routes } from "react-router-dom";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostDetails from "../components/PostDetails";
import FavoritesPage from "../components/FavoritesPage";

const MainRoutes = ({isAdmin}) => {
  return (
    <Routes>
      <Route path="/posts" element={<PostList isAdmin={isAdmin} />} />
      <Route path="/add" element={<PostForm />} />
      <Route path="/posts/:postId" element={<PostDetails />} />
      <Route path="/favorites" element={<FavoritesPage />} />

    </Routes>
  );
};

export default MainRoutes;
