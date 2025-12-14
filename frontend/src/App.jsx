"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TrekList from "./pages/TrekList"
import AddTrek from "./pages/AddTrek"
import EditTrek from "./pages/EditTrek"
import Home from "./pages/Home"

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/treks" element={<TrekList />} />
        <Route
          path="/treks/add"
          element={
            <ProtectedRoute>
              <AddTrek />
            </ProtectedRoute>
          }
        />
        <Route
          path="/treks/edit/:id"
          element={
            <ProtectedRoute>
              <EditTrek />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
