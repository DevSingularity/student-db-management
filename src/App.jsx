import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/slices/authSlice';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import StudentProfile from './pages/StudentProfile';
import PaymentDashboard from './pages/PaymentDashboard';
import Layout from './components/Layout';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" replace />}
        />
        <Route
          path="/student/:studentId"
          element={isAuthenticated ? <Layout><StudentProfile /></Layout> : <Navigate to="/login" replace />}
        />
        <Route
          path="/payments"
          element={isAuthenticated ? <Layout><PaymentDashboard /></Layout> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
