import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
	'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
	'x-rapidapi-key': '059ec84352mshaaa9412becb2ba9p152160jsne173406dc52a'
};

// DO NOT PUT THE SPECIFIC QUERY URL IN THE BASE URL!!!!
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })


export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?limit=${count}`)
		})
	}),
});

export const {
	// "use getCryptos (above) query" hook is useGetCrytpoQuery
	useGetCryptosQuery,
} = cryptoApi;