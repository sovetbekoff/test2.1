import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// export const updatePost = createAsyncThunk(
//   "posts/updatePost",
//   async ({ id, postData }) => {
//     const postRef = doc(firestore, "posts", id);
//     await updateDoc(postRef, postData);
//     return { id, ...postData };
//   }
// );

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, postData }) => {
    try {
      const postRef = doc(firestore, "posts", id);
      await updateDoc(postRef, {
        description: postData.description,
        category: postData.category,
      });
      return { id, ...postData };
    } catch (error) {
      console.error("Ошибка при обновлении поста:", error);
      throw error;
    }
  }
);

// // Асинхронное действие для добавления нового поста без изображения
// export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
//   const docRef = await addDoc(collection(firestore, "posts"), postData);
//   return { id: docRef.id, ...postData };
// });

// In postSlice.js
// export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
//   const postWithTimestamp = {
//     ...postData,

//   };
//   const docRef = await addDoc(collection(firestore, "posts"), postWithTimestamp);
//   return { id: docRef.id, ...postWithTimestamp };
// });

export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  const postWithoutTimestamp = {
    description: postData.description,
    category: postData.category,
  };
  const docRef = await addDoc(
    collection(firestore, "posts"),
    postWithoutTimestamp
  );
  return { id: docRef.id, ...postWithoutTimestamp };
});

// Получение и удаление постов без изменений
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const querySnapshot = await getDocs(collection(firestore, "posts"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // Здесь вы получаете все данные из документа
  }));
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await deleteDoc(doc(firestore, "posts", id));
  return id;
});

// Асинхронное действие для добавления комментария
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }) => {
    const commentsRef = collection(doc(firestore, "posts", postId), "comments");
    const commentDoc = await addDoc(commentsRef, {
      text: comment,
      createdAt: new Date().toISOString(),
    });
    return {
      postId,
      id: commentDoc.id,
      text: comment,
      createdAt: commentDoc.data().createdAt,
    };
  }
);

// Получение комментариев
// Получение комментариев
export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async (postId) => {
    const commentsRef = collection(doc(firestore, "posts", postId), "comments");
    const querySnapshot = await getDocs(commentsRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], status: null, comments: {} },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, ...comment } = action.payload;
        if (!state.comments[postId]) state.comments[postId] = [];
        state.comments[postId].push(comment);
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const postId = action.meta.arg; // postId, переданный в аргументе
        state.comments[postId] = action.payload; // Сохраняем комментарии по postId
      });
  },
});

export default postsSlice.reducer;
