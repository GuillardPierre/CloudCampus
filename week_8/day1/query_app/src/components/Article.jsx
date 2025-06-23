import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Article({ article }) {
  const changeArticle = async (id) => {
    const product = { title: 'Updated Product', price: 39.99 };
    const rep = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await rep.json();
    alert(`Le produit avec l'id ${data.id} a été modifié`);
  };

  const changeArticlePrice = async (id) => {
    const product = { price: 39.99 };
    const rep = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await rep.json();
    alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
  };

  const deleteArticle = async (id) => {
    const rep = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    });
    const data = await rep.json();
    alert(`Le produit avec l'id ${data.id} a été supprimé`);
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
        <Button variant='primary' onClick={() => changeArticle(article.id)}>
          Modifier un produit complet
        </Button>
        <Button
          variant='primary'
          onClick={() => changeArticlePrice(article.id)}
        >
          Modifer le prix
        </Button>
        <Button variant='danger' onClick={() => deleteArticle(article.id)}>
          Supprimer l'article
        </Button>
      </Card.Footer>
    </Card>
  );
}
