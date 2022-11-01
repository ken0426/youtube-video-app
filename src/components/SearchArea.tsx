import { useState } from 'react';
import './searchArea.css';
import searchIcon from '../images/searchIcon.png';

const SearchArea = () => {
  const [text, setText] = useState('');

  const onPressSearch = () => {
    console.log(text);
    if (text.trim() === '') {
      alert('テキストを入力してください');
    } else {
      setText('');
    }
  };
  return (
    <div className='searchArea'>
      <input
        type='search'
        value={text}
        placeholder={'検索'}
        className='search _searchText _mainBackGroundColorBlack'
        onChange={(e) => setText(e.target.value)}
      />
      <button className='searchButton _searchText' onClick={onPressSearch}>
        <img className='searchIcon' src={searchIcon} alt={'虫眼鏡の画像'} />
      </button>
    </div>
  );
};

export default SearchArea;
