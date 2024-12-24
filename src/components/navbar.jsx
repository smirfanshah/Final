import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyToDo</h1>
        <ul className="flex space-x-4">
          <li><a href="/login" className="hover:text-blue-400">Login</a></li>
          <li><a href="/tasks" className="hover:text-blue-400">Tasks</a></li> {/* Link to the tasks page */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
