import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';
import authAxios from '../../utils/axios';
import requests from '../../utils/requests';
import routes from '../../utils/nextApiRoutes';
import { AppThunk } from '../store';
import { userInterface, loginInterface } from '../../interfaces/user';
import { responseInterface } from '../../interfaces/response';
import { authInterface } from '../../interfaces/auth';
import { Toast } from '../../utils/messages';


const initialState: authInterface = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false
};


export const authSlice = createSlice({
  name: 'auth',

  initialState: initialState,

  reducers: {
    loadUserReducer(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token
    },
    loginUserReducer(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token
    },
    logoutUserReducer(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null
    },
    userFaildReducer(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
    setLoadingReducer(state, action) {
      state.isLoading = action.payload;
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const loadUser = (token: string | null): AppThunk => async dispatch => {
  try {
    dispatch(
      authSlice.actions.setLoadingReducer(true)
    )
    if (!token) {
      dispatch(
        authSlice.actions.userFaildReducer(),
      );
      return;
    };
    const res: responseInterface = await authAxios(token).get(requests.getUser);
    const data: userInterface = res.data;
    dispatch(
      authSlice.actions.loadUserReducer({
          user: {
            ...data
          },
          token: token
      }),
    );
  } catch (e: any) {
    dispatch(
      authSlice.actions.userFaildReducer(),
    );
  } finally {
    dispatch(
      authSlice.actions.setLoadingReducer(false)
    )
  }
};

export const loginUser = (
  data: loginInterface
): AppThunk => async dispatch => {
    
  // loginUser take the setError "state" to set the error if there any!

  try {
    dispatch(
      authSlice.actions.setLoadingReducer(true)
    );
    const res: responseInterface = await axios.post(routes.login, data);
    const responseData: userInterface = res.data;
    dispatch(
      authSlice.actions.loginUserReducer({
          user: {
            ...responseData.user
          },
          isAuthenticated: true,
          token: responseData.token
      }),
    );
  } catch (e: any) {
    const { response } = e;
    console.log(response);
    if (response.status === 400) {
      Toast.fire({
        title: 'Login faild!',
        text: response.data.non_field_errors[0],
        icon: 'error',
        timer: 2000
      });
      return;
    };
    Toast.fire({
      title: 'Login faild!',
      text: 'Something went wrong, please try again!',
      icon: 'error',
      timer: 2000
    });
  } finally {
    dispatch(
      authSlice.actions.setLoadingReducer(false)
    )
  };
};


export const logoutUser = (successCallback: () => void): AppThunk => async (dispatch, getState) => {
  
  /* 
    logoutUser take a successCallback and call it when the response was successfull
  */

  try {
    dispatch(
      authSlice.actions.setLoadingReducer(true)
    )
    const state = getState();
    const { token } = state.auth;
    await axios.post(routes.logout, {token: token});
    dispatch(
      authSlice.actions.logoutUserReducer(),
    );
    successCallback();
  } catch (e: any) {
    const { response } = e;
    if ( response.status === 401 ) {
      Toast.fire({
        title: 'Logout faild!',
        text: 'You already logged out!',
        icon: 'error',
        timer: 2000
      });
    } else {
      Toast.fire({
        title: 'Logout faild!',
        text: 'Something went wrong, please try again!',
        icon: 'error',
        timer: 2000
      });
    }
  } finally {
    dispatch(
      authSlice.actions.setLoadingReducer(false)
    );
  }
};