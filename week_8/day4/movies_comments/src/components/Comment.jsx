import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteComment } from '../redux/commentSlice';
import { useDispatch } from 'react-redux';

export default function Comment({ comment }) {
  const dispatch = useDispatch();
  const handleDelete = (id) => dispatch(deleteComment(id));

  return (
    <Card>
      <Card.Body>
        <Card.Title>Note : {comment.note}/5</Card.Title>
        <Card.Text>{comment.comment}</Card.Text>
        <div className='d-flex justify-content-end'>
          <Button variant='danger' onClick={() => handleDelete(comment.id)}>
            Supprimer
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
