import { createSlice } from '@reduxjs/toolkit';
import { students as mockStudents, searchStudents, getStudentById } from '../../data/mockData';

const initialState = {
  students: mockStudents,
  selectedStudent: null,
  searchResults: [],
  searchQuery: '',
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (action.payload.trim() === '') {
        state.searchResults = [];
      } else {
        state.searchResults = searchStudents(action.payload);
      }
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.searchResults = [];
    },
    loadStudentById: (state, action) => {
      const student = getStudentById(action.payload);
      state.selectedStudent = student;
    },
  },
});

export const {
  setStudents,
  setSelectedStudent,
  setSearchQuery,
  clearSearch,
  loadStudentById,
} = studentSlice.actions;

export default studentSlice.reducer;
