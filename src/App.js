import React, { useState, useEffect } from 'react';
import Loader from './components/loader';
import Home from './pages/home';
import Header from './pages/components/globals/header';
import Footer from './pages/components/globals/footer';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import logo from "./assets/images/logo.png"
import Login from './pages/adminpanel/auth/login';
import ForgotPassword from './pages/adminpanel/auth/forgotpassword';
import AdminDashboard from './pages/adminpanel/dashboard/home';
import ResetPassword from './pages/adminpanel/auth/resetPassword';
import Dashboard from './pages/adminpanel/dashboard/dashboard';
import Portfolio from './pages/portfolio.js';
import ScrollToTop from './utils/scrollToTop';
import CategoryDetail from "./pages/components/pages/portfolio/categoryDetail.js"
import ProjectDetails from './pages/components/pages/portfolio/projectDetails.js';
import AboutMe from './pages/aboutMe.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactUs from './pages/contact.js';
import AppErrorBoundary from './utils/ErrorBoundary.js';

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    AOS.init();
  }, [])



  return (
    <Router>
      <ScrollToTop />
      {loading
        ? <Loader />
        : <Routes>
          <Route
            path="/"
            element={
              <div className='relative'>
                <Header />
                <Home />
                <Footer />
              </div>
            } />
          <Route
            path="/portfolio"
            element={
              <div className='relative'>
                <Header />
                <Portfolio />
                <Footer />
              </div>
            } />
          <Route
            path="/project/:id"
            element={
              <div className='relative'>
                <Header />
                <ProjectDetails />
                <Footer />
              </div>
            } />
          <Route
            path="/category/:id"
            element={
              <div className='relative'>
                <Header />
                <CategoryDetail />
                <Footer />
              </div>
            } />
          <Route
            path="/about-me"
            element={
              <div className='relative'>
                <Header />
                <AboutMe />
                <Footer />
              </div>
            } />
          <Route
            path="/contact-me"
            element={
              <div className='relative'>
                <Header />
                <ContactUs />
                <Footer />
              </div>
            } />
          <Route path="/panel" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

        </Routes>
      }
    </Router>
  );
};

export default App;