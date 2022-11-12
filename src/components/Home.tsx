import { useState } from 'react';
import SearchArea from './SearchArea';
import VideoArea from './VideoArea';

const Home = () => {
  const [videoData, setVideoData] = useState([]);
  return (
    <>
      <div className='header _mainBackGroundColorBlack'>
        <SearchArea setVideoData={setVideoData} />
      </div>
      <VideoArea videoData={videoData} />
    </>
  );
};

export default Home;
