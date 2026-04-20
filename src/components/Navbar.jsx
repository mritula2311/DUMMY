import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">Movie Assessment</div>
      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active" : "")}>Favorites</NavLink>
        <NavLink to="/stats" className={({ isActive }) => (isActive ? "active" : "")}>Stats</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;