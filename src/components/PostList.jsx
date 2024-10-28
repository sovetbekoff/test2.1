import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts, updatePost } from "../slices/postSlice";
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
      // Если пост не в избранном, добавляем его
      updatedFavorites = [...favorites, post];
      alert("Пост добавлен в избранное!");
    } else {
      // Если пост уже в избранном, удаляем его
      updatedFavorites = favorites.filter((fav) => fav.id !== post.id);
      alert("Пост удалён из избранного!");
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (status === "loading") {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.postListContainer}>
      <h2>Публикации</h2>
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
          {posts.map((post) => (
            <li key={post.id} className={styles.postItem}>
              <h3>{post.description}</h3>
              <p>Категория: {post.category}</p>
              <Link to={`/posts/${post.id}`}>
                <button>details</button>
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
    </div>
  );
};

export default PostList;
