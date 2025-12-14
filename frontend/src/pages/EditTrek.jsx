"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"

export default function EditTrek() {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    difficulty: "Moderate",
    price: "",
    description: "",
    images: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingTrek, setLoadingTrek] = useState(true)
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchTrek()
  }, [id])

  const fetchTrek = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/treks/${id}`)
      const trek = response.data
      setFormData({
        name: trek.name,
        location: trek.location,
        difficulty: trek.difficulty,
        price: trek.price.toString(),
        description: trek.description || "",
        images: trek.images.join(", "),
      })
    } catch (err) {
      setError("Failed to load trek")
    } finally {
      setLoadingTrek(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const images = formData.images
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url)

      await axios.put(
        `http://localhost:5000/treks/${id}`,
        {
          ...formData,
          images,
          price: Number.parseFloat(formData.price),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      navigate("/treks")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update trek")
    } finally {
      setLoading(false)
    }
  }

  if (loadingTrek) {
    return <div className="loading">Loading trek...</div>
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="page-title">Edit Trek</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Trek Name *</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location *</label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Difficulty *</label>
            <select
              name="difficulty"
              className="form-input"
              value={formData.difficulty}
              onChange={handleChange}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Price (USD) *</label>
            <input
              type="number"
              name="price"
              className="form-input"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URLs (comma-separated)</label>
            <input
              type="text"
              name="images"
              className="form-input"
              value={formData.images}
              onChange={handleChange}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Update Trek"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/treks")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
