import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes, sharePaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.error("Paste deleted!");
  }

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-900 text-white">
      {/* Search Input */}
      <input
        className="p-3 rounded-full w-[80%] max-w-lg mt-2 bg-gray-800 text-white placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="search"
        placeholder="🔍 Search your pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display Pastes */}
      <div className="flex flex-col gap-5 mt-6 w-full max-w-2xl">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            return (
              <div
                key={paste?._id}
                className="border border-gray-700 p-4 rounded-xl bg-gray-800 shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
              >
                <h2 className="text-xl font-semibold mb-2">{paste.title}</h2>
                <p className="text-gray-300 mb-3">{paste.content}</p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <Link
                    to={`/?pasteId=${paste?._id}`}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    ✏ Edit
                  </Link>
                  <Link
                    to={`/pastes/${paste?._id}`}
                    className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    👀 View
                  </Link>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    ❌ Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Copied to clipboard!');
                    }}
                    className="px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => dispatch(sharePaste(paste?._id))}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-300"
                  >
                    🔗 Share
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  🕒 {new Date(paste.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center mt-5">No pastes found. Try adding some!</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
