
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUpForm } from './components/signup'
import { LoginForm } from './components/login';
import { Main } from './components/main';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/signup" element={<SignUpForm/>} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;