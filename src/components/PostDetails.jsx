import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addComment, fetchComments } from "../slices/postSlice"; // Импортируйте асинхронное действие
import styles from "../style/PostDetails.module.css";

const PostDetails = () => {
  const { postId } = useParams();
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.id === postId)
  );
  const comments = useSelector((state) => state.posts.comments[postId] || []);

  const handleAddComment = () => {
    dispatch(addComment({ postId, comment: newComment }));
    setNewComment(""); // Очищаем поле ввода
  };

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId)); // Получаем комментарии при монтировании компонента
    }
  }, [dispatch, postId]);

  if (!post) {
    return <div>Пост не найден</div>;
  }
  console.log(comments);

  return (
    <div className={styles.postDetails}>
      <h2>{post.description}</h2>
      <p>Категория: {post.category}</p>
      <p>Опубликовано: {post.timestamp}</p>

      <h3>Комментарии</h3>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Добавьте комментарий"
        required
      />
      <button onClick={handleAddComment}>Отправить</button>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <p>{comment.text}</p>
            <p>Создано: {new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>Нет комментариев</p>
      )}
    </div>
  );
};

export default PostDetails;
