// В PostDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addComment,
  fetchComments,
  editComment,
  deleteComment,
} from "../slices/postSlice";
import styles from "../style/PostDetails.module.css";

const PostDetails = ({ isAdmin }) => {
  const { postId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [editText, setEditText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.id === postId)
  );
  const comments = useSelector((state) => state.posts.comments[postId] || []);

  const handleAddComment = () => {
    dispatch(addComment({ postId, comment: newComment }));
    setNewComment("");
  };

  const handleEditComment = (commentId) => {
    dispatch(editComment({ postId, commentId, newText: editText }));
    setEditingCommentId(null);
    setEditText("");
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ postId, commentId }));
  };

  useEffect(() => {
    if (postId) dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  if (!post) return <div>Пост не найден</div>;

  return (
    <div className={styles.postDetails}>
      <h2 className={styles.postTitle}>{post.description}</h2>
      <p className={styles.postCategory}>Категория: {post.category}</p>

      <h3 className={styles.commentsTitle}>Комментарии</h3>
      <div className={styles.commentInput}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Добавьте комментарий"
          required
          className={styles.inputField}
        />
        <button onClick={handleAddComment} className={`${styles.submitButton}`}>
          Отправить
        </button>
      </div>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            {editingCommentId === comment.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Редактировать комментарий"
                />
                <button onClick={() => handleEditComment(comment.id)}>
                  Сохранить
                </button>
                <button onClick={() => setEditingCommentId(null)}>
                  Отмена
                </button>
              </>
            ) : (
              <>
                <p>{comment.text}</p>
                <p className={styles.commentTimestamp}>
                  Создано: {new Date(comment.createdAt).toLocaleString()}
                </p>
                {isAdmin && (
                  <div>
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditText(comment.text);
                      }}
                      className={styles.editButton}
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className={styles.deleteButton}
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <p>Нет комментариев</p>
      )}
    </div>
  );
};

export default PostDetails;
