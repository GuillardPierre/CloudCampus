console.log('hello');

const callAPI = async () => {
  const rep = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await rep.json();
  console.log(data);
};

callAPI();
