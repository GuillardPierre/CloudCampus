import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { addComment } from '../redux/commentSlice';

export default function CommentForm() {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    comment: yup.string().required('Le commentaire est obligatoire'),
    note: yup
      .string()
      .required('Veuillez saisir une note')
      .test(
        'is-number',
        'La note doit être un nombre',
        (value) => !isNaN(value)
      )
      .test(
        'min',
        'La note doit être supérieure ou égale à 0',
        (value) => Number(value) >= 0
      )
      .test(
        'max',
        'La note doit être inférieure ou égale à 5',
        (value) => Number(value) <= 5
      ),
    cgu: yup
      .boolean()
      .oneOf([true], 'Vous devez accepter les conditions générales'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const cleanData = {
      ...data,
      note: Number(data.note),
    };
    dispatch(addComment(cleanData));
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='my-3'>
      <h2>Commentaires</h2>

      <Form.Group className='mb-3' controlId='comment'>
        <Form.Label>Ajouter un commentaire</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          {...register('comment')}
          isInvalid={!!errors.comment}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.comment?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3' controlId='note'>
        <Form.Label>Note</Form.Label>
        <Form.Control
          type='text'
          placeholder='Sélectionner une note'
          {...register('note')}
          isInvalid={!!errors.note}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.note?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3' controlId='cgu'>
        <Form.Check
          type='checkbox'
          label="J'accepte les conditions générales"
          {...register('cgu')}
          isInvalid={!!errors.cgu}
        />
        {errors.cgu && (
          <div className='invalid-feedback d-block'>{errors.cgu.message}</div>
        )}
      </Form.Group>

      <Button variant='primary' type='submit'>
        Ajouter
      </Button>
    </Form>
  );
}
