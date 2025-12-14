"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🏔️ Trek Planner
        </Link>
        <ul className="navbar-nav">
          <li>
            <Link to="/treks" className="navbar-link">
              Treks
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/treks/add" className="navbar-link">
                  Add Trek
                </Link>
              </li>
              <li>
                <span className="navbar-link">Hello, {user.name}</span>
              </li>
              <li>
                <button onClick={logout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="navbar-link">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
