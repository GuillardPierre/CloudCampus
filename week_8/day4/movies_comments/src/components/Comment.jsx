import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { deleteComment } from '../redux/commentSlice';
import { useDispatch } from 'react-redux';

export default function Comment({ comment }) {
  const dispatch = useDispatch();
  const handleDelete = (id) => dispatch(deleteComment(id));

  return (
    <ListGroup.Item>
      <h6 className='fw-bold mb-1'>Note : {comment.note}/5</h6>
      <p>{comment.comment}</p>
      <div className='d-flex justify-content-end'>
        <Button variant='danger' onClick={() => handleDelete(comment.id)}>
          Supprimer
        </Button>
      </div>
    </ListGroup.Item>
  );
}
