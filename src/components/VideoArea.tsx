import SelectArea from './SelectArea';
import { useState } from 'react';
import moment from 'moment';
import './video.css';

interface Props {
  videoData: any;
}

const VideoArea = ({ videoData }: Props) => {
  const [isNewVideoList, setIsNewVideoList] = useState(true);
  const [keyWord, setKeyWord] = useState('');

  const videoSortData = videoData.sort(
    (a: { videoPostedDate: string }, b: { videoPostedDate: string }): any => {
      let sortResult;
      if (isNewVideoList) {
        if (moment(a.videoPostedDate) > moment(b.videoPostedDate)) {
          sortResult = -1;
        }
      } else {
        if (moment(a.videoPostedDate) < moment(b.videoPostedDate)) {
          sortResult = -1;
        }
      }
      return sortResult;
    }
  );
  return (
    <div className='videoArea'>
      {videoData.length && (
        <SelectArea
          setIsNewVideoList={setIsNewVideoList}
          setKeyWord={setKeyWord}
        />
      )}
      {keyWord === '' ? (
        <div className='videoContents'>
          {videoSortData &&
            videoSortData.map((item: any, key: number) => {
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
                    <div className='videoTime'>{item.videoTime}</div>
                  </div>
                  <p className='videoTitle'>{item.videoTitle}</p>
                  <div className='videoFooter'>{item.videoFooter}</div>
                </a>
              );
            })}
        </div>
      ) : (
        <div className='videoContents'>
          {videoSortData.map((item: any, key: number) => {
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
