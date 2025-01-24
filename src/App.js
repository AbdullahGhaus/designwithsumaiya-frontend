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

  useEffect(() => {
    AOS.init();
  }, [])

  const InWebRouteContainer = ({ children }) => {
    return <div className='relative'>
      <Header />
      {children}
      <Footer />
    </div>
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<InWebRouteContainer><Home /></InWebRouteContainer>} />
        <Route path="/portfolio" element={<InWebRouteContainer><Portfolio /></InWebRouteContainer>} />
        <Route path="/project/:id" element={<InWebRouteContainer><ProjectDetails /></InWebRouteContainer>} />
        <Route path="/category/:id" element={<InWebRouteContainer><CategoryDetail /></InWebRouteContainer>} />
        <Route path="/about-me" element={<InWebRouteContainer><AboutMe /></InWebRouteContainer>} />
        <Route path="/contact-me" element={<InWebRouteContainer><ContactUs /></InWebRouteContainer>} />
        <Route path="/panel" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;