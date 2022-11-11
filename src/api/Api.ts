import axios, { AxiosRequestConfig } from 'axios';

export const callApi: any = async (keyword: string) => {
  try {
    // チャンネルの動画を本数を取得する
    const config: AxiosRequestConfig = {
      url: 'https://www.googleapis.com/youtube/v3/search',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      params: {
        part: 'snippet',
        channelId: keyword,
        maxResults: 50,
        order: 'date',
        key: process.env.REACT_APP_YOUTUBE_API_KEY, // 取得したAPIキーを設定
      },
    };
    const res = await axios(config);

    const allPageVideoData = res.data.pageInfo.totalResults;
    let page = 50;
    let nextData = undefined;
    let resVideoData: any = [];

    // チャンネルに投稿されている動画のvideoIdの取得する（※公開/非公開すべてを取得している）
    while (allPageVideoData >= page) {
      const nextConfig: AxiosRequestConfig = {
        url: 'https://www.googleapis.com/youtube/v3/search',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        params: {
          part: 'snippet',
          channelId: keyword,
          maxResults: 50,
          order: 'date',
          key: process.env.REACT_APP_YOUTUBE_API_KEY, // 取得したAPIキーを設定
          pageToken: nextData,
        },
      };
      const data = await axios(nextConfig);
      data.data.items.map((d: any) => resVideoData.push(d));
      nextData = data.data?.nextPageToken;
      page =
        allPageVideoData - page > 50
          ? page + 50
          : allPageVideoData - page === 0
          ? page + 1
          : page + allPageVideoData - page;
    }

    // videoIdを使ってresVideoDataに入っている一つ一つの動画の詳細を取得する関数

    return resVideoData;
  } catch (error) {
    alert('URLが間違っています。もしくはチャンネルが存在しません。');
    throw error;
  }
};
