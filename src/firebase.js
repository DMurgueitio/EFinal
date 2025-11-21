// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Importa Firestore
// Opcional: Si no usas analytics, puedes quitar esta línea
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfUV3NIz_G2D5emRfMYl7ri_nVBossssI",
  authDomain: "mi-app-react-bd115.firebaseapp.com",
  projectId: "mi-app-react-bd115",
  storageBucket: "mi-app-react-bd115.firebasestorage.app",
  messagingSenderId: "911769131030",
  appId: "1:911769131030:web:e931d277f185a76f3c7d37",
  measurementId: "G-JCGXC9RVX9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore y obtén la instancia
// const analytics = getAnalytics(app); // Opcional

export { app, db }; // Exporta app y db