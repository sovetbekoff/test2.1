 
// // components/PostList.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePost, fetchPosts, updatePost } from "../slices/postSlice";
// import SearchBar from "./SearchBar";
// import CategoryFilter from "./CategoryFilter";
// import styles from "../style/PostList.module.css";
// import { Link } from "react-router-dom";

// const PostList = ({ isAdmin }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts.posts);
//   const status = useSelector((state) => state.posts.status);

//   const [isEditing, setIsEditing] = useState(false);
//   const [currentPost, setCurrentPost] = useState({
//     id: "",
//     description: "",
//     category: "",
//   });
//   const [favorites, setFavorites] = useState([]);
  
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");

//   useEffect(() => {
//     dispatch(fetchPosts());
//     const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(storedFavorites);
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     dispatch(deletePost(id));
//   };

//   const handleEdit = (post) => {
//     setIsEditing(true);
//     setCurrentPost(post);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     dispatch(
//       updatePost({
//         id: currentPost.id,
//         postData: {
//           description: currentPost.description,
//           category: currentPost.category,
//         },
//       })
//     )
//       .unwrap()
//       .then(() => {
//         alert("Изменения сохранены");
//         setIsEditing(false);
//         setCurrentPost({ id: "", description: "", category: "" });
//       })
//       .catch((error) => {
//         console.error("Ошибка обновления:", error);
//         alert("Не удалось сохранить изменения");
//       });
//   };

//   const handleFavorite = (post) => {
//     let updatedFavorites;

//     if (!favorites.some((fav) => fav.id === post.id)) {
//       updatedFavorites = [...favorites, post];
//       alert("Пост добавлен в избранное!");
//     } else {
//       updatedFavorites = favorites.filter((fav) => fav.id !== post.id);
//       alert("Пост удалён из избранного!");
//     }

//     setFavorites(updatedFavorites);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   };

//   // Фильтрация постов по категории и поисковому запросу
//   const filteredPosts = posts.filter(
//     (post) =>
//       post.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (categoryFilter === "" || post.category.toLowerCase() === categoryFilter.toLowerCase())
//   );
  

//   if (status === "loading") {
//     return <div>Загрузка...</div>;
//   }

//   return (
//     <div className={styles.postListContainer}>
//       <h2>Публикации</h2>
//       <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       {/* <CategoryFilter
//         categoryFilter={categoryFilter}
//         setCategoryFilter={setCategoryFilter}
//       /> */}

//       {isEditing ? (
//         <form onSubmit={handleEditSubmit} className={styles.formField}>
//           <input
//             type="text"
//             value={currentPost.description}
//             onChange={(e) =>
//               setCurrentPost({ ...currentPost, description: e.target.value })
//             }
//             placeholder="Описание"
//             required
//           />
//           <input
//             type="text"
//             value={currentPost.category}
//             onChange={(e) =>
//               setCurrentPost({ ...currentPost, category: e.target.value })
//             }
//             placeholder="Категория"
//             required
//           />
//           <button type="submit" className={styles.submitButton}>
//             Сохранить изменения
//           </button>
//         </form>
//       ) : (
//         <ul>
//           {filteredPosts.map((post) => (
//             <li key={post.id} className={styles.postItem}>
//               <h3>{post.description}</h3>
//               <p>Кат: {post.category}</p>
//               <Link to={`/posts/${post.id}`}>
//                 <button>Подробнее</button>
//               </Link>
//               <button
//                 onClick={() => handleFavorite(post)}
//                 className={styles.favoriteButton}
//               >
//                 {favorites.some((fav) => fav.id === post.id)
//                   ? "Удалить из избранного"
//                   : "Добавить в избранное"}
//               </button>
//               {isAdmin && (
//                 <div className={styles.buttonContainer}>
//                   <button
//                     onClick={() => handleDelete(post.id)}
//                     className={`${styles.button} ${styles.deleteButton}`}
//                   >
//                     Удалить
//                   </button>
//                   <button
//                     onClick={() => handleEdit(post)}
//                     className={`${styles.button} ${styles.editButton}`}
//                   >
//                     Редактировать
//                   </button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PostList;


// components/PostList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts, updatePost } from "../slices/postSlice";
import SearchBar from "./SearchBar";
import styles from "../style/PostList.module.css";
import { Link } from "react-router-dom";

const PostList = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: "",
    description: "",
    category: "",
  });
  const [favorites, setFavorites] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7; // Number of posts per page

  useEffect(() => {
    dispatch(fetchPosts());
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setCurrentPost(post);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        id: currentPost.id,
        postData: {
          description: currentPost.description,
          category: currentPost.category,
        },
      })
    )
      .unwrap()
      .then(() => {
        alert("Изменения сохранены");
        setIsEditing(false);
        setCurrentPost({ id: "", description: "", category: "" });
      })
      .catch((error) => {
        console.error("Ошибка обновления:", error);
        alert("Не удалось сохранить изменения");
      });
  };

  const handleFavorite = (post) => {
    let updatedFavorites;

    if (!favorites.some((fav) => fav.id === post.id)) {
      updatedFavorites = [...favorites, post];
      alert("Пост добавлен в избранное!");
    } else {
      updatedFavorites = favorites.filter((fav) => fav.id !== post.id);
      alert("Пост удалён из избранного!");
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Фильтрация постов по категории и поисковому запросу
  const filteredPosts = posts.filter(
    (post) =>
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || post.category.toLowerCase() === categoryFilter.toLowerCase())
  );

  // Calculate the current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (status === "loading") {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.postListContainer}>
      <h2>Публикации</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className={styles.formField}>
          <input
            type="text"
            value={currentPost.description}
            onChange={(e) =>
              setCurrentPost({ ...currentPost, description: e.target.value })
            }
            placeholder="Описание"
            required
          />
          <input
            type="text"
            value={currentPost.category}
            onChange={(e) =>
              setCurrentPost({ ...currentPost, category: e.target.value })
            }
            placeholder="Категория"
            required
          />
          <button type="submit" className={styles.submitButton}>
            Сохранить изменения
          </button>
        </form>
      ) : (
        <ul>
          {currentPosts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <h3>{post.description}</h3>
              <p>Кат: {post.category}</p>
              <Link to={`/posts/${post.id}`}>
                <button>Подробнее</button>
              </Link>
              <button
                onClick={() => handleFavorite(post)}
                className={styles.favoriteButton}
              >
                {favorites.some((fav) => fav.id === post.id)
                  ? "Удалить из избранного"
                  : "Добавить в избранное"}
              </button>
              {isAdmin && (
                <div className={styles.buttonContainer}>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className={`${styles.button} ${styles.deleteButton}`}
                  >
                    Удалить
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className={`${styles.button} ${styles.editButton}`}
                  >
                    Редактировать
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Назад
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Вперёд
        </button>
      </div>
    </div>
  );
};

export default PostList;
