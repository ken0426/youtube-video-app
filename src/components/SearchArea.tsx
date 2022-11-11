import { useState } from 'react';
import { callApi } from '../api/Api';
import searchIcon from '../images/searchIcon.png';
import './searchArea.css';

const SearchArea = () => {
  const [text, setText] = useState('');

  let apiVideoData = [];

  const onPressSearch = async () => {
    if (text.trim() === '') {
      alert('テキストを入力してください');
    } else {
      const resData = await callApi(text);
      console.log('この中身は？', resData);
      apiVideoData.push(resData.items);
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
