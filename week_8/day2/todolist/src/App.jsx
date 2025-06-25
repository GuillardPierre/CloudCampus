import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles/app.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Le nom est requis'),
  date: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/,
      'Respectez le format jj/mm/AAAA'
    )
    .test(
      'valid-date',
      "La date doit être antérieure à aujourd'hui",
      function (value) {
        if (!value) return false;
        const [day, month, year] = value.split('/').map(Number);
        if (day > 31) return false;
        if (month > 12) return false;
        if (year > 9999) return false;
        const inputDate = new Date(year, month, day);
        const today = new Date();
        if (inputDate >= today) return false;
        return true;
      }
    ),
  priority: yup
    .string()
    .required('Choisissez une option valide')
    .oneOf(['Low', 'Middle', 'High'], 'Choisissez une option valide'),
  isCompleted: yup.boolean(),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Nom</Form.Label>
          <Form.Control
            {...register('name')}
            type='text'
            name='name'
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='date'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            {...register('date')}
            name='date'
            isInvalid={!!errors.date}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.date?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='priority'>
          <Form.Label>Priorité</Form.Label>
          <Form.Select
            name='priority'
            {...register('priority')}
            isInvalid={!!errors.priority}
          >
            <option value='Low'>Basse</option>
            <option value='Middle'>Moyenne</option>
            <option value='High'>Élevée</option>
            <option value='Test'>Test</option>
          </Form.Select>
          <Form.Control.Feedback type='invalid'>
            {errors.priority?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='isCompleted'>
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
