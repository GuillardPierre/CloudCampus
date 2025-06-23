import { useState } from 'react';
import { useEffect } from 'react';
import './styles/app.scss';
import Article from './components/Article';

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
        <section className='articles-wrapper'>
          {articles.map((article) => (
            <Article article={article} key={article.id} />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
