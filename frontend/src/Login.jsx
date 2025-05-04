import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Guardar el token en el localStorage o en un estado global
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.token); // Llamar a la función onLogin (pasa el token a un estado global)
      alert('Login successful');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
