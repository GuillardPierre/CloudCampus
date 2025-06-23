import { useState } from 'react';
import { useEffect } from 'react';
import './styles/app.scss';
import Article from './components/Article';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  return (
    <>
      <main>
        <Container>
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
