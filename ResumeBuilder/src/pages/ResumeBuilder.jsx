
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Preview from "./Preview";

const BASE_URL = "http://localhost:3000";
const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
    },
    workExperience: [
      {
        id: generateId(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        id: generateId(),
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
        grade: "",
      },
    ],
    skills: [""],
    certifications: [{ id: generateId(), name: "", issuer: "", year: "" }],
    projects: [
      {
        id: generateId(),
        title: "",
        description: "",
        techStack: [""],
        githubLink: "",
        collaborators: [],
      },
    ],
    coverLetter: { title: "", content: "" },
    theme: { font: "Arial", color: "#000000", layout: "classic" },
  });

  const [isExisting, setIsExisting] = useState(false);
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // Fetch existing resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/resume/getresume`, {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: `Refresh ${refreshToken}`,
          },
        });
        if (res.data?.resume) {
          const data = res.data.resume;
          // Ensure arrays exist
          data.workExperience = (data.workExperience || []).map((w) => ({
            ...w,
            id: generateId(),
          }));
          data.education = (data.education || []).map((e) => ({
            ...e,
            id: generateId(),
          }));
          data.certifications = (data.certifications || []).map((c) => ({
            ...c,
            id: generateId(),
          }));
          data.projects = (data.projects || []).map((p) => ({
            ...p,
            id: generateId(),
          }));
          data.skills = data.skills || [];
          setResumeData(data);
          setIsExisting(true);
        }
      } catch (err) {
        console.log("No existing resume, creating new.", err);
      }
    };
    if (token) fetchResume();
  }, [token, refreshToken]);

  // Generic change handler
  const handleChange = (
    section,
    field,
    value,
    id = null,
    nestedIndex = null
  ) => {
    setResumeData((prev) => {
      if (Array.isArray(prev[section]) && id) {
        const updated = prev[section].map((item) =>
          item.id === id
            ? nestedIndex !== null
              ? {
                  ...item,
                  [field]: item[field].map((v, idx) =>
                    idx === nestedIndex ? value : v
                  ),
                }
              : { ...item, [field]: value }
            : item
        );
        return { ...prev, [section]: updated };
      } else if (section === "skills") {
        const updatedSkills = [...prev.skills];
        if (id !== null) updatedSkills[id] = value;
        return { ...prev, skills: updatedSkills };
      } else {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      }
    });
  };

  const handleAdd = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: generateId(), ...newItem }],
    }));
  };

  const handleRemove = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const handleAddSkill = () =>
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  const handleRemoveSkill = (idx) =>
    setResumeData((prev) => {
      const s = [...prev.skills];
      s.splice(idx, 1);
      return { ...prev, skills: s };
    });

  // Submit resume
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...resumeData,
        workExperience: resumeData.workExperience.map(
          ({ id, ...rest }) => rest
        ),
        education: resumeData.education.map(({ id, ...rest }) => rest),
        certifications: resumeData.certifications.map(
          ({ id, ...rest }) => rest
        ),
        projects: resumeData.projects.map(({ id, ...rest }) => rest),
      };
      const url = isExisting
        ? `${BASE_URL}/resume/update`
        : `${BASE_URL}/resume/create`;
      const method = isExisting ? "put" : "post";
      await axios({
        method,
        url,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          RefreshToken: `Refresh ${refreshToken}`,
        },
      });
      toast.success("✅ Resume saved successfully!");
      setIsExisting(true);
      navigate("/my-resumes");
    } catch (err) {
      console.error("Error saving resume:", err);
      toast.error(err.response?.data?.message || "Failed to save resume");
    }
  };

  const handleSendEmail = async () => {
    try {
      await axios.get(`${BASE_URL}/resume/send`, {
        headers: {
          Authorization: `Bearer ${token}`,
          RefreshToken: `Refresh ${refreshToken}`,
        },
      });
      toast.success("📧 Resume sent via email successfully!");
    } catch (err) {
      console.error("Error sending resume email:", err);
      toast.error(err.response?.data?.message || "Failed to send email");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your resume?")) return;
    try {
      await axios.delete(`${BASE_URL}/resume/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          RefreshToken: `Refresh ${refreshToken}`,
        },
      });
      toast.success("🗑️ Resume deleted!");
      setIsExisting(false);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting resume:", err);
      toast.error(err.response?.data?.message || "Failed to delete resume");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex gap-6">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-6">
          {/* Personal Info */}
          <div className="border p-4 rounded bg-blue-50">
            <h2 className="font-bold text-lg mb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(resumeData.personalInfo).map(([key, value]) => (
                <div key={key}>
                  <label className="block mb-1 capitalize">{key}</label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    placeholder={`Enter ${key}`}
                    value={value || ""}
                    onChange={(e) =>
                      handleChange("personalInfo", key, e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="border p-4 rounded bg-green-50">
            <h2 className="font-bold text-lg mb-2">Work Experience</h2>
            {resumeData.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4 p-2 border rounded space-y-2">
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleChange(
                      "workExperience",
                      "company",
                      e.target.value,
                      exp.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-500"
                />
                <input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) =>
                    handleChange(
                      "workExperience",
                      "position",
                      e.target.value,
                      exp.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-500"
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleChange(
                        "workExperience",
                        "startDate",
                        e.target.value,
                        exp.id
                      )
                    }
                    className="px-2 py-1 border rounded focus:ring-2 focus:ring-green-500 w-full"
                  />
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleChange(
                        "workExperience",
                        "endDate",
                        e.target.value,
                        exp.id
                      )
                    }
                    className="px-2 py-1 border rounded focus:ring-2 focus:ring-green-500 w-full"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) =>
                    handleChange(
                      "workExperience",
                      "description",
                      e.target.value,
                      exp.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
                {resumeData.workExperience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove("workExperience", exp.id)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleAdd("workExperience", {
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="px-4 py-2 border rounded bg-green-100 text-green-700"
            >
              Add Work Experience
            </button>
          </div>
          {/* Education */}
          <div className="border p-4 rounded bg-purple-50">
            <h2 className="font-bold text-lg mb-2">Education</h2>
            {resumeData.education.map((ed) => (
              <div key={ed.id} className="mb-4 p-2 border rounded space-y-2">
                <input
                  placeholder="Institution"
                  value={ed.institution}
                  onChange={(e) =>
                    handleChange(
                      "education",
                      "institution",
                      e.target.value,
                      ed.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                <input
                  placeholder="Degree"
                  value={ed.degree}
                  onChange={(e) =>
                    handleChange("education", "degree", e.target.value, ed.id)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={ed.startDate}
                    onChange={(e) =>
                      handleChange(
                        "education",
                        "startDate",
                        e.target.value,
                        ed.id
                      )
                    }
                    className="px-2 py-1 border rounded"
                  />
                  <input
                    type="date"
                    value={ed.endDate}
                    onChange={(e) =>
                      handleChange(
                        "education",
                        "endDate",
                        e.target.value,
                        ed.id
                      )
                    }
                    className="px-2 py-1 border rounded"
                  />
                </div>
                <input
                  placeholder="Grade"
                  value={ed.grade}
                  onChange={(e) =>
                    handleChange("education", "grade", e.target.value, ed.id)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                {resumeData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove("education", ed.id)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleAdd("education", {
                  institution: "",
                  degree: "",
                  startDate: "",
                  endDate: "",
                  grade: "",
                })
              }
              className="px-4 py-2 border rounded bg-purple-100 text-purple-700"
            >
              Add Education
            </button>
          </div>

          {/* Skills */}
          <div className="border p-4 rounded bg-yellow-50">
            <h2 className="font-bold text-lg mb-2">Skills</h2>
            {resumeData.skills.map((s, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  placeholder="Skill"
                  value={s}
                  onChange={(e) =>
                    handleChange("skills", null, e.target.value, idx)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                {resumeData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 border rounded bg-yellow-100 text-yellow-700"
            >
              Add Skill
            </button>
          </div>

          {/* Certifications */}
          <div className="border p-4 rounded bg-indigo-50">
            <h2 className="font-bold text-lg mb-2">Certifications</h2>
            {resumeData.certifications.map((cert) => (
              <div key={cert.id} className="mb-4 p-2 border rounded space-y-2">
                <input
                  placeholder="Name"
                  value={cert.name}
                  onChange={(e) =>
                    handleChange(
                      "certifications",
                      "name",
                      e.target.value,
                      cert.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                <input
                  placeholder="Issuer"
                  value={cert.issuer}
                  onChange={(e) =>
                    handleChange(
                      "certifications",
                      "issuer",
                      e.target.value,
                      cert.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                <input
                  placeholder="Year"
                  value={cert.year}
                  onChange={(e) =>
                    handleChange(
                      "certifications",
                      "year",
                      e.target.value,
                      cert.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                {resumeData.certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove("certifications", cert.id)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleAdd("certifications", { name: "", issuer: "", year: "" })
              }
              className="px-4 py-2 border rounded bg-indigo-100 text-indigo-700"
            >
              Add Certification
            </button>
          </div>

          {/* Projects */}
          <div className="border p-4 rounded bg-pink-50">
            <h2 className="font-bold text-lg mb-2">Projects</h2>
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="mb-4 p-2 border rounded space-y-2">
                <input
                  placeholder="Title"
                  value={proj.title}
                  onChange={(e) =>
                    handleChange("projects", "title", e.target.value, proj.id)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                <textarea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) =>
                    handleChange(
                      "projects",
                      "description",
                      e.target.value,
                      proj.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded"
                  rows={2}
                />
                <input
                  placeholder="Tech Stack (comma separated)"
                  value={proj.techStack.join(",")}
                  onChange={(e) =>
                    handleChange(
                      "projects",
                      "techStack",
                      e.target.value.split(","),
                      proj.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                <input
                  placeholder="Github Link"
                  value={proj.githubLink}
                  onChange={(e) =>
                    handleChange(
                      "projects",
                      "githubLink",
                      e.target.value,
                      proj.id
                    )
                  }
                  className="w-full px-2 py-1 border rounded"
                />
                {resumeData.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove("projects", proj.id)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleAdd("projects", {
                  title: "",
                  description: "",
                  techStack: [""],
                  githubLink: "",
                  collaborators: [],
                })
              }
              className="px-4 py-2 border rounded bg-pink-100 text-pink-700"
            >
              Add Project
            </button>
          </div>

          {/* Cover Letter */}
          <div className="border p-4 rounded bg-gray-50">
            <h2 className="font-bold text-lg mb-2">Cover Letter</h2>
            <input
              placeholder="Title"
              value={resumeData.coverLetter.title}
              onChange={(e) =>
                handleChange("coverLetter", "title", e.target.value)
              }
              className="w-full px-2 py-1 border rounded mb-2"
            />
            <textarea
              placeholder="Content"
              value={resumeData.coverLetter.content}
              onChange={(e) =>
                handleChange("coverLetter", "content", e.target.value)
              }
              className="w-full px-2 py-1 border rounded"
              rows={4}
            />
          </div>

          {/* Theme */}
          <div className="border p-4 rounded bg-gray-100">
            <h2 className="font-bold text-lg mb-2">Theme</h2>
            <input
              placeholder="Font"
              value={resumeData.theme.font}
              onChange={(e) => handleChange("theme", "font", e.target.value)}
              className="w-full px-2 py-1 border rounded mb-2"
            />
            <input
              type="color"
              value={resumeData.theme.color}
              onChange={(e) => handleChange("theme", "color", e.target.value)}
              className="w-full h-10 mb-2"
            />
            <select
              value={resumeData.theme.layout}
              onChange={(e) => handleChange("theme", "layout", e.target.value)}
              className="w-full px-2 py-1 border rounded"
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              {isExisting ? "Update Resume" : "Save Resume"}
            </button>
            {isExisting && (
              <>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="px-6 py-2 bg-green-600 text-white rounded"
                >
                  Send via Email
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded"
                >
                  Delete Resume
                </button>
              </>
            )}
          </div>
        </form>

        {/* Right: Live Preview */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24 h-fit mt-6 lg:mt-0">
          <div className="bg-white rounded-xl shadow-2xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Live Preview</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              <Preview resumeData={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
