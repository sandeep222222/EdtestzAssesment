import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Booking from './components/Booking';
import AppointmentHistory from './components/AppointmentHistory';
import Header from './components/Header';
import NotFound from './components/NotFound'
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/appointments" element={<AppointmentHistory />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;