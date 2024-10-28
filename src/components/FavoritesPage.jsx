// components/FavoritesPage.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "../style/FavoritesPage.module.css";

const FavoritesPage = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    return <div>Нет избранных постов</div>;
  }

  return (
    <div className={styles.favoritesContainer}>
      <h2>Избранные посты</h2>
      <ul>
        {favorites.map((post) => (
          <li key={post.id}>
            
              <h3>{post.description}</h3>
              <p>Категория: {post.category}</p>
              <Link to={`/posts/${post.id}`}>
              <button>details</button>
            </Link>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
