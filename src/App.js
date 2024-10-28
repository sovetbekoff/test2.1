// App.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PostList from "./components/PostList";
import { fetchPosts } from "./slices/postSlice";
import PostForm from "./components/PostForm";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import MainRoutes from "./route/MainRoutes";

function App() {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>
      <MainRoutes isAdmin={isAdmin} />
      <Footer />
    </div>
  );
}

export default App;
