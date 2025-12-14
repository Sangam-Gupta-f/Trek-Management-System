"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Home() {
  const { user } = useAuth()

  return (
    <div>
      <section className="hero">
        <h1 className="hero-title">Discover Your Next Adventure</h1>
        <p className="hero-subtitle">Plan and manage your trekking adventures with Trek Planner</p>
        <div className="hero-buttons">
          <Link to="/treks">
            <button className="btn btn-primary btn-large">Browse Treks</button>
          </Link>
          {user ? (
            <Link to="/treks/add">
              <button className="btn btn-outline btn-large">Add Trek</button>
            </Link>
          ) : (
            <Link to="/signup">
              <button className="btn btn-outline btn-large">Get Started</button>
            </Link>
          )}
        </div>
      </section>

      <div className="container">
        <div style={{ padding: "3rem 0", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--primary)" }}>Welcome to Trek Planner</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-light)", maxWidth: "600px", margin: "0 auto" }}>
            Your ultimate companion for planning and managing trekking adventures. Browse treks, create your own, and
            share your experiences with fellow adventurers.
          </p>
        </div>
      </div>
    </div>
  )
}
