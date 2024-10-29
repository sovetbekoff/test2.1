// // components/FavoritesPage.js
// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "../style/FavoritesPage.module.css";

// const FavoritesPage = () => {
//   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//   if (favorites.length === 0) {
//     return <div>Нет избранных постов</div>;
//   }

//   return (
//     <div className={styles.favoritesContainer}>
//       <h2>Избранные посты</h2>
//       <ul>
//         {favorites.map((post) => (
//           <li key={post.id}>
            
//               <h3>{post.description}</h3>
//               <p>Категория: {post.category}</p>
//               <Link to={`/posts/${post.id}`}>
//               <button>details</button>
//             </Link>

//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FavoritesPage;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../style/FavoritesPage.module.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Remove an individual post from favorites
  const removeFavorite = (postId) => {
    const updatedFavorites = favorites.filter((post) => post.id !== postId);
    setFavorites(updatedFavorites);
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  if (favorites.length === 0) {
    return <div className={styles.emptyMessage}>Нет избранных постов</div>;
  }

  return (
    <div className={styles.favoritesContainer}>
      <h2>Избранные посты</h2>
      <button className={styles.clearButton} onClick={clearFavorites}>
        Очистить корзину
      </button>
      <ul>
        {favorites.map((post) => (
          <li key={post.id} className={styles.favoriteItem}>
            <div>
              <h3>{post.description}</h3>
              <p>Категория: {post.category}</p>
            </div>
            <div className={styles.buttons}>
              <Link to={`/posts/${post.id}`}>
                <button className={styles.detailsButton}>Детали</button>
              </Link>
              <button
                className={styles.deleteButton}
                onClick={() => removeFavorite(post.id)}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
