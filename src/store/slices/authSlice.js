import { createSlice } from '@reduxjs/toolkit';
import { authenticateUser } from '../../data/mockData';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Thunk for login
export const login = (employeeId, password) => (dispatch) => {
  dispatch(loginStart());
  
  // Simulate API call delay
  setTimeout(() => {
    const user = authenticateUser(employeeId, password);
    
    if (user) {
      dispatch(loginSuccess(user));
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      dispatch(loginFailure('Invalid Employee ID or Password'));
    }
  }, 500);
};

// Thunk for checking authentication on app load
export const checkAuth = () => (dispatch) => {
  const user = localStorage.getItem('user');
  if (user) {
    dispatch(loginSuccess(JSON.parse(user)));
  }
};

export default authSlice.reducer;
