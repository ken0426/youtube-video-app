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
            part: 'snippet',
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
        const resData = await axios(requestPramData[detailCount]);
        const videoDetailData = await resData.data.items[0]?.snippet;
        const upVideoDate = moment(await videoDetailData?.publishedAt);
        const elapsedDate = today.diff(upVideoDate, 'days');
        detailVideoData.push({
          videoLink: '', // 動画のリンク
          videoImag: await videoDetailData?.thumbnails.default.url, // サムネイル
          videoTime: '10:00', // 動画の再生時間
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
