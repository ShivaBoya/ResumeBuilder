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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy">
        <div className="text-white text-xl font-bold animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="glass-card p-8 bg-white/10 text-white text-lg font-semibold border border-red-400/50">
          ⚠️ {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-12 px-4 md:px-8 relative overflow-hidden">

      <div className="max-w-4xl mx-auto relative z-10 animate-fade-in-up">
        <div className="glass-card bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-3xl shadow-xl shadow-indigo-500/10 shadow-2xl overflow-hidden transition-all duration-300">
          {/* Header / Banner */}
          <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div className="relative -mt-20 mb-6 flex justify-center md:justify-start">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-white to-gray-200 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-6xl shadow-inner border-4 border-white dark:border-slate-700">
                  <span className="filter drop-shadow-md">👤</span>
                </div>
                {/* Edit Badge */}
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110"
                  >
                    ✏️
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{user.name}</h1>
                <p className="text-slate-600 dark:text-white/70 text-lg flex items-center gap-2 font-medium">
                  <span>@</span>{user.username}
                </p>
              </div>
              <div className="flex gap-3">
                {!editing && (
                  <button
                    className="bg-white hover:bg-gray-50 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white border border-gray-200 dark:border-white/20 px-6 py-2 rounded-xl font-semibold transition-all backdrop-blur-md shadow-sm"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-gray-50 dark:bg-black/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-200 dark:border-white/5 shadow-inner">
              {editing ? (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-slate-700 dark:text-white/80 text-sm font-bold mb-2 block ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 dark:text-white/80 text-sm font-bold mb-2 block ml-1">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-700 dark:text-white/80 text-sm font-bold mb-2 block ml-1">Profile URL</label>
                    <div className="relative">
                      <span className="absolute left-4 top-4 text-gray-400 dark:text-white/50">🔗</span>
                      <input
                        type="text"
                        name="profileId"
                        value={formData.profileId}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl p-4 pl-12 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                        placeholder="https://example.com/profile"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-white/10 mt-6">
                    <button
                      className="bg-white hover:bg-gray-50 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-sm border border-gray-200 dark:border-transparent"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-y-8 gap-x-12">
                  <div className="group">
                    <p className="text-slate-500 dark:text-white/50 text-xs font-bold mb-1 uppercase tracking-wider">Email Address</p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold border-b border-gray-200 dark:border-white/10 pb-2 group-hover:border-blue-500/30 transition-colors">
                      {user.email || "N/A"}
                    </p>
                  </div>

                  <div className="group">
                    <p className="text-slate-500 dark:text-white/50 text-xs font-bold mb-1 uppercase tracking-wider">Phone Number</p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold border-b border-gray-200 dark:border-white/10 pb-2 group-hover:border-blue-500/30 transition-colors">
                      {user.phone || "Not provided"}
                    </p>
                  </div>

                  <div className="group md:col-span-2">
                    <p className="text-slate-500 dark:text-white/50 text-xs font-bold mb-1 uppercase tracking-wider">Profile URL</p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold border-b border-gray-200 dark:border-white/10 pb-2 group-hover:border-blue-500/30 transition-colors break-all">
                      {user.profileId ? (
                        <a href={user.profileId} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 hover:underline">
                          {user.profileId}
                        </a>
                      ) : "Not set"}
                    </p>
                  </div>

                  <div className="group">
                    <p className="text-slate-500 dark:text-white/50 text-xs font-bold mb-1 uppercase tracking-wider">Member Since</p>
                    <p className="text-slate-900 dark:text-white text-lg font-bold">
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Profile;
