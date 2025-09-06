import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import AccountVerification from './pages/auth/AccountVerification';
import Dashboard from './pages/Dashboard';
import AccountPage from './pages/Account';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';
import ResetPassword from './pages/auth/ResetPassword';
import Invitations from './pages/Invitations';
// A simple wrapper to conditionally render AnimatePresence
// This ensures that only one Route's component is present at a time
// for the animation to work correctly.
const AnimatedRoutes = () => {
  const {isAuthenticated } = useAuth(); // You'd likely use the user state here for protected routes

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-account" element={<AccountVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Protected routes example: You might use a wrapper component
        like <ProtectedRoute> to check for authentication */}
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to={"/login"}/>} />
        <Route path="/account" element={isAuthenticated ? <AccountPage /> : <Navigate to={"/login"}/> }/>
          <Route path="/invitations" element={<Invitations />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}