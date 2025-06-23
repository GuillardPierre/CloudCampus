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

  useEffect(() => {
    const getData = async () => {
      const rep = await fetch('https://fakestoreapi.com/products');
      console.log(rep);

      const data = await rep.json();
      setArticles(data);
    };

    getData();
  }, []);

  const postProduct = async () => {
    const product = { title: 'New Product', price: 29.99 };
    const rep = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await rep.json();
    alert(`Le produit avec l'id ${data.id} a été créé`);
  };

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
