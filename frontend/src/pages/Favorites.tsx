// src/pages/Favorites.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';



const Favorites = ({ token }: { token: string }) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    
    if (!token) return;
    
    API.get('/user/favorites', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setFavorites(res.data));
  }, [token]);
 
  const deleteFavorite = async (id: number) => {
    await API.delete(`/user/favorites/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFavorites(favorites.filter(f => f.id !== id));
  };
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Saved Repositories</h2>
  <div className="mb-4 flex gap-4">
      <button
        onClick={() => navigate('/search')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    
      >
        ← Back to Search
      </button>
  
      <button
        onClick={handleLogout}
        className=" text-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  <ul className="space-y-4">
    {favorites.map(fav => (
      <li
        key={fav.id}
        className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <p className="text-lg font-semibold text-blue-600">{fav.name}</p>
          <p className="text-sm text-gray-600">{fav.description}</p>
          <a
            href={fav.url}
            target="_blank"
            className="text-sm text-indigo-500 hover:underline"
            rel="noopener noreferrer"
          >
            Visit
          </a>
        </div>
        <button
          onClick={() => deleteFavorite(fav.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
</div>

  );
};

export default Favorites;

