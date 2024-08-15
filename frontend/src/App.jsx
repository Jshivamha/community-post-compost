import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './elements/Navbar';
import Footer from './elements/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Mycommunities from './pages/Mycommunities';
import { AuthProvider } from './context/auth/authContext';
import ProtectedRoute from './elements/Protected';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { ToastProvider } from './components/ui/toast';
// import MyPosts from './pages/MyPosts';
// import Profile from './pages/Profile';

function App() {

  return (
    <>
    <ToastProvider>
    <AuthProvider>
      <Router>
        <div className='h-screen flex flex-col'>
          <Navbar />
          <div className='flex-grow pt-24 px-12'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/u/profile" element={<Profile />} /> */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/u/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/u/my-communities" element={<ProtectedRoute><Mycommunities /></ProtectedRoute>} />
              {/* <Route path="/u/my-posts" element={<MyPosts />} /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
    </ToastProvider>
    </>
  );
}

export default App;
