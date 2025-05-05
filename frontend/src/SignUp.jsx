import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
        role,
      });
      alert('User registered successfully');
      // Puedes redirigir al login o a la página principal
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error registering user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <h2>Crear usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='authForm' onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Rol:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value='customer'>Cliente</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Signing Up...' : 'Crear usuario'}
        </button>
      </form>

      <button onClick={() => navigate(`/login`)}>Crear cuenta aqui</button>
    </div>
  );
};

export default SignUp;
