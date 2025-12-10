import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { toast } from "react-toastify";

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const [liveStats, setLiveStats] = useState({
    totalDownloads: 15234,
    activeUsers: 89,
    templatesUsed: 1247,
  });

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        totalDownloads: prev.totalDownloads + Math.floor(Math.random() * 5),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
        templatesUsed: prev.templatesUsed + Math.floor(Math.random() * 3),
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleUseTemplate = (templateId) => {
    navigate(`/resume-builder?templateId=${templateId}`);
  };

  const categories = [
    { id: "all", name: "All Templates", count: 24, icon: "📋" },
    { id: "modern", name: "Modern", count: 8, icon: "✨" },
    { id: "creative", name: "Creative", count: 6, icon: "🎨" },
    { id: "professional", name: "Professional", count: 5, icon: "💼" },
    { id: "minimal", name: "Minimal", count: 3, icon: "🎯" },
    { id: "academic", name: "Academic", count: 2, icon: "🎓" },
  ];

  const templates = [
    {
      id: 1,
      name: "Sky Professional",
      category: "modern",
      popularity: 98,
      downloads: 12543,
      rating: 4.9,
      preview:
        "https://img.freepik.com/free-psd/clean-modern-resume-portfolio-cv-template_120329-3603.jpg",
      color: "from-sky-400 to-sky-600",
      features: ["ATS Friendly", "Clean Layout", "Sky Blue Theme"],
      description: "Perfect for tech professionals with sky blue accent",
    },
    {
      id: 2,
      name: "Creative Sky",
      category: "creative",
      popularity: 95,
      downloads: 8932,
      rating: 4.8,
      preview:
        "https://template.canva.com/EAFzfwx_Qik/4/0/1131w-T9RPR4DPdiw.jpg",
      color: "from-sky-300 to-cyan-400",
      features: ["Portfolio Section", "Visual Elements", "Sky Gradients"],
      description: "Ideal for designers with beautiful sky colors",
    },
    {
      id: 3,
      name: "Executive Sky",
      category: "professional",
      popularity: 92,
      downloads: 15678,
      rating: 4.9,
      preview:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2PTPMtiiUFXh1xLpamP3euRKyYYKjnAGOYw&s",
      color: "from-sky-600 to-sky-800",
      features: ["Executive Summary", "Achievement Focus", "Sky Accents"],
      description: "For C-level executives with professional sky theme",
    },
    {
      id: 4,
      name: "Tech Sky",
      category: "modern",
      popularity: 89,
      downloads: 9876,
      rating: 4.7,
      preview:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwm7N7QxVqSHeNyONdm_fq-lO-l8VF_JrG1Q&s",
      color: "from-sky-500 to-blue-500",
      features: ["Skills Matrix", "Project Showcase", "Tech Stack"],
      description: "Perfect for software engineers and developers",
    },
    {
      id: 5,
      name: "Minimal Sky",
      category: "minimal",
      popularity: 87,
      downloads: 7234,
      rating: 4.6,
      preview:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTagQjhK66II_k0y4hrAa42uENETfX_fCDkJg&s",
      color: "from-sky-200 to-sky-400",
      features: ["Clean Typography", "Space Efficient", "Light Sky Theme"],
      description: "Minimalist design with soft sky blue accents",
    },
    {
      id: 6,
      name: "Academic Sky",
      category: "academic",
      popularity: 85,
      downloads: 4567,
      rating: 4.8,
      preview:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlw194F9YB_gRFEwjmK5HXHvjf2fvteYQkaQ&s",
      color: "from-sky-600 to-blue-700",
      features: ["Publication List", "Research Focus", "Academic Format"],
      description: "Designed for researchers and academics",
    },
    {
      id: 7,
      name: "Startup Sky",
      category: "creative",
      popularity: 91,
      downloads: 6789,
      rating: 4.7,
      preview:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwU3agh3srHBvfnps2V1K9xVddxPApjr1Mg&s",
      color: "from-sky-400 to-cyan-500",
      features: ["Startup Experience", "Leadership Focus", "Vision Statement"],
      description: "For entrepreneurs with innovative sky design",
    },
    {
      id: 8,
      name: "Sales Sky",
      category: "professional",
      popularity: 88,
      downloads: 8901,
      rating: 4.6,
      preview:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mxcOoFbgAGkuoqcpdAheI1t-5lJ7nw8tWg&s",
      color: "from-sky-500 to-sky-700",
      features: ["Achievement Metrics", "Sales Numbers", "Client Results"],
      description: "Optimized for sales professionals with sky theme",
    },
  ];

  const trendingTemplates = [
    { name: "Sky Professional", uses: "+23% this week", trend: "up" },
    { name: "Creative Sky", uses: "+18% this week", trend: "up" },
    { name: "Tech Sky", uses: "+15% this week", trend: "up" },
    { name: "Executive Sky", uses: "+12% this week", trend: "up" },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header Section */}
      <section className="relative overflow-hidden pt-20 pb-12">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-slide-down">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Choose Your Perfect
              <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-5xl md:text-7xl mt-2 filter drop-shadow-sm">
                Resume Template
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover professionally designed templates crafted by experts.
              ATS-friendly, fully customizable, and ready to impress.
            </p>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
            <div className="glass-card p-6 border border-border/50 text-center animate-scale-in bg-white dark:bg-slate-800/50 hover:shadow-lg transition-all">
              <div className="text-3xl font-bold text-foreground mb-2">
                {liveStats.totalDownloads.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
                Total Downloads
              </div>
              <div className="flex items-center justify-center gap-1 mt-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Live System</span>
              </div>
            </div>

            <div
              className="glass-card p-6 border border-border/50 text-center animate-scale-in bg-white dark:bg-slate-800/50 hover:shadow-lg transition-all"
              style={{ animationDelay: "100ms" }}
            >
              <div className="text-3xl font-bold text-foreground mb-2">
                {liveStats.activeUsers}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
                Active Users Now
              </div>
              <div className="flex items-center justify-center gap-1 mt-3">
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "500ms" }}
                ></div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Online</span>
              </div>
            </div>

            <div
              className="glass-card p-6 border border-border/50 text-center animate-scale-in bg-white dark:bg-slate-800/50 hover:shadow-lg transition-all"
              style={{ animationDelay: "200ms" }}
            >
              <div className="text-3xl font-bold text-foreground mb-2">
                {liveStats.templatesUsed.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
                Used Today
              </div>
              <div className="flex items-center justify-center gap-1 mt-3">
                <div
                  className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Trending</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="glass-card p-6 border border-border/50 animate-slide-up bg-white/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span>🔍</span> Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="UI Designer, Engineer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-secondary/20 text-foreground rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Categories */}
            <div
              className="glass-card p-6 border border-border/50 animate-slide-up bg-white/50 dark:bg-slate-800/50"
              style={{ animationDelay: "100ms" }}
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span>📂</span> Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all border border-transparent ${selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-secondary/20 text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg opacity-80">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-xs bg-black/10 dark:bg-white/10 px-2 py-1 rounded-full">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div
              className="glass-card p-6 border border-border/50 animate-slide-up bg-white/50 dark:bg-slate-800/50"
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <span>🔥</span> Trending
              </h3>
              <div className="space-y-3">
                {trendingTemplates.map((template, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors border border-border/50"
                  >
                    <div>
                      <div className="font-bold text-sm text-foreground">
                        {template.name}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                        📈 {template.uses}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 glass-card p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-border/50">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span>{categories.find((c) => c.id === selectedCategory)?.icon}</span>
                {selectedCategory === "all"
                  ? "All Templates"
                  : categories.find((c) => c.id === selectedCategory)?.name}
                <span className="text-sm font-normal bg-secondary/20 px-3 py-1 rounded-full text-muted-foreground ml-2">
                  {filteredTemplates.length} Found
                </span>
              </h2>
              <div className="flex items-center gap-4">
                <select className="bg-secondary/20 border border-border rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none cursor-pointer transition-colors">
                  <option className="bg-background text-foreground">Most Popular</option>
                  <option className="bg-background text-foreground">Newest First</option>
                  <option className="bg-background text-foreground">Highest Rated</option>
                  <option className="bg-background text-foreground">Most Downloaded</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template, idx) => (
                <div
                  key={template.id}
                  className="group glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all duration-500 animate-scale-in cursor-pointer border border-border/50 bg-white dark:bg-slate-800"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Template Preview */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-10`}
                    ></div>
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                      <div className="flex flex-col gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          onClick={() => handlePreview(template)}
                          className="bg-white/20 hover:bg-white/30 backdrop-blur text-white border border-white/30 px-6 py-2 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 justify-center"
                        >
                          <span>👁️</span> Preview
                        </button>
                        <button
                          onClick={() => handleUseTemplate(template.id)}
                          disabled={creating}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-wait"
                        >
                          {creating ? "Creating..." : (
                            <>
                              <span>✨</span> Use Template
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Popular Badge */}
                    {template.popularity > 90 && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg uppercase tracking-wide">
                        🔥 Hot
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {template.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-black/20 px-2.5 py-1 rounded-lg">
                        <span className="text-yellow-500 text-xs">⭐</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white">
                          {template.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-700 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2 font-medium">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 dark:bg-primary/10 text-blue-700 dark:text-primary text-xs px-2.5 py-1 rounded-full font-bold"
                        >
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 2 && (
                        <span className="bg-slate-100 dark:bg-secondary/20 text-slate-600 dark:text-muted-foreground text-xs px-2 py-1 rounded-full font-bold">+{template.features.length - 2}</span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-border/50">
                      <div className="text-xs text-slate-500 dark:text-muted-foreground font-bold flex items-center gap-1">
                        📥 {template.downloads.toLocaleString()}
                      </div>
                      <div className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                        {template.popularity}% Match
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="glass-card p-12 text-center rounded-2xl bg-secondary/5 border border-border/50">
                <div className="text-6xl mb-4 opacity-50">🔍</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  No templates found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filters to find what you need.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-scale-in">
          <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-border relative flex flex-col">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/5">
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {previewTemplate.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {previewTemplate.description}
                </p>
              </div>
              <button
                onClick={closePreview}
                className="w-10 h-10 rounded-full bg-secondary/20 hover:bg-secondary/40 text-foreground flex items-center justify-center transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-100 p-2 rounded-lg shadow-inner">
                  <img
                    src={previewTemplate.preview}
                    alt={previewTemplate.name}
                    className="w-full rounded border border-gray-200"
                  />
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                      <span>✨</span> Template Features
                    </h4>
                    <div className="space-y-3">
                      {previewTemplate.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/10 border border-border/50">
                          <span className="text-green-500 text-lg">✓</span>
                          <span className="text-foreground/90">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-6 bg-secondary/5 rounded-xl border border-border/50">
                    <h4 className="font-bold text-foreground text-lg mb-4">
                      Performance Stats
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">User Rating</span>
                        <span className="text-yellow-500 font-bold flex items-center gap-1">
                          ⭐ {previewTemplate.rating}/5.0
                        </span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(previewTemplate.rating / 5) * 100}%` }}></div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-muted-foreground">Total Downloads</span>
                        <span className="text-foreground font-bold">
                          {previewTemplate.downloads.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <span className="text-muted-foreground">
                          Success Rate
                        </span>
                        <span className="text-green-500 font-bold">
                          {previewTemplate.popularity}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${previewTemplate.popularity}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-4">
                    <button
                      onClick={() => handleUseTemplate(previewTemplate.id)}
                      disabled={creating}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-xl font-bold text-center text-lg shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {creating ? "Creating..." : "Use This Template"}
                    </button>
                    <button className="w-full py-4 border border-border rounded-xl font-bold text-foreground hover:bg-secondary/10 transition-colors">
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-card p-10 rounded-3xl text-center border border-border/50 bg-white dark:bg-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>

          <h3 className="text-3xl font-bold text-foreground mb-6">
            Can't Find the Perfect Template?
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Our AI-powered custom template generator can create a unique design
            just for you based on your industry and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:bg-primary/90 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <span>🤖</span> Generate Custom Template
            </button>
            <Link
              to="/resume-builder"
              className="bg-transparent border-2 border-primary/30 text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
            >
              Start from Scratch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
