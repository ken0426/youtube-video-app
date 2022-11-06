import axios, { AxiosRequestConfig } from 'axios';

export const YoutubeSearch: any = async (keyword: string) => {
  try {
    // console.log(keyword);

    const config: AxiosRequestConfig = {
      url: 'https://www.googleapis.com/youtube/v3/search',
      // url: 'https://www.googleapis.com/youtube/v3/channels',
      // url: 'https://www.googleapis.com/youtube/v3/videos',
      // url: 'https://www.googleapis.com/youtube/v3/channelSections',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      params: {
        part: 'snippet',
        // q: keyword,
        channelId: keyword,
        maxResults: 50,
        order: 'date',
        key: process.env.REACT_APP_YOUTUBE_API_KEY, // 取得したAPIキーを設定
      },
    };
    const res = await axios(config);

    // console.log(res);
    // console.log(res.data.items);

    return res.data.items;
  } catch (error) {
    alert('URLが間違っています。もしくはチャンネルが存在しません。')
    throw error;
  }
};
