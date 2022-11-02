import './video.css';
import { videoData } from '../moc/mocData';

const VideoArea = () => {
  return (
    <div className='videoArea'>
      <div className='videoContents'>
        {videoData.map((item) => {
          return (
            <a
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
    </div>
  );
};

export default VideoArea;
