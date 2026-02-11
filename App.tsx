
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Directory from './pages/Directory';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminSupplierForm from './pages/AdminSupplierForm'; // New
import UserProfile from './pages/UserProfile'; // New
import SupplierDetails from './pages/SupplierDetails';
import About from './pages/About';
import Pricing from './pages/Pricing';
import { User } from './types';

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-right" dir="rtl">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/supplier/:id" element={<SupplierDetails user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            
            <Route path="/login" element={<Login setUser={setUser} initialMode="login" />} />
            <Route path="/register" element={<Login setUser={setUser} initialMode="register" />} />
            
            {/* Protected User Profile */}
            <Route 
              path="/profile" 
              element={
                user ? (
                  <UserProfile user={user} setUser={setUser} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                user && user.role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/admin/add-supplier" 
              element={
                user && user.role === 'admin' ? (
                  <AdminSupplierForm />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/admin/edit-supplier/:id" 
              element={
                user && user.role === 'admin' ? (
                  <AdminSupplierForm />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
