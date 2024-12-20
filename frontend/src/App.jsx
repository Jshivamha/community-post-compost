import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './elements/Navbar';
import Footer from './elements/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Mycommunities from './pages/Mycommunities';
import { AuthProvider } from './context/auth/AuthContext';
import ProtectedRoute from './elements/Protected';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ToastProvider } from './components/ui/toast';
import axios from 'axios';
import Allcommunities from './pages/Allcommunities';
import CommunityPage from './pages/CommunityPage';
import { ThemeProvider } from "@material-tailwind/react";

axios.defaults.withCredentials = true;

function App() {
  return (
    <ThemeProvider>
    <ToastProvider>
      <AuthProvider>
        <Router>
          <div className="h-screen flex flex-col pb-24">
            <Navbar />
            <div className="flex-grow pt-24 px-12">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/u/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/u/my-communities" element={<ProtectedRoute><Mycommunities /></ProtectedRoute>} />
                <Route path="/u/all-communities" element={<ProtectedRoute><Allcommunities /></ProtectedRoute>} />
                <Route path="/u/community/:id" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
