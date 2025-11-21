// src/pages/Form.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createItem, updateItem } from '../services/firestoreService';

const Form = () => {
  const { id } = useParams(); // Para saber si es edición
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Student ID fijo (en producción, esto podría venir de autenticación o contexto)
  const studentId = 'STUDENT_001'; // ⚠️ Cambia esto por tu lógica real

  useEffect(() => {
    if (id) {
      // Cargar item para editar (aquí simplificado, en producción deberías traerlo de Firestore)
      // Por ahora asumimos que lo cargas desde el estado global o context
      setIsEditing(true);
      // En una app real, aquí harías un fetch por ID
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    try {
      if (isEditing) {
        await updateItem(id, title, description);
      } else {
        await createItem(title, description, studentId);
      }
      navigate('/');
    } catch (error) {
      console.error('Error guardando item:', error);
      alert('Hubo un error al guardar');
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Editar Item' : 'Crear Nuevo Item'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción (opcional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
        <button type="button" onClick={() => navigate('/')}>Cancelar</button>
      </form>
    </div>
  );
};

export default Form;