import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './AppointmentHistory.css';

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data);
        setError('');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Cookies.remove('token');
          navigate('/signin');
        } else {
          console.error('Error fetching appointments', error);
          setError('Failed to fetch appointments');
        }
      }
    };

    fetchAppointments();
  }, [navigate]);

  return (
    <div className="appointment-history-container">
      <h2>Appointment History</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {new Date(appointment.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentHistory;