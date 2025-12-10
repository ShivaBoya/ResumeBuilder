import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, FileText, Trash2, Edit, Download, Send, Calendar } from "lucide-react";
import { BASE_URL } from "../utils/contants";
import ResumeRenderer from "../components/Renderer/ResumeRenderer";

const MyResume = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(true);

  // Metadata State
  const [metadata, setMetadata] = useState({
    templates: {},
    themes: {}
  });

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumesRes, templatesRes, themesRes] = await Promise.all([
          axios.get(`${BASE_URL}/Resume/myresumes`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${BASE_URL}/users/config/templates`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${BASE_URL}/users/config/themes`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const fetchedResumes = resumesRes.data.resumes || [];
        setResumes(fetchedResumes);
        if (fetchedResumes.length > 0) {
          setSelectedResume(fetchedResumes[0]);
        }

        setMetadata({
          templates: templatesRes.data || {},
          themes: themesRes.data || {}
        });

      } catch (err) {
        console.error(err);
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token, refreshToken]);

  const handleDownloadPDF = async () => {
    if (!selectedResume) return;

    if (selectedResume.hasDownloadedResume) {
      toast.info("⚠ You have already downloaded once. Redirecting to premium...");
      setTimeout(() => navigate("/premium"), 2000);
      return;
    }

    setIsDownloading(true);

    try {
      const content = document.getElementById("resume-preview");
      if (!content) return;

      const imgData = await toPng(content, {
        cacheBust: true,
        skipFonts: true,
        pixelRatio: 2,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = imgData;

      img.onload = async () => {
        const imgHeight = (img.height * pdfWidth) / img.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(img, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(img, "PNG", 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save(`${selectedResume.meta?.title || "resume"}.pdf`);

        await axios.post(
          `${BASE_URL}/resume/markDownloaded`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("Resume downloaded successfully!");
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download resume!");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!selectedResume) return;
    setIsSending(true);
    try {
      await axios.get(`${BASE_URL}/Resume/send/email?id=${selectedResume._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("📧 Resume sent via email successfully!");
    } catch (err) {
      console.error("Error sending resume email:", err);
      toast.error(err.response?.data?.message || "Failed to send resume via email");
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (resumeId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axios.delete(`${BASE_URL}/Resume/delete/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedList = resumes.filter(r => r._id !== resumeId);
      setResumes(updatedList);

      if (selectedResume?._id === resumeId) {
        setSelectedResume(updatedList.length > 0 ? updatedList[0] : null);
      }
      toast.success("Resume deleted.");
    } catch (err) {
      toast.error("Failed to delete resume.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy">
        <div className="glass-card p-8 text-white text-xl font-bold animate-pulse">
          Loading your profiles...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Panel: Resume List */}
          <div className="md:w-1/3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Resumes</h2>
              <button
                onClick={() => navigate('/templates')}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg hover:shadow-blue-500/50 transition-all"
                title="Create New Resume"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
              {resumes.length === 0 ? (
                <div className="text-center p-8 glass-card border-dashed border-2 border-gray-300">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No resumes yet.</p>
                  <button
                    onClick={() => navigate('/templates')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Create your first one!
                  </button>
                </div>
              ) : (
                resumes.map((resume) => (
                  <div
                    key={resume._id}
                    onClick={() => setSelectedResume(resume)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedResume?._id === resume._id
                      ? "bg-white dark:bg-slate-800 border-blue-500 shadow-lg ring-2 ring-blue-500/20"
                      : "bg-white/50 dark:bg-slate-800/50 border-transparent hover:bg-white hover:shadow-md hover:shadow-indigo-500/10"
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]">
                          {/* Robust Name Fallback */}
                          {resume.sectionsData?.personal?.fullName || resume.meta?.title || "Untitled"}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                          <Calendar size={12} />
                          Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDelete(resume._id, e)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Panel: Selected Resume Preview & Actions */}
          <div className="md:w-2/3">
            {selectedResume ? (
              <div className="space-y-6">
                {/* Action Bar */}
                <div className="flex flex-wrap gap-4 glass-card p-4 rounded-xl items-center justify-between">
                  <div>
                    <h2 className="font-bold text-xl text-slate-900 dark:text-white">
                      {selectedResume.sectionsData?.personal?.fullName || selectedResume.meta?.title || "My Resume"}
                    </h2>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/resume-builder/${selectedResume._id}`)}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-all"
                    >
                      <Edit size={18} /> Edit
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isDownloading}
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-all disabled:opacity-50"
                    >
                      <Download size={18} /> {isDownloading ? "..." : "PDF"}
                    </button>
                    <button
                      onClick={handleSendEmail}
                      disabled={isSending}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-all disabled:opacity-50"
                    >
                      <Send size={18} /> Email
                    </button>
                  </div>
                </div>

                {/* Preview Area */}
                <div className="glass-card p-4 sm:p-8 bg-white rounded-xl shadow-2xl relative overflow-hidden min-h-[600px] flex justify-center">
                  <div className="w-full max-w-[210mm] relative bg-white shadow-lg" id="resume-preview">
                    <ResumeRenderer
                      templateId={selectedResume.templateId}
                      themeId={selectedResume.themeId}
                      data={selectedResume}
                      templatesConfig={metadata.templates}
                      themesConfig={metadata.themes}
                    />
                  </div>
                </div>


              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 glass-card">
                <FileText size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">Select a resume to preview</p>
              </div>
            )}
          </div>

        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default MyResume;
