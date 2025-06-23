import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

export default function Article({ article }) {
  return (
    <Card className='article'>
      <Card.Img className='article-image' variant='top' src={article.image} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.description}</Card.Text>
        <Card.Text>{article.price} €</Card.Text>
        {/* <Button variant='primary'>Ajouter à mon panier</Button> */}
      </Card.Body>
    </Card>
  );
}
