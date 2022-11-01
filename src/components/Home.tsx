import { useState } from 'react';

const Home = () => {
  const [text, setText] = useState('');

  const onPressSearch = () => {
    console.log(text);
  };
  return (
    <>
      <input onChange={(e) => setText(e.target.value)}></input>
      <button onClick={onPressSearch}>検索</button>
    </>
  );
};

export default Home;
