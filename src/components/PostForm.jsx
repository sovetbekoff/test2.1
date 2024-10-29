// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addPost } from "../slices/postSlice";
// import styles from "../style/PostForm.module.css";
// import { useNavigate } from "react-router-dom";

// const PostForm = ({ onClose }) => {
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (description && category) {
//       const formData = {
//         description,
//         category,
//       };
//       dispatch(addPost(formData));
//       setDescription("");
//       setCategory("");
//       navigate("/posts");
//       if (onClose) onClose();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.formContainer}>
//       <button
//         type="button"
//         onClick={() => navigate("/posts")}
//         className={styles.closeButton}
//       >
//         Закрыть X
//       </button>
//       <div className={styles.formField}>
//         <label>Описание</label>
//         <input
//           type="text"
//           placeholder="Описание"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div className={styles.formField}>
//         <label>Категория</label>
//         <input
//           type="text"
//           placeholder="Категория"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" className={styles.submitButton}>
//         Добавить
//       </button>
//     </form>
//   );
// };

// export default PostForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../slices/postSlice";
import styles from "../style/PostForm.module.css";
import { useNavigate } from "react-router-dom";

const PostForm = ({ onClose }) => {
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
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <button
        type="button"
        onClick={() => navigate("/posts")}
        className={styles.closeButton}
      >
        Закрыть X
      </button>
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className={styles.selectInput}
        >
          <option value="">Выберите категорию</option>
          <option value="anon">Анон</option>
          <option value="confession">Признание</option>
          <option value="lost_found">Нашел/Потерял</option>
          <option value="news">Новости</option>
        
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>
        Добавить
      </button>
    </form>
  );
};

export default PostForm;
