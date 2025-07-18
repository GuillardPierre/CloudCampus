import { useEffect, useState } from 'react';
import './styles/App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from './components/MovieCard';
import CommentForm from './components/CommentForm';
import CommentDisplayZone from './components/CommentsDisplayZone';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const rep = await fetch('http://movies.digistos.com/');
        if (!rep.ok) {
          throw new Error(
            `Erreur HTTP: ${rep.statusText ? rep.statusText + ' - ' : ''}${
              rep.status
            }`
          );
        }
        const data = await rep.json();
        setData(data[0]);
      } catch (error) {
        console.error('Erreur: ', error.message);
        setError(
          'Une erreur est survenue lors de la récupération des produits.'
        );
      } finally {
        setLoading(false);
      }
    };

    getMovieData();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Chargement en cours</div>;

  return (
    <>
      <Container>
        <Row className='d-flex justify-content-center my-3'>
          <Col md={6}>
            <MovieCard movie={data} />
            <CommentForm />
            <CommentDisplayZone />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
