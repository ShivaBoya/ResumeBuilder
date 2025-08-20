import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);
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
    <div className="min-h-screen bg-gradient-to-r from-white via-blue-200 to-blue-200">
      {/* Header Section */}
      <section className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 animate-slide-down">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Choose Your Perfect
              <span
                className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-6xl md:text-7xl animate-pulse
"
              >
                Resume Template
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover professionally designed templates crafted by experts with
              beautiful sky blue accents. Each template is ATS-friendly and
              fully customizable to match your unique style.
            </p>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center animate-scale-in shadow-sky">
              <div className="text-2xl font-bold text-primary">
                {liveStats.totalDownloads.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Downloads
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-primary">Live</span>
              </div>
            </div>
            <div
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center animate-scale-in shadow-sky"
              style={{ animationDelay: "100ms" }}
            >
              <div className="text-2xl font-bold text-primary">
                {liveStats.activeUsers}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Users Now
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div
                  className="w-2 h-2 bg-accent rounded-full animate-pulse"
                  style={{ animationDelay: "500ms" }}
                ></div>
                <span className="text-xs text-accent">Online</span>
              </div>
            </div>
            <div
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center animate-scale-in shadow-sky"
              style={{ animationDelay: "200ms" }}
            >
              <div className="text-2xl font-bold text-primary">
                {liveStats.templatesUsed.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Used Today</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div
                  className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span className="text-xs text-sky-600">Growing</span>
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
            <div className="bg-card rounded-xl p-6 shadow-soft animate-slide-up">
              <h3 className="font-semibold text-foreground mb-4">
                Search Templates
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or style..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <div className="absolute left-3 top-3.5 text-muted-foreground">
                  🔍
                </div>
              </div>
            </div>

            {/* Categories */}
            <div
              className="bg-card rounded-xl p-6 shadow-soft animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-sky"
                        : "hover:bg-muted text-foreground hover:text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm opacity-75">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div
              className="bg-card rounded-xl p-6 shadow-soft animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                🔥 Trending This Week
              </h3>
              <div className="space-y-3">
                {trendingTemplates.map((template, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {template.name}
                      </div>
                      <div className="text-xs text-primary flex items-center gap-1">
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory === "all"
                  ? "All Templates"
                  : categories.find((c) => c.id === selectedCategory)?.name}
                <span className="text-muted-foreground ml-2">
                  ({filteredTemplates.length})
                </span>
              </h2>
              <div className="flex items-center gap-4">
                <select className="bg-card border border-border rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-primary">
                  <option>Most Popular</option>
                  <option>Newest First</option>
                  <option>Highest Rated</option>
                  <option>Most Downloaded</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template, idx) => (
                <div
                  key={template.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-sky transition-all duration-500 animate-scale-in cursor-pointer border border-sky-100 hover:border-sky-300"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Template Preview */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`}
                    ></div>
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                        <button
                          onClick={() => handlePreview(template)}
                          className="bg-white/90 text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-white transition-colors shadow-medium"
                        >
                          👁️ Preview
                        </button>
                        <Link
                          to={`/resume-builder?template=${template.id}`}
                          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sky"
                        >
                          ✨ Use Template
                        </Link>
                      </div>
                    </div>

                    {/* Popular Badge */}
                    {template.popularity > 90 && (
                      <div className="absolute top-3 right-3 bg-gradient-primary text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        🔥 Hot
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-semibold text-foreground">
                          {template.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-sky-50 text-sky-700 text-xs px-2 py-1 rounded-full font-medium border border-sky-200"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                          📥 {template.downloads.toLocaleString()}
                        </span>
                        <span className="text-primary">
                          📊 {template.popularity}% match
                        </span>
                      </div>
                      <Link
                        to={`/resume-builder?template=${template.id}`}
                        className="bg-gradient-primary text-white px-4 py-2 rounded-lg font-semibold hover:shadow-sky transition-all transform hover:scale-105"
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No templates found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-scale-in">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-strong border border-sky-200">
            <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-sky-50 to-sky-100">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {previewTemplate.name}
                </h3>
                <p className="text-muted-foreground">
                  {previewTemplate.description}
                </p>
              </div>
              <button
                onClick={closePreview}
                className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={previewTemplate.preview}
                    alt={previewTemplate.name}
                    className="w-full rounded-lg shadow-medium border border-sky-200"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Template Features
                    </h4>
                    <div className="space-y-2">
                      {previewTemplate.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-primary">✓</span>
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Template Stats
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="text-foreground font-semibold">
                          ⭐ {previewTemplate.rating}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Downloads</span>
                        <span className="text-foreground font-semibold">
                          {previewTemplate.downloads.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Popularity
                        </span>
                        <span className="text-primary font-semibold">
                          {previewTemplate.popularity}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Link
                      to={`/resume-builder?template=${previewTemplate.id}`}
                      className="flex-1 bg-gradient-primary text-white py-3 rounded-lg font-semibold text-center hover:shadow-sky transition-all transform hover:scale-105"
                    >
                      Use This Template
                    </Link>
                    <button className="px-6 py-3 border border-sky-300 rounded-lg font-semibold text-primary hover:bg-sky-50 transition-colors">
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="bg-gradient-secondary py-16 mt-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-bold text-sky-900 mb-4">
            Can't Find the Perfect Template?
          </h3>
          <p className="text-sky-800 text-lg mb-8">
            Our AI-powered custom template generator can create a unique design
            just for you based on your industry and preferences with beautiful
            sky blue themes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-sky transition-all transform hover:scale-105">
              🤖 Generate Custom Template
            </button>
            <Link
              to="/resume-builder"
              className="bg-sky-600 border border-sky-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-all"
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
