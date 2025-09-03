// src/pages/Register.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom'
import API from '../api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      await API.post('/auth/register', { email, password });
      alert('Registered! Now log in.');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>

  <input
    type="email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    placeholder="Email"
    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <input
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    placeholder="Password"
    className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <button
    onClick={submit}
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
  >
    Register
  </button>
  <p className="mt-4 text-center text-sm text-gray-600">
        Do you have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
</div>

  );
};

export default Register;
