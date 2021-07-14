import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import history from 'utils/history';
import { bitfinexApi } from 'services/bitfinex';

const initialState = {};

export const store = configureStore({
  initialState,
  reducer: {
    [bitfinexApi.reducerPath]: bitfinexApi.reducer,
    router: connectRouter(history),
  },
  middleware: getDefaultMiddleware => {
    getDefaultMiddleware().concat(routerMiddleware(history));
    getDefaultMiddleware().concat(bitfinexApi.middleware);
    return getDefaultMiddleware();
  },
  devTools: true,
});

export { history };
