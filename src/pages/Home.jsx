// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getItems, deleteItem } from '../services/firestoreService';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems();
      // Ordenar por createdAt descendente (más recientes primero)
      const sorted = data.sort((a, b) => {
        return new Date(b.createdAt?.toDate()) - new Date(a.createdAt?.toDate());
      });
      setItems(sorted);
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este item?')) {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div>
      <h1>Lista de Items</h1>
      <Link to="/form">+ Crear nuevo item</Link>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            {item.description && <p>{item.description}</p>}
            <div>
              <Link to={`/form/${item.id}`}>Editar</Link> | 
              <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;