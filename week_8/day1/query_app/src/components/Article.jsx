import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Article({ article }) {
  const changeArticle = async (id) => {
    const product = { title: 'Updated Product', price: 39.99 };
    try {
      const rep = await fetch(`https://fakestoreapi.com/products/${id}f`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!rep.ok) {
        console.log(rep);
        throw new Error(
          `Erreur HTTP: ${rep.statusText ? rep.statusText + ' - ' : ''}${
            rep.status
          }`
        );
      }

      const data = await rep.json();
      alert(`Le produit avec l'id ${data.id} a été modifié`);
    } catch (error) {
      console.error(error.message);
      alert(
        `Une erreur est survenue lors de la modification de l'article avec l'id ${id}`
      );
    }
  };

  const changeArticlePrice = async (id) => {
    const product = { price: 39.99 };

    try {
      const rep = await fetch(`https://fakestoreapi.com/products/${id}s`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!rep.ok) {
        console.log(rep);
        throw new Error(
          `Erreur HTTP: ${rep.statusText ? rep.statusText + ' - ' : ''}${
            rep.status
          }`
        );
      }

      const data = await rep.json();
      alert(`Le prix du produit avec l'id ${data.id} a été modifié`);
    } catch (error) {
      console.error(error.message);
      alert(
        `Une erreur est survenue lors de la modification du prix de l'article avec l'id ${id}`
      );
    }
  };

  const deleteArticle = async (id) => {
    try {
      const rep = await fetch(`https://fakestoreapi.com/products/${id}s`, {
        method: 'DELETE',
      });
      if (!rep.ok) {
        console.log(rep);
        throw new Error(
          `Erreur HTTP: ${rep.statusText ? rep.statusText + ' - ' : ''}${
            rep.status
          }`
        );
      }

      const data = await rep.json();
      alert(`Le produit avec l'id ${data.id} a été supprimé`);
    } catch (error) {
      console.error(error.message);
      alert(
        `Une erreur est survenue lors de la suppression de l'article avec l'id ${id}`
      );
    }
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
