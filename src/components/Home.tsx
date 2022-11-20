import { useState } from 'react';
import SearchArea from './SearchArea';
import VideoArea from './VideoArea';
import ReactLoading from 'react-loading';
import './home.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  return (
    <div className='main'>
      <div className='header _mainBackGroundColorBlack'>
        <SearchArea setVideoData={setVideoData} setIsLoading={setIsLoading} />
      </div>
      {!isLoading ? (
        <VideoArea videoData={videoData} />
      ) : (
        <ReactLoading
          type={'spin'}
          color={'#ffffff'}
          height={'10%'}
          width={'10%'}
          className={'loading'}
        />
      )}
    </div>
  );
};

export default Home;
