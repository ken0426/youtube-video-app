import axios from 'axios';
import moment from 'moment';

export const videoList: any = async (resData: any) => {
  try {
    let detailCount = 0;
    let detailVideoData = [];
    const today = moment();
    const requestPramData = await resData.map((item: any) => {
      let requestPram;
      if (item.id.videoId) {
        requestPram = {
          url: 'https://www.googleapis.com/youtube/v3/videos',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          params: {
            part: 'snippet, contentDetails, statistics',
            id: item.id.videoId,
            key: process.env.REACT_APP_YOUTUBE_API_KEY, // 取得したAPIキーを設定
          },
        };
      }
      return requestPram;
    });

    // console.log(requestPramData);
    while (requestPramData.length >= detailCount) {
      if (requestPramData[detailCount] !== undefined) {
        const reg = new RegExp('^PT([0-9]*H)?([0-9]*M)?([0-9]*S)?');
        const resData = await axios(requestPramData[detailCount]);
        const videoDetailData = await resData.data.items[0]?.snippet;
        const playTime = await resData.data.items[0]?.contentDetails.duration;
        const upVideoDate = moment(await videoDetailData?.publishedAt);
        const elapsedDate = today.diff(upVideoDate, 'days');
        const regResult = playTime.match(reg);
        const videoId = resData.data.items[0].id;
        console.log(regResult);

        let hour = regResult[1];
        let minutes = regResult[2];
        let sec = regResult[3];

        if (hour === undefined) {
          hour = '00';
        } else {
          hour = hour.split('H')[0];
          if (hour.length === 1) {
            hour = '0' + hour;
          }
        }

        if (minutes === undefined) {
          minutes = '00';
        } else {
          minutes = minutes.split('M')[0];
          if (minutes.length === 1) {
            minutes = '0' + minutes;
          }
        }

        if (sec === undefined) {
          sec = '00';
        } else {
          sec = sec.split('S')[0];
          if (sec.length === 1) {
            sec = '0' + sec;
          }
        }

        const videoTime =
          hour === '00'
            ? minutes + ':' + sec
            : hour + ':' + minutes + ':' + sec;

        console.log(videoTime);

        detailVideoData.push({
          videoLink: `https://www.youtube.com/watch?v=${videoId}`, // 動画のリンク
          videoImag: await videoDetailData?.thumbnails.medium.url, // サムネイル
          videoTime: videoTime, // 動画の再生時間
          videoTitle: await videoDetailData?.title, // 動画のタイトル
          videoFooter: `100回・${elapsedDate}日前`, // 再生回数＋何日前の投稿か
          videoPostedDate: moment(upVideoDate).format('YYYY/MM/DD'),
        });
        detailCount = detailCount + 1;
      } else {
        detailCount = detailCount + 1;
      }
    }

    console.log(detailVideoData);

    return detailVideoData;
  } catch (error: any) {
    if (error?.response?.status === 403) {
      alert(
        'サーバーが落ちている可能性があります。時間をおいてお試しください。'
      );
    } else {
      alert('URLが間違っています。もしくはチャンネルが存在しません。');
    }
    throw error;
  }
};
