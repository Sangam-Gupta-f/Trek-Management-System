"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function TrekList() {
  const [treks, setTreks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTreks();
  }, [currentPage]);

  const fetchTreks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/treks?page=${currentPage}`
      );
      setTreks(response.data.treks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching treks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trek?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/treks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTreks();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to delete trek");
    }
  };

  const handleEdit = (id) => {
    navigate(`/treks/edit/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading treks...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Explore Treks</h1>
        {user && (
          <Link to="/treks/add">
            <button className="btn btn-primary">Add New Trek</button>
          </Link>
        )}
      </div>

      {treks?.length === 0 ? (
        <div className="empty-state">
          <h3>No treks found</h3>
          <p>Be the first to add a trek!</p>
        </div>
      ) : (
        <>
          <div className="trek-grid">
            {treks.map((trek) => (
              <div key={trek.id} className="trek-card">
                <img
                  src={
                    trek.images[0] ||
                    "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/a9/99/ac.jpg"
                  }
                  alt={trek.name}
                  className="trek-image"
                />
                <div className="trek-content">
                  <h3 className="trek-name">{trek.name}</h3>
                  <p className="trek-location">{trek.location}</p>
                  {trek.description && (
                    <p
                      style={{
                        color: "var(--text-light)",
                        marginBottom: "1rem",
                      }}
                    >
                      {trek.description.substring(0, 100)}
                      {trek.description.length > 100 ? "..." : ""}
                    </p>
                  )}
                  <div className="trek-meta">
                    <span
                      className={`trek-difficulty difficulty-${trek.difficulty.toLowerCase()}`}
                    >
                      {trek.difficulty}
                    </span>
                    <span className="trek-price">${trek.price}</span>
                  </div>
                  {user && trek.userId === user.id && (
                    <div className="trek-actions">
                      <button
                        onClick={() => handleEdit(trek._id)}
                        className="btn btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(trek._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
