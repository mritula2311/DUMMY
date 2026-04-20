import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav aria-label="Main Navigation">
    <h1>Movie Wishlist</h1>
    <ul>
      <li>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active' : '')}>
          Favorites
        </NavLink>
      </li>
      <li>
        <NavLink to="/stats" className={({ isActive }) => (isActive ? 'active' : '')}>
          Stats
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
