import { useSelector } from 'react-redux';
import { selectValidComments } from '../redux/selectors';
import Alert from 'react-bootstrap/Alert';
import Comment from './Comment';

export default function CommentDisplayZone() {
  const comments = useSelector(selectValidComments);

  return (
    <>
      {comments.length === 0 ? (
        <Alert variant='primary'>Aucun commentaire pour le moment</Alert>
      ) : (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}
    </>
  );
}
