import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles/app.scss';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      date: '',
      priority: 'Low',
      isCompleted: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type='text'
            name='name'
            {...register('name', {
              required: 'Le nom est requis',
              minLength: {
                value: 3,
                message: 'Le nom doit faire au minimum 3 lettres',
              },
            })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='date'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type='date'
            name='date'
            {...register('date', {
              required: 'La date est requise',
            })}
            isInvalid={!!errors.date}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.date?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='priority'>
          <Form.Label>Priorité</Form.Label>
          <Form.Select name='priority' {...register('priority')}>
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
            {...register('isCompleted')}
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
