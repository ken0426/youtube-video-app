import { useState } from 'react';
import { callApi } from '../api/Api';
import { videoList } from '../api/videoList';
import searchIcon from '../images/searchIcon.png';
import './searchArea.css';

interface Props {
  setVideoData: (e: []) => void;
  setIsLoading: (e: boolean) => void;
}

const SearchArea = ({ setVideoData, setIsLoading }: Props) => {
  const [text, setText] = useState('UC17EHY8PqxX4lUeL5sbTjBQ');

  const onPressSearch = async () => {
    setIsLoading(true);
    if (text.trim() === '') {
      alert('テキストを入力してください');
      setIsLoading(false);
    } else {
      const resData = await callApi(text);
      const videoData = await videoList(resData);
      setVideoData(videoData);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='searchArea'>
        <input
          type='search'
          value={text}
          placeholder={'チャンネルID'}
          className='search _searchText _mainBackGroundColorBlack'
          onChange={(e) => setText(e.target.value)}
        />
        <button className='searchButton _searchText' onClick={onPressSearch}>
          <img className='searchIcon' src={searchIcon} alt={'虫眼鏡の画像'} />
        </button>
      </div>
    </>
  );
};

export default SearchArea;
