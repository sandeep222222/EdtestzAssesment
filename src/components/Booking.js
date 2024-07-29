import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Booking.css'; 

function Booking() {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin'); 
      return;
    }
    
    try {
      await axios.post('http://localhost:3000/appointments', { date }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Appointment booked successfully');
      setError('');
    } catch (err) {
      setError('Error booking appointment');
      setSuccess('');
    }
  };

  return (
    <div className="booking-container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="booking-input"
        />
        <button type="submit" className="booking-button">Book</button>
      </form>
      {error && <p className="booking-error">{error}</p>}
      {success && <p className="booking-success">{success}</p>}
    </div>
  );
}

export default Booking;