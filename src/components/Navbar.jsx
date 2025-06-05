import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">

      <div className="text-xl font-bold text-blue-600">
        TaskFlow
      </div>

     
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-700">
          <span className="font-medium">{user.name}</span>
          <span className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded-full uppercase">
            {user.role}
          </span>
        </div>

        <button
          onClick={onLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
