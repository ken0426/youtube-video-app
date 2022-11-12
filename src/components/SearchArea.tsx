import { useState } from 'react';
import { callApi } from '../api/Api';
import { videoList } from '../api/videoList';
import searchIcon from '../images/searchIcon.png';
import './searchArea.css';

interface Props {
  setVideoData: (e: []) => void;
}

const SearchArea = ({ setVideoData }: Props) => {
  const [text, setText] = useState('UCFBkdFQ3iYvh882EjPnreYw');

  // let apiVideoData = [];

  const onPressSearch = async () => {
    if (text.trim() === '') {
      alert('テキストを入力してください');
    } else {
      const resData = await callApi(text);
      const videoData = await videoList(resData);
      setVideoData(videoData);
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
