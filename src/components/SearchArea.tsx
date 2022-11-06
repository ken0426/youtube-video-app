import { useState } from 'react';
import { YoutubeSearch } from '../api/Api';
import searchIcon from '../images/searchIcon.png';
import './searchArea.css';

const SearchArea = () => {
  const [text, setText] = useState('');

  const onPressSearch = () => {
    if (text.trim() === '') {
      alert('テキストを入力してください');
    } else {
      const aa =  YoutubeSearch(text);
      console.log('この中身は？', aa)
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
