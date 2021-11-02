import { Action } from 'redux';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import {createWrapper} from 'next-redux-wrapper';
import { authSlice } from './slice/auth';


const makeStore = () => (
  configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
  })
);

export type RootApp = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootApp['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type AppDispatch = RootApp['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<RootApp>(makeStore);