import { useState } from 'react';
import SearchArea from './SearchArea';
import VideoArea from './VideoArea';

const Home = () => {
  return (
    <>
      <div className='header _mainBackGroundColorBlack'>
        <SearchArea />
      </div>
      <VideoArea />
    </>
  );
};

export default Home;
