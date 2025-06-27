import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Comment from './Comment';
import ListGroup from 'react-bootstrap/ListGroup';

export default function CommentDisplayZone() {
  const comments = useSelector((state) => state.comments);

  return (
    <>
      {comments.length === 0 ? (
        <Alert variant='info'>Aucun commentaire pour le moment</Alert>
      ) : (
        <ListGroup>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ListGroup>
      )}
    </>
  );
}
