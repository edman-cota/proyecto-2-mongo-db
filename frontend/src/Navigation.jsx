import { Link, useNavigate } from 'react-router';
import { FaStore } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { getUserData } from './util';

const Navigation = () => {
  const navigate = useNavigate();
  const currentUser = getUserData();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  };

  return (
    <nav>
      {currentUser && (
        <div>
          <p>Bienvenido: {currentUser.name}</p>
          <button className='logoutButton' onClick={() => handleLogout()}>
            Cerrar sesión
          </button>
        </div>
      )}

      <br />

      <Link to='/' style={{ color: 'white' }}>
        <FaStore />
        Dashbaord
      </Link>
      <Link to='/restaurants' style={{ color: 'white' }}>
        <FaStore />
        Restaurantes
      </Link>
      <Link to='/orders' style={{ color: 'white' }}>
        <FaStore />
        Ordenes
      </Link>
    </nav>
  );
};

export default Navigation;
