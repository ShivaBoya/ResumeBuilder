import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ResumeRenderer from "../components/Renderer/ResumeRenderer";
import { Save, Eye, Edit2, Plus, ArrowLeft, Grid } from "lucide-react";
import { BASE_URL } from "../utils/contants";

// DnD Kit
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from "../components/Editor/SortableItem";
import SectionEditor from "../components/Editor/SectionEditor";
import AddContentModal from "../components/Editor/AddContentModal";
import * as Icons from "lucide-react";

// Helper to resolve icon string to component
const getIcon = (name) => Icons[name] || Icons.FileText;

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // UI State
  const [activeTab, setActiveTab] = useState("edit");
  const [activeSectionId, setActiveSectionId] = useState("personal");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Metadata State
  const [metadata, setMetadata] = useState({
    sections: {},
    templates: {},
    themes: {}
  });

  // Resume Data State
  const [resume, setResume] = useState({
    templateId: "modern",
    themeId: "blue",
    meta: { title: "Untitled Resume" },
    sectionsOrder: ["personal"],
    sectionsData: { personal: {} }
  });

  const token = localStorage.getItem("accessToken");

  // Sensors for DnD
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // 1. Fetch Metadata & Resume
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parallel fetch
        const [sectionsRes, templatesRes, themesRes] = await Promise.all([
          axios.get(`${BASE_URL}/users/config/sections`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${BASE_URL}/users/config/templates`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${BASE_URL}/users/config/themes`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setMetadata({
          sections: sectionsRes.data || {},
          templates: templatesRes.data || {},
          themes: themesRes.data || {}
        });

        if (id) {
          const res = await axios.get(`${BASE_URL}/Resume/${id}`, { headers: { Authorization: `Bearer ${token}` } });
          if (res.data?.resume) {
            // Normalize Legacy Data
            let normalizedSections = { ...(res.data.resume.sectionsData || prev.sectionsData) };

            // Fix Skills: Convert Object { "Frontend": ["React"] } -> Array [{ category: "Frontend", skillName: ["React"] }]
            if (normalizedSections.skills && !Array.isArray(normalizedSections.skills) && typeof normalizedSections.skills === 'object') {
              normalizedSections.skills = Object.entries(normalizedSections.skills).map(([category, skills]) => ({
                id: Date.now() + Math.random(),
                category,
                skillName: Array.isArray(skills) ? skills : [skills]
              }));
            }

            setResume(prev => ({
              ...prev,
              ...res.data.resume,
              sectionsData: normalizedSections,
              sectionsOrder: res.data.resume.sectionsOrder || prev.sectionsOrder
            }));
          }
        } else {
          // Check LocalStorage for draft if creating new
          const savedDraft = localStorage.getItem("resumeDraft");
          if (savedDraft) {
            try {
              const parsed = JSON.parse(savedDraft);
              setResume(parsed);
              toast.info("Restored your unsaved draft");
            } catch (e) {
              console.error("Draft parse error", e);
            }
          }
        }
      } catch (err) {
        console.error(err);
        if (!id) toast.info("Started new resume");
        else toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  // Auto-Save Draft to LocalStorage
  useEffect(() => {
    if (!loading && !id) { // Only auto-save local draft if not editing a saved DB resume (avoid overwriting server data logic locally purely)
      // Actually, safer to always save draft as backup
      localStorage.setItem("resumeDraft", JSON.stringify(resume));
    }
  }, [resume, loading, id]);


  // Handlers
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setResume((prev) => {
        const oldIndex = prev.sectionsOrder.indexOf(active.id);
        const newIndex = prev.sectionsOrder.indexOf(over.id);
        return {
          ...prev,
          sectionsOrder: arrayMove(prev.sectionsOrder, oldIndex, newIndex),
        };
      });
    }
  };

  const handleAddSection = (sectionId) => {
    if (!resume.sectionsOrder.includes(sectionId)) {
      setResume(prev => ({
        ...prev,
        sectionsOrder: [...prev.sectionsOrder, sectionId],
        sectionsData: {
          ...prev.sectionsData,
          [sectionId]: prev.sectionsData[sectionId] || (metadata.sections[sectionId]?.repeatable ? [] : {})
        }
      }));
      setActiveSectionId(sectionId);
      toast.success("Section added");
    } else {
      // If repeatable and already exists, we might want to allow multiples in future or just scroll to it
      setActiveSectionId(sectionId);
      toast.info("Section already exists");
    }
  };

  const handleRemoveSection = (sectionId) => {
    if (confirm("Remove this section from your resume? Data will be preserved in background.")) {
      setResume(prev => ({
        ...prev,
        sectionsOrder: prev.sectionsOrder.filter(id => id !== sectionId)
      }));
      if (activeSectionId === sectionId) setActiveSectionId('personal');
    }
  };

  const handleDataChange = (newData) => {
    setResume(prev => ({
      ...prev,
      sectionsData: {
        ...prev.sectionsData,
        [activeSectionId]: newData
      }
    }));
  };

  const handleSave = async () => {
    try {
      const url = id ? `${BASE_URL}/Resume/update/${id}` : `${BASE_URL}/Resume/create`;
      const method = id ? "put" : "post";
      const res = await axios({ method, url, data: resume, headers: { Authorization: `Bearer ${token}` } });
      toast.success("Saved!");
      if (!id && res.data.resume?._id) navigate(`/resume-builder/${res.data.resume._id}`, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center animate-pulse">Loading Engine...</div>;

  // Derived State
  const activeSchema = metadata.sections[activeSectionId];
  const availableSectionsList = Object.values(metadata.sections);

  const templatesList = Object.values(metadata.templates);
  const themesList = Object.values(metadata.themes);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-gray-100 flex flex-col h-screen overflow-hidden font-sans">

      <AddContentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        availableSections={availableSectionsList}
        onAdd={handleAddSection}
        usedSectionIds={resume.sectionsOrder}
      />

      {/* Top Toolbar */}
      <header className="h-16 bg-white dark:bg-slate-800 border-b dark:border-slate-700 flex items-center px-4 justify-between shrink-0 z-20 shadow-sm relative">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/home')} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"><ArrowLeft size={20} /></button>
          <input
            value={resume.meta.title}
            onChange={e => setResume(p => ({ ...p, meta: { ...p.meta, title: e.target.value } }))}
            className="bg-transparent font-bold text-lg outline-none w-40 md:w-64 placeholder-gray-400"
            placeholder="Resume Title"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Template Selector */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
            <select
              value={resume.templateId}
              onChange={e => setResume(p => ({ ...p, templateId: e.target.value }))}
              className="bg-transparent text-sm font-medium outline-none cursor-pointer px-2"
            >
              {templatesList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          {/* Theme Selector */}
          <div className="hidden md:flex gap-1">
            {themesList.slice(0, 5).map(t => (
              <button
                key={t.id}
                onClick={() => setResume(p => ({ ...p, themeId: t.id }))}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${resume.themeId === t.id ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-105'}`}
                style={{ backgroundColor: t.vars?.['--primary'] || '#000' }}
                title={t.label}
              />
            ))}
          </div>

          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-blue-500/20 transition-all">
            <Save size={16} /> <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* 1. Sidebar: Section List (Sortable) */}
        <aside className={`w-80 bg-white dark:bg-slate-800/50 border-r dark:border-slate-700 flex flex-col z-10 transition-transform ${activeTab === 'preview' ? '-translate-x-full absolute lg:relative lg:translate-x-0' : 'translate-x-0'}`}>

          <div className="p-4 border-b dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Structure</h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline flex items-center gap-1"
            >
              <Plus size={14} /> Add Section
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={resume.sectionsOrder} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {resume.sectionsOrder.map(secId => {
                    const config = metadata.sections[secId];
                    if (!config) return null; // Logic to handle missing config if any
                    return (
                      <SortableItem
                        key={secId}
                        id={secId}
                        label={config.label}
                        icon={getIcon(config.icon)}
                        isActive={activeSectionId === secId}
                        onClick={() => setActiveSectionId(secId)}
                        onDelete={config.repeatable ? () => handleRemoveSection(secId) : undefined}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Grid size={16} /> Add Content
            </button>
          </div>
        </aside>

        {/* 2. Middle: Content Editor */}
        <main className={`flex-1 bg-gray-50 dark:bg-slate-900 overflow-y-auto relative custom-scrollbar flex flex-col ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="flex-1 max-w-3xl w-full mx-auto py-8 px-6">
            {activeSchema ? (
              <div className="bg-white dark:bg-slate-800 shadow-sm border dark:border-slate-700 rounded-2xl min-h-[500px]">
                <SectionEditor
                  sectionId={activeSectionId}
                  schema={activeSchema}
                  data={resume.sectionsData[activeSectionId]}
                  onChange={handleDataChange}
                />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <p>Select a section to edit</p>
              </div>
            )}
          </div>
        </main>

        {/* 3. Right: Live Preview */}
        <aside className={`w-[45%] bg-zinc-200 dark:bg-zinc-950 border-l dark:border-slate-700 relative overflow-hidden flex flex-col ${activeTab === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-3 bg-white dark:bg-slate-800 border-b dark:border-slate-700 flex justify-between items-center text-xs px-4 shadow-sm z-10">
            <span className="font-bold opacity-60">Live Preview</span>
            <div className="flex gap-3">
              <button className="hover:text-blue-600 transition-colors font-medium">PDF</button>
              <button className="hover:text-blue-600 transition-colors font-medium" onClick={() => window.print()}>Print</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8 flex justify-center custom-scrollbar">
            <div className="resume-scale-wrapper transform origin-top w-full max-w-[210mm] shadow-2xl transition-all duration-300">
              <ResumeRenderer
                templateId={resume.templateId}
                themeId={resume.themeId}
                data={resume}
                templatesConfig={metadata.templates}
                themesConfig={metadata.themes}
              />
            </div>
          </div>
        </aside>

        {/* Mobile Tab Switcher */}
        <div className="fixed bottom-6 right-6 lg:hidden z-50">
          <button
            onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
            className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition"
          >
            {activeTab === 'edit' ? <Eye /> : <Edit2 />}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResumeBuilder;
