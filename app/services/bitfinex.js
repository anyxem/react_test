// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const bitfinexApi = createApi({
  reducerPath: 'bitfinexApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: builder => ({
    getListCurrencies: builder.query({
      query: () => `conf/pub:list:currency`,
    }),
    getListPairExchange: builder.query({
      query: () => `conf/pub:list:pair:exchange`,
    }),
    getTrades: builder.query({
      query: pair => `trades/t${pair}/hist`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch },
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = event => {
            const data = JSON.parse(event.data);
            // store curresponding channel id
            if (data.event === 'subscribed') {
              dispatch({
                type: 'bitfinexApi/websocket/subscribe',
                payload: {
                  query: `getTrades("${arg}")`,
                  channelId: data.chanId,
                },
              });
            }

            if (data[1] === 'hb') return;

            // 'te' to get immediate data
            if (data[1] === 'te') {
              updateCachedData(draft => {
                draft.push(data[2]);
              });
            }
          };

          const msg = JSON.stringify({
            event: 'subscribe',
            channel: 'trades',
            symbol: `t${arg}`,
          });
          ws.send(msg);

          ws.addEventListener('message', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
    getOrderBook: builder.query({
      query: pair => `book/t${pair}/P0`,
    }),
    getCandles: builder.query({
      query: pair => `candles/trade:1m:t${pair}/hist`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = event => {
            const data = JSON.parse(event.data);
            // if (data.channel !== arg) return;

            if (data[1] === 'hb') return;

            // 'te' to get immediate data
            updateCachedData(draft => {
              draft[0].push(data[1]);
            });
          };

          const msg = JSON.stringify({
            event: 'subscribe',
            channel: 'candles',
            symbol: `trade:1m:t${arg}`,
          });
          ws.send(msg);

          ws.addEventListener('message', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetListCurrenciesQuery,
  useGetListPairExchangeQuery,
  useGetTradesQuery,
  useGetOrderBookQuery,
  useGetCandlesQuery,
} = bitfinexApi;

export const bitfinexAddonReducer = (state = {}, action) => {
  switch (action.type) {
    case 'bitfinexApi/websocket/subscribe':
      console.log(action, '-----');
      console.log(state);
      return state;
    default:
      return state;
  }
};
