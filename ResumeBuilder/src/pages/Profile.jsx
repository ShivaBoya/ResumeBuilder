import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", username: "", profileId: "" });

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/profileview`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setFormData({
          name: response.data.name || "",
          username: response.data.username || "",
          profileId: response.data.profileId || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/profileedit`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message, { position: "top-center", autoClose: 3000 });
      setUser(response.data.data);
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Profile Details
      </h1>

      {user && (
        <div className="space-y-4">
          {editing ? (
            <>
              <div>
                <label className="text-gray-600 font-semibold">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Profile URL:</label>
                <input
                  type="text"
                  name="profileId"
                  value={formData.profileId}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="https://example.com/profile"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-gray-600 font-semibold">Name:</p>
                <p className="text-gray-900">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Username:</p>
                <p className="text-gray-900">{user.username}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Profile URL:</p>
                <p className="text-gray-900">{user.profileId || "Not set"}</p>
              </div>
            </>
          )}

          {user.email && (
            <div>
              <p className="text-gray-600 font-semibold">Email:</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
          )}

          {user.phone && (
            <div>
              <p className="text-gray-600 font-semibold">Phone:</p>
              <p className="text-gray-900">{user.phone}</p>
            </div>
          )}

          <div>
            <p className="text-gray-600 font-semibold">Joined On:</p>
            <p className="text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        {editing ? (
          <>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold transition-all"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Profile;
