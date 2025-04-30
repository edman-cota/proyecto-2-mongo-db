import { Link } from 'react-router';
import { FaStore } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';

const Navigation = () => {
  return (
    <nav>
      <Link to='/restaurants' style={{ color: 'white' }}>
        <FaStore />
        Restaurantes
      </Link>
      <Link to='/menu-items' style={{ color: 'white' }}>
        <FaStore />
        Menú
      </Link>
    </nav>
  );
};

export default Navigation;
