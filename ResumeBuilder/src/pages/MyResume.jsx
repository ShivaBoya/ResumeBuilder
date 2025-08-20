
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:3000";

const MyResume = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const [resume, setResume] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/resume/getresume`, {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: `Refresh ${refreshToken}`,
          },
        });
        setResume(res.data.resume);
      } catch (err) {
        console.error(err);
        toast.error(" Failed to fetch resume!");
      }
    };
    fetchResume();
  }, [token, refreshToken]);

  const handleDownloadPDF = async () => {
    if (!resume) return;

    if (resume.hasDownloadedResume) {
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

      const img = new Image();
      img.src = imgData;

      img.onload = async () => {
        const imgHeight = (img.height * pdfWidth) / img.width;
        pdf.addImage(img, "PNG", 0, 0, pdfWidth, imgHeight);
        pdf.save("resume.pdf");

        // Notify backend that user has downloaded
        await axios.post(
          `${BASE_URL}/resume/markDownloaded`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              RefreshToken: `Refresh ${refreshToken}`,
            },
          }
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
    setIsSending(true);
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
      toast.error(err.response?.data?.message || " Failed to send resume via email");
    } finally {
      setIsSending(false);
    }
  };

  if (!resume) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Resume Preview */}
      <div
        id="resume-preview"
        className="bg-white shadow-xl border rounded-lg p-8 text-gray-900 font-serif"
        style={{ lineHeight: "1.6" }}
      >
        <h1 className="text-3xl text-center font-bold text-green-800 mb-2">
          {resume.personalInfo.name}
        </h1>
        <div className="text-center text-sm text-gray-700 border-t border-b py-2 mb-4">
          <span>{resume.personalInfo.phone} | </span>
          <span>{resume.personalInfo.email} | </span>
          {resume.personalInfo.linkedin && <span>LinkedIn | </span>}
          {resume.personalInfo.github && <span>GitHub</span>}
        </div>

        {resume.coverLetter?.content && (
          <div className="mb-4">
            <h2 className="text-green-700 font-bold text-lg mb-1">Summary</h2>
            <p className="text-justify">{resume.coverLetter.content}</p>
          </div>
        )}

        {resume.skills?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-green-700 font-bold text-lg mb-1">Skills</h2>
            <ul className="list-disc ml-6">
              {resume.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {resume.education?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-green-700 font-bold text-lg mb-1">Education</h2>
            {resume.education.map((edu, idx) => (
              <p key={idx} className="mb-1">
                <strong>{edu.institution}</strong> - {edu.degree} (
                {edu.startDate} - {edu.endDate}) | CGPA: {edu.grade}
              </p>
            ))}
          </div>
        )}

        {resume.projects?.length > 0 && (
          <div>
            <h2 className="text-green-700 font-bold text-lg mb-1">Projects</h2>
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="mb-2">
                <p>
                  <strong>{proj.title}</strong>: {proj.description}
                </p>
                {proj.techStack?.length > 0 && (
                  <p className="text-sm">TechStack: {proj.techStack.join(", ")}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="px-6 py-2 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
        >
          {isDownloading ? "Downloading..." : "Download PDF"}
        </button>

        <button
          onClick={handleSendEmail}
          disabled={isSending}
          className="px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          {isSending ? "Sending..." : "Send via Email"}
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default MyResume;
