import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

export default function App(){
  const navLinkClass = ({isActive}) => isActive ? 'nav-link active' : 'nav-link'

  return (
    <div className="container mt-4">
      <header className="app-header mb-3">
        <h1 className="app-title display-6">Octofit Tracker</h1>
        <small className="muted-small">Track activities, teams, leaderboards & workouts</small>
      </header>

      <nav className="mb-3">
        <ul className="nav nav-pills">
          <li className="nav-item"><NavLink to="/activities" className={navLinkClass}>Activities</NavLink></li>
          <li className="nav-item"><NavLink to="/workouts" className={navLinkClass}>Workouts</NavLink></li>
          <li className="nav-item"><NavLink to="/teams" className={navLinkClass}>Teams</NavLink></li>
          <li className="nav-item"><NavLink to="/leaderboards" className={navLinkClass}>Leaderboards</NavLink></li>
          <li className="nav-item"><NavLink to="/users" className={navLinkClass}>Users</NavLink></li>
        </ul>
      </nav>

      <div className="card">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<div className="lead">Choose a section from the menu.</div>} />
            <Route path="/activities" element={<Activities/>} />
            <Route path="/workouts" element={<Workouts/>} />
            <Route path="/teams" element={<Teams/>} />
            <Route path="/leaderboards" element={<Leaderboard/>} />
            <Route path="/users" element={<Users/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
