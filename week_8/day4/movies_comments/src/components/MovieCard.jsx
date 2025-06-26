import Card from 'react-bootstrap/Card';

export default function MovieCard({ movie }) {
  return (
    <Card>
      <Card.Img variant='top' src={movie?.backdrop_path} />
      <Card.Body>
        <Card.Title>{movie.original_title}</Card.Title>
        <Card.Subtitle>
          Sortie le {new Date(movie.release_date).toLocaleDateString()}
        </Card.Subtitle>
        <Card.Text>{movie.overview}</Card.Text>
        <Card.Text>
          Note moyenne: {movie.vote_average} ({movie.vote_count})
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
