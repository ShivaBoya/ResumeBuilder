import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code2, 
  FileText,
  Plus,
  Trash2,
  Save,
  Eye,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Calendar,
  Star,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Preview from "./Preview";

const BASE_URL = "http://localhost:3000";

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
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      { institution: "", degree: "", startDate: "", endDate: "", grade: "" },
    ],
    skills: [""],
    certifications: [{ name: "", issuer: "", year: "" }],
    projects: [
      {
        title: "",
        description: "",
        techStack: [""],
        githublink: "",
        collaborators: [],
      },
    ],
    coverLetter: { title: "", content: "" },
    theme: { font: "Arial", color: "#000000", layout: "classic" },
    versions: [],
  });
  
  const [isExisting, setIsExisting] = useState(false);
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [completionProgress, setCompletionProgress] = useState(0);

  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // Calculate completion progress
  useEffect(() => {
    let totalFields = 0;
    let completedFields = 0;

    // Personal info
    Object.values(resumeData.personalInfo).forEach(value => {
      totalFields++;
      if (value.trim()) completedFields++;
    });

    // Work experience
    resumeData.workExperience.forEach(exp => {
      Object.values(exp).forEach(value => {
        totalFields++;
        if (value.trim()) completedFields++;
      });
    });

    // Education
    resumeData.education.forEach(edu => {
      Object.values(edu).forEach(value => {
        totalFields++;
        if (value.trim()) completedFields++;
      });
    });

    // Skills
    resumeData.skills.forEach(skill => {
      totalFields++;
      if (skill.trim()) completedFields++;
    });

    // Certifications
    resumeData.certifications.forEach(cert => {
      Object.values(cert).forEach(value => {
        totalFields++;
        if (value.trim()) completedFields++;
      });
    });

    // Projects
    resumeData.projects.forEach(proj => {
      Object.entries(proj).forEach(([key, value]) => {
        if (key === 'techStack') {
          totalFields++;
          if (value.length > 0 && value[0].trim()) completedFields++;
        } else if (key !== 'collaborators') {
          totalFields++;
          if (value.trim()) completedFields++;
        }
      });
    });

    // Cover letter
    totalFields += 2;
    if (resumeData.coverLetter.title.trim()) completedFields++;
    if (resumeData.coverLetter.content.trim()) completedFields++;

    setCompletionProgress(Math.round((completedFields / totalFields) * 100));
  }, [resumeData]);

  // Fetch existing resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(BASE_URL + "/resume/getresume", {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: `Refresh ${refreshToken}`,
          },
        });
        if (res.data?.resume) {
          setResumeData(res.data.resume);
          setIsExisting(true);
        }
      } catch (error) {
        console.log("No existing resume, creating new.",error);
      }
    };
    
    if (token) {
      fetchResume();
    }
  }, [token, refreshToken]);

  const handleChange = (section, field, value, index = null) => {
    if (Array.isArray(resumeData[section]) && index !== null) {
      const updatedArray = [...resumeData[section]];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      setResumeData({ ...resumeData, [section]: updatedArray });
    } else if (typeof resumeData[section] === 'object' && !Array.isArray(resumeData[section])) {
      setResumeData({
        ...resumeData,
        [section]: { ...resumeData[section], [field]: value },
      });
    }
  };

  const handleAdd = (section, newItem) => {
    if (Array.isArray(resumeData[section])) {
      setResumeData({
        ...resumeData,
        [section]: [...resumeData[section], newItem],
      });
    }
  };

  const handleRemove = (section, index) => {
    if (Array.isArray(resumeData[section])) {
      const updatedArray = [...resumeData[section]];
      updatedArray.splice(index, 1);
      setResumeData({ ...resumeData, [section]: updatedArray });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = isExisting
        ? BASE_URL + "/resume/update"
        : BASE_URL + "/resume/create";

      const res = await axios({
        method: isExisting ? "put" : "post",
        url,
        data: resumeData,
        headers: {
          Authorization: `Bearer ${token}`,
          RefreshToken: `Refresh ${refreshToken}`,
        },
      });

      const newAccessToken = res.headers["new-access-token"];
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
      }

      // Show success message
      alert("Resume saved successfully!");
      
      setTimeout(() => {
        navigate("/my-resumes");
      }, 1500);
    } catch (error) {
      console.error("Error saving resume:", error);
      alert(error.response?.data?.message || "Failed to save resume. Please try again.");
    }
  };

  const getIconForField = (field) => {
    switch (field) {
      case 'email': return Mail;
      case 'phone': return Phone;
      case 'address': return MapPin;
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      default: return User;
    }
  };

  const sections = [
    { id: "personalInfo", title: "Personal Information", icon: User, color: "bg-blue-500" },
    { id: "workExperience", title: "Work Experience", icon: Briefcase, color: "bg-green-500" },
    { id: "education", title: "Education", icon: GraduationCap, color: "bg-purple-500" },
    { id: "skills", title: "Skills & Expertise", icon: Code2, color: "bg-orange-500" },
    { id: "certifications", title: "Certifications", icon: Award, color: "bg-red-500" },
    { id: "projects", title: "Projects", icon: Code2, color: "bg-indigo-500" },
    { id: "coverLetter", title: "Cover Letter", icon: FileText, color: "bg-pink-500" },
  ];

  const SectionCard = ({ title, icon: Icon, children, isActive, color }) => (
    <div className={`relative overflow-hidden rounded-xl border transition-all duration-500 transform hover:scale-[1.02] ${
      isActive 
        ? 'border-blue-500 shadow-2xl shadow-blue-500/20 bg-gradient-to-br from-white to-blue-50' 
        : 'border-gray-200 shadow-lg hover:shadow-xl bg-white hover:bg-gray-50'
    }`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${color} transition-all duration-300`}></div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={`h-6 w-6 text-gray-700`} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {isActive && (
            <div className="ml-auto">
              <CheckCircle2 className="h-5 w-5 text-green-500 animate-pulse" />
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header with Progress */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Resume Builder
              </h1>
              <p className="text-gray-600 mt-1">Create your professional resume</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Progress:</span>
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out"
                    style={{ width: `${completionProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-green-600">{completionProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Resume Form */}
          <div className="space-y-6">
            {/* Section Navigation */}
            <div className="bg-white rounded-xl p-4 shadow-lg border">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Navigation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <section.icon className="h-4 w-4" />
                    <span className="hidden sm:block">{section.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <SectionCard 
                title="Personal Information" 
                icon={User} 
                isActive={activeSection === "personalInfo"}
                color="bg-blue-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(resumeData.personalInfo).map(([key, value]) => {
                    const IconComponent = getIconForField(key);
                    return (
                      <div key={key} className="relative group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <div className="relative">
                          <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <input
                            type={key === 'email' ? 'email' : 'text'}
                            placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                            value={value}
                            onChange={(e) =>
                              handleChange("personalInfo", key, e.target.value)
                            }
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 group-hover:shadow-md"
                            onFocus={() => setActiveSection("personalInfo")}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>

              {/* Work Experience */}
              <SectionCard 
                title="Work Experience" 
                icon={Briefcase} 
                isActive={activeSection === "workExperience"}
                color="bg-green-500"
              >
                <div className="space-y-4">
                  {resumeData.workExperience.map((exp, idx) => (
                    <div key={idx} className="relative p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-all duration-300 bg-gradient-to-r from-green-50 to-transparent">
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) =>
                              handleChange("workExperience", "company", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("workExperience")}
                          />
                        </div>
                        <input
                          placeholder="Position Title"
                          value={exp.position}
                          onChange={(e) =>
                            handleChange("workExperience", "position", e.target.value, idx)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          onFocus={() => setActiveSection("workExperience")}
                        />
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="date"
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) =>
                              handleChange("workExperience", "startDate", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("workExperience")}
                          />
                        </div>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="date"
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) =>
                              handleChange("workExperience", "endDate", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("workExperience")}
                          />
                        </div>
                      </div>
                      <textarea
                        placeholder="Job Description & Key Achievements"
                        value={exp.description}
                        onChange={(e) =>
                          handleChange("workExperience", "description", e.target.value, idx)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                        rows={3}
                        onFocus={() => setActiveSection("workExperience")}
                      />
                      {resumeData.workExperience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemove("workExperience", idx)}
                          className="mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-300 hover:scale-105"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
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
                    className="w-full px-4 py-3 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50 hover:border-green-400 transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:scale-105"
                  >
                    <Plus className="h-5 w-5" />
                    Add Work Experience
                  </button>
                </div>
              </SectionCard>

              {/* Education */}
              <SectionCard 
                title="Education" 
                icon={GraduationCap} 
                isActive={activeSection === "education"}
                color="bg-purple-500"
              >
                <div className="space-y-4">
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="relative p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-all duration-300 bg-gradient-to-r from-purple-50 to-transparent">
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            placeholder="Institution Name"
                            value={edu.institution}
                            onChange={(e) =>
                              handleChange("education", "institution", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("education")}
                          />
                        </div>
                        <input
                          placeholder="Degree & Major"
                          value={edu.degree}
                          onChange={(e) =>
                            handleChange("education", "degree", e.target.value, idx)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          onFocus={() => setActiveSection("education")}
                        />
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="date"
                            placeholder="Start Date"
                            value={edu.startDate}
                            onChange={(e) =>
                              handleChange("education", "startDate", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("education")}
                          />
                        </div>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="date"
                            placeholder="End Date"
                            value={edu.endDate}
                            onChange={(e) =>
                              handleChange("education", "endDate", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("education")}
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          placeholder="GPA or Grade (Optional)"
                          value={edu.grade}
                          onChange={(e) =>
                            handleChange("education", "grade", e.target.value, idx)
                          }
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          onFocus={() => setActiveSection("education")}
                        />
                      </div>
                      {resumeData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemove("education", idx)}
                          className="mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-300 hover:scale-105"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
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
                    className="w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:scale-105"
                  >
                    <Plus className="h-5 w-5" />
                    Add Education
                  </button>
                </div>
              </SectionCard>

              {/* Skills */}
              <SectionCard 
                title="Skills & Expertise" 
                icon={Code2} 
                isActive={activeSection === "skills"}
                color="bg-orange-500"
              >
                <div className="space-y-3">
                  {resumeData.skills.map((skill, idx) => (
                    <div key={idx} className="flex gap-2 group">
                      <div className="relative flex-1">
                        <Code2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        <input
                          placeholder="Enter a skill (e.g., JavaScript, Project Management, etc.)"
                          value={skill}
                          onChange={(e) => {
                            const updated = [...resumeData.skills];
                            updated[idx] = e.target.value;
                            setResumeData({ ...resumeData, skills: updated });
                          }}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-orange-300"
                          onFocus={() => setActiveSection("skills")}
                        />
                      </div>
                      {resumeData.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemove("skills", idx)}
                          className="px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-300 hover:scale-105"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAdd("skills", "")}
                    className="w-full px-4 py-3 border-2 border-dashed border-orange-300 rounded-lg text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:scale-105"
                  >
                    <Plus className="h-5 w-5" />
                    Add Skill
                  </button>
                </div>
                {resumeData.skills.some(skill => skill.trim()) && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm font-medium text-orange-800 mb-2">Preview:</p>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.filter(skill => skill.trim()).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full border border-orange-200 hover:bg-orange-200 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </SectionCard>

              {/* Certifications */}
              <SectionCard 
                title="Certifications" 
                icon={Award} 
                isActive={activeSection === "certifications"}
                color="bg-red-500"
              >
                <div className="space-y-4">
                  {resumeData.certifications.map((cert, idx) => (
                    <div key={idx} className="relative p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-400 transition-all duration-300 bg-gradient-to-r from-red-50 to-transparent">
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            placeholder="Certification Name"
                            value={cert.name}
                            onChange={(e) =>
                              handleChange("certifications", "name", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("certifications")}
                          />
                        </div>
                        <input
                          placeholder="Issuing Organization"
                          value={cert.issuer}
                          onChange={(e) =>
                            handleChange("certifications", "issuer", e.target.value, idx)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                          onFocus={() => setActiveSection("certifications")}
                        />
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            placeholder="Year"
                            value={cert.year}
                            onChange={(e) =>
                              handleChange("certifications", "year", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("certifications")}
                          />
                        </div>
                      </div>
                      {resumeData.certifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemove("certifications", idx)}
                          className="mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-300 hover:scale-105"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
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
                    className="w-full px-4 py-3 border-2 border-dashed border-red-300 rounded-lg text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:scale-105"
                  >
                    <Plus className="h-5 w-5" />
                    Add Certification
                  </button>
                </div>
              </SectionCard>

              {/* Projects */}
              <SectionCard 
                title="Projects" 
                icon={Code2} 
                isActive={activeSection === "projects"}
                color="bg-indigo-500"
              >
                <div className="space-y-4">
                  {resumeData.projects.map((proj, idx) => (
                    <div key={idx} className="relative p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 transition-all duration-300 bg-gradient-to-r from-indigo-50 to-transparent">
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="relative">
                          <Code2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            placeholder="Project Title"
                            value={proj.title}
                            onChange={(e) =>
                              handleChange("projects", "title", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("projects")}
                          />
                        </div>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            placeholder="GitHub Link (Optional)"
                            value={proj.githublink}
                            onChange={(e) =>
                              handleChange("projects", "githublink", e.target.value, idx)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            onFocus={() => setActiveSection("projects")}
                          />
                        </div>
                      </div>
                      <textarea
                        placeholder="Project Description"
                        value={proj.description}
                        onChange={(e) =>
                          handleChange("projects", "description", e.target.value, idx)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none mb-4"
                        rows={3}
                        onFocus={() => setActiveSection("projects")}
                      />
                      <input
                        placeholder="Technologies Used (comma separated: React, Node.js, MongoDB)"
                        value={proj.techStack.join(", ")}
                        onChange={(e) =>
                          handleChange(
                            "projects",
                            "techStack",
                            e.target.value.split(",").map((s) => s.trim()),
                            idx
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                        onFocus={() => setActiveSection("projects")}
                      />
                      {resumeData.projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemove("projects", idx)}
                          className="mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-300 hover:scale-105"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
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
                        githublink: "",
                        collaborators: [],
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:scale-105"
                  >
                    <Plus className="h-5 w-5" />
                    Add Project
                  </button>
                </div>
              </SectionCard>

              {/* Cover Letter */}
              <SectionCard 
                title="Cover Letter" 
                icon={FileText} 
                isActive={activeSection === "coverLetter"}
                color="bg-pink-500"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      placeholder="Cover Letter Title"
                      value={resumeData.coverLetter.title}
                      onChange={(e) =>
                        handleChange("coverLetter", "title", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      onFocus={() => setActiveSection("coverLetter")}
                    />
                  </div>
                  <textarea
                    placeholder="Cover Letter Content - Write a compelling introduction about yourself and why you're the perfect candidate..."
                    value={resumeData.coverLetter.content}
                    onChange={(e) =>
                      handleChange("coverLetter", "content", e.target.value)
                    }
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                    onFocus={() => setActiveSection("coverLetter")}
                  />
                </div>
              </SectionCard>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Save className="h-5 w-5" />
                  {isExisting ? "Update Resume" : "Save Resume"}
                  <ArrowRight className="h-5 w-5" />
                </button>
                
              </div>
            </form>
          </div>

          {/* Right: Live Preview */}
          <div className="sticky top-24 h-fit">
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
    </div>
  );
};

export default ResumeBuilder;