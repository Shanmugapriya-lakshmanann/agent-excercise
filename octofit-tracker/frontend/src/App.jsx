import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg border-bottom bg-white">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/users">OctoFit Tracker</NavLink>
          <nav className="navbar-nav flex-row flex-wrap gap-2" aria-label="Primary navigation">
            {[
              ['users', 'Users'],
              ['activities', 'Activities'],
              ['teams', 'Teams'],
              ['leaderboard', 'Leaderboard'],
              ['workouts', 'Workouts'],
            ].map(([path, label]) => (
              <NavLink className="nav-link px-2" key={path} to={`/${path}`}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
