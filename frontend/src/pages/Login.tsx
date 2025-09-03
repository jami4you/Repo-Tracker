// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Login = ({ setToken }: { setToken: (token: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !password) return alert('Please fill out all fields');
    setLoading(true);

    try {
      const res = await API.post('/auth/login', { email, password });
      setToken(res.data.token);
      navigate('/search'); // Redirect after login
    } catch (err: any) {
      alert(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
