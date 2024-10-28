// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCGDnFhfy7RlDtyoEWrqEhgCiQak0Wx3VA",
  authDomain: "anons-e0bb2.firebaseapp.com",
  projectId: "anons-e0bb2",
  storageBucket: "anons-e0bb2.appspot.com",
  messagingSenderId: "78673809310",
  appId: "1:78673809310:web:d0ced2d3d73b50a75e108f",
  measurementId: "G-KG0LHLCMVR",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт нужных сервисов Firebase
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
