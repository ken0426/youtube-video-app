import './video.css';
import { videoData } from '../moc/mocData';
import SelectArea from './SelectArea';
import { useState } from 'react';
import moment from 'moment';

const VideoArea = () => {
  const [isNewVideoList, setIsNewVideoList] = useState(true);
  const [keyWord, setKeyWord] = useState('');

  const videoSortData = videoData.sort(
    (a: { videoPostedDate: string }, b: { videoPostedDate: string }): any => {
      if (isNewVideoList) {
        if (moment(a.videoPostedDate) > moment(b.videoPostedDate)) {
          return -1;
        }
      } else {
        if (moment(a.videoPostedDate) < moment(b.videoPostedDate)) {
          return -1;
        }
      }
    }
  );
  return (
    <div className='videoArea'>
      <SelectArea
        setIsNewVideoList={setIsNewVideoList}
        setKeyWord={setKeyWord}
      />
      {keyWord === '' ? (
        <div className='videoContents'>
          {videoSortData.map((item, key) => {
            return (
              <a
                key={key}
                className='videoItem _mainBackGroundColorBlack'
                href={item.videoLink}
                target='_blank'
                rel='noreferrer'
              >
                <div className='thumbnail'>
                  <img
                    src={item.videoImag}
                    alt='サムネイル'
                    className='video'
                  ></img>
                  <div className='videoTime _mainBackGroundColorBlack'>
                    {item.videoTime}
                  </div>
                </div>
                <p className='videoTitle'>{item.videoTitle}</p>
                <div className='videoFooter'>{item.videoFooter}</div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className='videoContents'>
          {videoSortData.map((item, key) => {
            return (
              item.videoTitle.match(keyWord) && (
                <a
                  key={key}
                  className='videoItem _mainBackGroundColorBlack'
                  href={item.videoLink}
                  target='_blank'
                  rel='noreferrer'
                >
                  <div className='thumbnail'>
                    <img
                      src={item.videoImag}
                      alt='サムネイル'
                      className='video'
                    ></img>
                    <div className='videoTime _mainBackGroundColorBlack'>
                      {item.videoTime}
                    </div>
                  </div>
                  <p className='videoTitle'>{item.videoTitle}</p>
                  <div className='videoFooter'>{item.videoFooter}</div>
                </a>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VideoArea;
