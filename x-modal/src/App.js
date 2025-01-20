import React, { useState } from "react";
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
    if (!formData.username) {
      newErrors.username = "Username is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required.";
    } else if (new Date(formData.dob) > new Date()) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return false;
    }
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

      {/* Conditionally render the modal */}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
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
