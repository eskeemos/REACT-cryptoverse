import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'x-bingapis-sdk': process.env.REACT_APP_X_BINGAPIS_SDK,
  'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;