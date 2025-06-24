import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles/app.scss';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    priority: 'Low',
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='date'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='priority'>
          <Form.Label>Priorité</Form.Label>
          <Form.Select
            name='priority'
            value={formData.priority}
            onChange={handleChange}
          >
            <option value='Low'>Basse</option>
            <option value='Middle'>Moyenne</option>
            <option value='High'>Élevée</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='completed'>
          <Form.Check
            type='checkbox'
            name='isCompleted'
            label='Completé'
            checked={formData.isCompleted}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Soumettre
        </Button>
      </Form>
    </>
  );
}

export default App;
