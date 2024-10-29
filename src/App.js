// App.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./slices/postSlice";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import MainRoutes from "./route/MainRoutes";
import { useLocation } from "react-router-dom";
import "./App.css"
function App() {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
      {location.pathname === "/" && (
  <div className="intro">
    <h1>Добро пожаловать на наш сайт!</h1>
    <p>Краткое описание того, как пользоваться сайтом:</p>
    <ul>
      <li>Публикуйте новый контент, просматривайте категории и многое другое.</li>
      <li>Используйте раздел "Избранное", чтобы сохранить понравившиеся посты.</li>
      <li>Опции для администратора доступны только после верификации.</li>
    </ul>
  </div>
)}
      <MainRoutes isAdmin={isAdmin} />
      <Footer />
    </div>
  );
}

export default App;
