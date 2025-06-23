import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Article({ article }) {
  const changeProduct = async (id) => {
    const product = { title: 'Updated Product', price: 39.99 };
    const rep = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await rep.json();
    alert(`Le produit avec l'id ${data.id} a été modifié`);
  };

  const changeProductPrice = async (id) => {
    const product = { title: 'Updated Product', price: 39.99 };
    const rep = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await rep.json();
    alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
  };

  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        src={article.image}
        alt={`Image de ${article.title}`}
      />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.description}</Card.Text>
        <Card.Text>{article.price} €</Card.Text>
      </Card.Body>
      <Card.Footer className='gap-1'>
        <Button
          variant='primary'
          className='mt-auto'
          onClick={() => changeProduct(article.id)}
        >
          Modifier un produit complet
        </Button>
        <Button
          variant='primary'
          className='mt-auto'
          onClick={() => changeProductPrice(article.id)}
        >
          Modifer le prix
        </Button>
      </Card.Footer>
    </Card>
  );
}
