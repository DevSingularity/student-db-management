import { createSlice } from '@reduxjs/toolkit';
import { payments as mockPayments, getPaymentsByTimeframe, getPaymentsByStudentId } from '../../data/mockData';

const initialState = {
  payments: mockPayments,
  selectedTimeframe: 'monthly', // daily, weekly, monthly
  filteredPayments: mockPayments,
  studentPayments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setTimeframe: (state, action) => {
      state.selectedTimeframe = action.payload;
      state.filteredPayments = getPaymentsByTimeframe(action.payload);
    },
    loadPaymentsByStudentId: (state, action) => {
      state.studentPayments = getPaymentsByStudentId(action.payload);
    },
    clearStudentPayments: (state) => {
      state.studentPayments = [];
    },
  },
});

export const {
  setPayments,
  setTimeframe,
  loadPaymentsByStudentId,
  clearStudentPayments,
} = paymentSlice.actions;

export default paymentSlice.reducer;
