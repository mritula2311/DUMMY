import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import FavoritesPage from "../pages/FavoritesPage";
import HomePage from "../pages/HomePage";
import StatsPage from "../pages/StatsPage";

function AppRouter() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-wrap">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default AppRouter;