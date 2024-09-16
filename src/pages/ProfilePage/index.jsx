import React, { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthContext/AuthContext";
import "./style.css";

const Index = () => {
  const { user, checkTokenValidity, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile_picture: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profile_picture: user.profile_picture || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const isValid = await checkTokenValidity();
    if (!isValid) {
      setError("Token is not valid. Please log in again.");
      return;
    }

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.status === true) {
        updateUser(formData); 
        setSuccess("Profile updated successfully!");
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while updating the profile");
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="profile-photo-section">
        <h2>{formData.name}</h2>
        <img
          src={formData.profile_picture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-photo"
        />
       
        <p className="upload-info">
          Upload a new avatar. Larger image will be resized automatically.
        </p>
        <p className="upload-info">Maximum upload size is 1 MB</p>
      
      </div>
      <div className="edit-form-section">
        <h2>Edit Profile</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile_picture">Profile Picture URL</label>
            <input
              type="text"
              id="profile_picture"
              name="profile_picture"
              value={formData.profile_picture}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="update-info-btn">
            Update Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
