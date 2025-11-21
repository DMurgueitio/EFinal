
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../firebase'; 

const db = getFirestore(app);
const itemsCollection = collection(db, 'items');

export const createItem = async (title, description, studentId) => {
  return await addDoc(itemsCollection, {
    title,
    description: description || '',
    studentId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const getItems = async () => {
  const snapshot = await getDocs(itemsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateItem = async (id, title, description) => {
  const itemRef = doc(db, 'items', id);
  await updateDoc(itemRef, {
    title,
    description: description || '',
    updatedAt: serverTimestamp()
  });
};

export const deleteItem = async (id) => {
  const itemRef = doc(db, 'items', id);
  await deleteDoc(itemRef);
};