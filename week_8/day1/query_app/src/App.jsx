import { useState } from 'react';
import { useEffect } from 'react';
import './styles/app.scss';
import Article from './components/Article';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const rep = await fetch('https://fakestoreapi.com/productss');
        console.log(rep);
        if (!rep.ok) {
          throw new Error(
            `Erreur HTTP: ${rep.statusText ? rep.statusText + ' - ' : ''}${
              rep.status
            }`
          );
        }

        const data = await rep.json();
        setArticles(data);
      } catch (error) {
        console.error(error.message);
        setError(
          'Une erreur est survenue lors de la récupération des articles'
        );
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const postProduct = async () => {
    const product = { title: 'New Product', price: 29.99 };

    try {
      const rep = await fetch('https://fakestoreapi.com/productss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!rep.ok) {
        throw new Error(
          `Erreur HTTP: ${rep.statusText ? rep.statusText + ' - ' : ''}${
            rep.status
          }`
        );
      }

      const data = await rep.json();
      alert(`Le produit avec l'id ${data.id} a été créé`);
    } catch (error) {
      console.error(error.message);
      alert("Une erreur est survenue lors de l'ajout d'un article");
    }
  };
  if (error) return <p>Erreur : {error}</p>;

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      <main>
        <Container className='my-5'>
          <div className='d-flex justify-content-center mb-4'>
            <Button variant='primary' size='lg' onClick={postProduct}>
              <i className='bi bi-plus-lg me-2'></i> Ajouter un produit
            </Button>
          </div>

          <Row className='gy-4'>
            {articles.map((article) => (
              <Col key={article.id} xs={12} sm={6} md={3}>
                <Article article={article} />
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;
