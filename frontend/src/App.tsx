import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Workouts from './pages/WorkoutsPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  const token = localStorage.getItem('token');
  
  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to = "/workouts" /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to = "/workouts" /> : <Register />} />

      {/* Logged in routes */}
      <Route path="/workouts" element={<ProtectedRoute><Workouts /></ProtectedRoute>} />

      {/* Default route */}
      <Route path="/" element={<Navigate to={token ? "/workouts" : "/login" } replace />} />

      {/* 404 route */}
      <Route path="*" element={<Navigate to="/workouts" />} />

    </Routes>

  )
}

export default App;