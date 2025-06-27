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
    comment: yup
      .string()
      .required('Le commentaire est obligatoire')
      .max(500, 'Le commentaire ne doit pas dépasser 500 caractères'),
    note: yup
      .number()
      .typeError('Veuillez sélectionner une note')
      .min(1, 'La note doit être au moins 1')
      .max(5, 'La note doit être au plus 5')
      .required('Veuillez sélectionner une note'),
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
    defaultValues: {
      comment: '',
      note: '',
      cgu: false,
    },
  });

  const onSubmit = (data) => {
    dispatch(addComment(data));
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
        <Form.Select {...register('note')} isInvalid={!!errors.note}>
          <option value=''>Sélectionnez une note</option>
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Form.Select>
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
          feedback={errors.cgu?.message}
          feedbackType='invalid'
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Ajouter
      </Button>
    </Form>
  );
}
