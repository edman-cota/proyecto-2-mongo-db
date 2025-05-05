import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

import MenuItems from './MenuItems';
import Navigation from './Navigation';
import Restaurant from './Restaurant';
import Restaurants from './Restaurants';
import { Routes, Route } from 'react-router';
import SignUp from './SignUp';
import Login from './Login';
import { getUserData } from './util';
import AdminDashboard from './AdminDashboard';

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

function App() {
  const navigate = useNavigate();
  const currentUser = getUserData();

  const onLogin = async () => {
    const token = getAuthToken();
    if (!token) {
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem('user', JSON.stringify(response.data));

      navigate(`/`);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };
  return (
    <div className='main'>
      {currentUser && <Navigation />}

      <Routes>
        <Route path='signup' element={<SignUp />} />
        <Route path='login' element={<Login onLogin={onLogin} />} />
        <Route path='' element={<AdminDashboard />} />
        <Route path='restaurants' element={<Restaurants />} />¨
        <Route path='restaurant/:id' element={<Restaurant />} />
        <Route path='menu-items' element={<MenuItems />} />
      </Routes>
    </div>
  );
}

export default App;
