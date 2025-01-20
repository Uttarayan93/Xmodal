import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    // ... rest of your validation logic
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsModalOpen(false);
      setFormData({
        username: "",
        email: "",
        phone: "",
        dob: "",
      });
      setErrors({});
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && event.target.className !== "modal-content") {
        closeModal();
      }
    };

    // Add event listener on modal open
    document.addEventListener("click", handleClickOutside);

    // Remove event listener on modal close
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isModalOpen]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>User Details Modal</h1>
      <button
        style={{
          backgroundColor: "#6687f2",
          padding: "12px 20px",
          color: "white",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "15px",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Open Form
      </button>

      {/* Render modal only when isModalOpen is true */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div>
                <label>Email Address:</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <label>Phone Number:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p>{errors.phone}</p>}
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <p>{errors.dob}</p>}
              </div>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
