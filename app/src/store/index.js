import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/user-slice';
import loadingReducer from './slices/loading-slice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        loading: loadingReducer,
    }
})
