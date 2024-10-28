// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addPost } from '../slices/postSlice';

// const PostForm = () => {
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (description && category && image) {
//       // Создаем объект FormData для отправки файла
//       const formData = new FormData();
//       formData.append('image', image);
//       formData.append('description', description);
//       formData.append('category', category);

//       dispatch(addPost(formData)); // Отправляем данные в Redux
//       setDescription('');
//       setCategory('');
//       setImage(null);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="file"
//         onChange={(e) => setImage(e.target.files[0])}
//         accept="image/*"
//         required
//       />
//       <input
//         type="text"
//         placeholder="Описание"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Категория"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         required
//       />
//       <button type="submit">Добавить</button>
//     </form>
//   );
// };

// export default PostForm;

// PostForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../slices/postSlice";
import styles from "../style/PostForm.module.css";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && category) {
      const formData = {
        description,
        category,
      };
      dispatch(addPost(formData));
      setDescription("");
      setCategory("");
      navigate("/posts");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formField}>
        <label>Описание</label>
        <input
          type="text"
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Категория</label>
        <input
          type="text"
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Добавить
      </button>
    </form>
  );
};

export default PostForm;
