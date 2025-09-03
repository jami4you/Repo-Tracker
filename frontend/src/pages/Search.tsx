import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  language: string;
}

interface Props {
  token: string;
}

const Search = ({ token }: Props) => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const searchRepos = async () => {
    setLoading(true);
    setError('');
    setRepos([]);
    try {
      const res = await axios.get<Repo[]>(`https://api.github.com/users/${username}/repos`);
      setRepos(res.data);
    } catch (err: any) {
      setError('User not found or GitHub API error');
    } finally {
      setLoading(false);
    }
  };

  const saveRepo = async (repo: Repo) => {
    console.log('Saving with token:', token);
 
    try {
      await axios.post(
        'http://localhost:5000/user/favorites',
        {
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Repository saved!');
    } catch (err: any) {
        const message = err.response?.data?.message || 'User not found or GitHub API error';
        setError(message);
      }
      
  };
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT
    navigate('/login'); // Redirect to login page
  };
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Search GitHub Repositories</h2>
  <div className="mb-4 flex gap-4">
      <Link
        to="/favorites"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ★ View Favorites
      </Link>
      <button
        onClick={handleLogout}
        className="text-red px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    
    </div>
  <div className="flex gap-4 mb-4">
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter GitHub username"
      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      onClick={searchRepos}
      disabled={!username || loading}
      className={`px-4 py-2 rounded-md text-white transition ${
        !username || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {loading ? 'Searching...' : 'Search'}
    </button>
  </div>

  {error && <p className="text-red-500 mb-4">{error}</p>}

  <ul className="space-y-6">
    {repos.map((repo) => (
      <li key={repo.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">{repo.name}</h3>
        <p className="text-gray-700">{repo.description}</p>
        <p className="text-sm text-gray-600 mt-1">
          ⭐ {repo.stargazers_count} | Language: {repo.language}
        </p>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm mt-1 inline-block"
        >
          View on GitHub
        </a>
        <button
          onClick={() => saveRepo(repo)}
          className="mt-2 block bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
        >
          Save to Favorites
        </button>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Search;
