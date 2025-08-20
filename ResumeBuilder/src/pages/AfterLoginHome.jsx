import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeUsers: 1234,
    resumesCreated: 45678,
    companiesHiring: 892,
    successRate: 94,
    templatesAvailable: 12547,
    mentorsOnline: 2834,
    jobsPosted: 15789,
    interviewsScheduled: 3456,
  });

  const [activities, setActivities] = useState([
    {
      user: "Sarah M.",
      action: "created a new resume",
      time: "2 min ago",
      type: "create",
      location: "New York",
      avatar: "👩‍💼",
    },
    {
      user: "Michael R.",
      action: "got hired at TechCorp",
      time: "5 min ago",
      type: "success",
      location: "San Francisco",
      avatar: "👨‍💻",
    },
    {
      user: "Emma L.",
      action: "updated their skills",
      time: "8 min ago",
      type: "update",
      location: "London",
      avatar: "👩‍🎓",
    },
    {
      user: "James K.",
      action: "downloaded resume as PDF",
      time: "12 min ago",
      type: "download",
      location: "Toronto",
      avatar: "👨‍🔬",
    },
    {
      user: "Lisa P.",
      action: "completed skill assessment",
      time: "15 min ago",
      type: "assessment",
      location: "Sydney",
      avatar: "👩‍🏫",
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([
    {
      skill: "AI/Machine Learning",
      growth: "+45%",
      demand: "Very High",
      gradient: "from-purple-500 via-pink-500 to-purple-600",
    },
    {
      skill: "React Development",
      growth: "+38%",
      demand: "High",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
    },
    {
      skill: "Data Analysis",
      growth: "+42%",
      demand: "Very High",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
    },
    {
      skill: "Cloud Computing",
      growth: "+35%",
      demand: "High",
      gradient: "from-orange-500 via-red-500 to-pink-600",
    },
    {
      skill: "UI/UX Design",
      growth: "+29%",
      demand: "Medium",
      gradient: "from-indigo-500 via-purple-500 to-pink-600",
    },
    {
      skill: "DevOps",
      growth: "+41%",
      demand: "Very High",
      gradient: "from-yellow-500 via-orange-500 to-red-600",
    },
  ]);

  const [jobMarketData, setJobMarketData] = useState([
    {
      company: "Google",
      openings: 1247,
      type: "Tech Giant",
      hiring: "Actively",
      logo: "🔍",
      gradient: "from-blue-500 to-green-500",
    },
    {
      company: "Microsoft",
      openings: 985,
      type: "Tech Giant",
      hiring: "Actively",
      logo: "🪟",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      company: "Amazon",
      openings: 2156,
      type: "E-commerce",
      hiring: "Rapidly",
      logo: "📦",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      company: "Apple",
      openings: 734,
      type: "Hardware",
      hiring: "Selectively",
      logo: "🍎",
      gradient: "from-gray-700 to-gray-500",
    },
    {
      company: "Meta",
      openings: 678,
      type: "Social Media",
      hiring: "Actively",
      logo: "📘",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      company: "Tesla",
      openings: 892,
      type: "Automotive",
      hiring: "Rapidly",
      logo: "⚡",
      gradient: "from-red-600 to-pink-600",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update main stats
      setStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        resumesCreated: prev.resumesCreated + Math.floor(Math.random() * 3),
        companiesHiring: prev.companiesHiring + Math.floor(Math.random() * 3),
        successRate: Math.max(
          88,
          Math.min(99, prev.successRate + (Math.random() - 0.5) * 0.8)
        ),
        templatesAvailable:
          prev.templatesAvailable + Math.floor(Math.random() * 2),
        mentorsOnline: prev.mentorsOnline + Math.floor(Math.random() * 4) - 2,
        jobsPosted: prev.jobsPosted + Math.floor(Math.random() * 5),
        interviewsScheduled:
          prev.interviewsScheduled + Math.floor(Math.random() * 3),
      }));

      // Update current time
      setCurrentTime(new Date());

      // Add new activity occasionally
      if (Math.random() > 0.6) {
        const newActivities = [
          {
            user: "Alex Chen",
            action: "landed a job at Google",
            time: "just now",
            type: "success",
            location: "California",
            avatar: "👨‍💻",
          },
          {
            user: "Maria Garcia",
            action: "completed AI course",
            time: "just now",
            type: "assessment",
            location: "Madrid",
            avatar: "👩‍🎓",
          },
          {
            user: "David Kim",
            action: "updated portfolio",
            time: "just now",
            type: "update",
            location: "Seoul",
            avatar: "👨‍🎨",
          },
          {
            user: "Sophie Brown",
            action: "got interview invite",
            time: "just now",
            type: "success",
            location: "London",
            avatar: "👩‍💼",
          },
          {
            user: "Carlos Rodriguez",
            action: "created new resume",
            time: "just now",
            type: "create",
            location: "Mexico City",
            avatar: "👨‍🔬",
          },
          {
            user: "Anna Petrov",
            action: "skill assessment passed",
            time: "just now",
            type: "assessment",
            location: "Moscow",
            avatar: "👩‍🏫",
          },
        ];
        const randomActivity =
          newActivities[Math.floor(Math.random() * newActivities.length)];

        setActivities((prev) => [randomActivity, ...prev.slice(0, 9)]);
      }

      // Update notifications occasionally
      if (Math.random() > 0.8) {
        const newNotifications = [
          "🎉 500+ new jobs posted in the last hour!",
          "🔥 AI skills are trending up 45% this week!",
          "⭐ New resume template just released!",
          "🚀 Interview success rate increased to 94%!",
          "💼 Top companies are hiring for remote positions!",
        ];
        const randomNotification =
          newNotifications[Math.floor(Math.random() * newNotifications.length)];
        setNotifications((prev) => [randomNotification, ...prev.slice(0, 2)]);
      }

      // Update trending skills growth
      setTrendingSkills((prev) =>
        prev.map((skill) => ({
          ...skill,
          growth: `+${
            parseInt(skill.growth.replace("%", "").replace("+", "")) +
            Math.floor(Math.random() * 3 - 1)
          }%`,
        }))
      );

      // Update job market data
      setJobMarketData((prev) =>
        prev.map((company) => ({
          ...company,
          openings: company.openings + Math.floor(Math.random() * 10 - 5),
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Time-based greeting
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const features = [
    {
      title: "AI-Powered Resume Builder",
      desc: "Create professional resumes with AI assistance and industry-specific templates that adapt to your experience.",
      icon: "🤖",
      gradient: "from-purple-500 via-pink-500 to-purple-600",
      stats: `${stats.templatesAvailable.toLocaleString()}+ templates`,
      badge: "Most Popular",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      title: "Real-Time Skill Assessment",
      desc: "Take dynamic quizzes that adapt to your responses and discover hidden strengths with personalized recommendations.",
      icon: "⚡",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      stats: "98.7% accuracy",
      badge: "AI Powered",
      badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      title: "Live Collaboration Hub",
      desc: "Work with mentors and peers in real-time with instant feedback, suggestions, and career guidance.",
      icon: "👥",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      stats: `${stats.mentorsOnline.toLocaleString()}+ mentors online`,
      badge: "Live Now",
      badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
      title: "Smart Analytics Dashboard",
      desc: "Track resume performance with detailed insights on views, downloads, response rates, and hiring trends.",
      icon: "📊",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      stats: "Real-time insights",
      badge: "Advanced",
      badgeColor: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      title: "Job Market Intelligence",
      desc: "Access live job market data, salary insights, and trending skills to stay ahead of the competition.",
      icon: "🎯",
      gradient: "from-indigo-500 via-purple-500 to-pink-600",
      stats: `${stats.jobsPosted.toLocaleString()}+ jobs tracked`,
      badge: "Exclusive",
      badgeColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
    },
    {
      title: "Interview Preparation",
      desc: "Practice with AI-powered mock interviews and get personalized feedback to ace your next interview.",
      icon: "🎤",
      gradient: "from-yellow-500 via-orange-500 to-red-600",
      stats: `${stats.interviewsScheduled.toLocaleString()}+ interviews scheduled`,
      badge: "Success Boost",
      badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
  ];

  const getActivityIcon = (type) => {
    const icons = {
      create: "✨",
      success: "🎉",
      update: "🔄",
      download: "📄",
      assessment: "🎯",
    };
    return icons[type] || "•";
  };

  const StatCard = ({ label, value, suffix = "" }) => (
    <div className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-glow transition-all duration-500 animate-scale-in hover-scale cursor-pointer border border-border/50 hover:border-primary/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted-foreground text-sm font-medium tracking-wide">
          {label}
        </span>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
      </div>
      <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        {typeof value === "number" ? Math.floor(value).toLocaleString() : value}
        {suffix}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-blue-200 to-blue-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-20 animate-slide-down">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-primary text-primary-foreground shadow-glow animate-pulse-glow">
                🚀 Join 50,000+ professionals worldwide
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Build Your Dream Career
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-6xl md:text-7xl animate-pulse
">
                In Real-Time
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Join thousands of professionals using our AI-powered platform to
              create stunning resumes, assess skills, and land their dream jobs
              with real-time collaboration and insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/resume-builder"
                className="group bg-gradient-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-xl shadow-strong hover:shadow-glow transform hover-scale transition-all duration-500 animate-float hover-glow"
              >
                <span className="flex items-center gap-3">
                  Start Building Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <a
                href="https://youtu.be/9ScqP1qmxFo?si=ul3yLciA0hGyDQ2q"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="group bg-card/80 backdrop-blur-sm text-foreground border-2 border-primary/20 px-10 py-5 rounded-2xl font-bold text-xl shadow-medium hover:shadow-strong transform hover-scale transition-all duration-500 hover:border-primary/40">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">▶️</span>
                    Watch Demo
                  </span>
                </button>
              </a>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <StatCard label="Active Users" value={stats.activeUsers} />
            <StatCard label="Resumes Created" value={stats.resumesCreated} />
            <StatCard label="Companies Hiring" value={stats.companiesHiring} />
            <StatCard
              label="Success Rate"
              value={stats.successRate.toFixed(1)}
              suffix="%"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Powerful Features for Modern Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to stand out in today's competitive job market,
            powered by cutting-edge AI and real-time collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-card rounded-3xl p-8 shadow-soft hover:shadow-glow transition-all duration-700 transform hover-scale animate-scale-in cursor-pointer border border-border/50 hover:border-primary/30 relative overflow-hidden"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white ${feature.badgeColor} shadow-medium`}>
                  {feature.badge}
                </span>
              </div>
              
              <div
                className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-medium group-hover:shadow-glow`}
              >
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                {feature.desc}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  {feature.stats}
                </span>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Time Activity Feed */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Live Notifications Banner */}
        {notifications.length > 0 && (
          <div className="mb-16 animate-slide-down">
            <div className="bg-gradient-to-r from-primary via-primary-glow to-primary text-primary-foreground p-6 rounded-3xl shadow-glow relative overflow-hidden">
              <div className="absolute inset-0 animated-gradient opacity-20"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse-glow"></div>
                  <span className="font-bold text-lg">{notifications[0]}</span>
                </div>
                <span className="text-sm text-white/90 font-medium">Live Update</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* Live Activity Feed */}
          <div className="lg:col-span-2">
            <div className="animate-slide-up mb-10">
              <h3 className="text-4xl font-bold text-foreground mb-6 flex items-center gap-4">
                <span className="text-3xl">🌐</span>
                {getGreeting()}, See What's Happening Live
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join a thriving community of{" "}
                {stats.activeUsers.toLocaleString()}+ professionals achieving
                their career goals every day. Watch real-time updates from users
                just like you across the globe.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-medium animate-slide-up border border-border/50">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  Global Activity Feed
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
                  <span className="text-sm text-success font-bold bg-success/10 px-3 py-1 rounded-full">
                    Live - {currentTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="space-y-6 max-h-96 overflow-y-auto">
                {activities.map((activity, idx) => (
                  <div
                    key={`${activity.user}-${activity.time}-${idx}`}
                    className="group flex items-start gap-6 p-6 rounded-2xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary-glow/5 transition-all duration-500 animate-fade-in border border-transparent hover:border-primary/20 hover:shadow-soft cursor-pointer"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{activity.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                          {getActivityIcon(activity.type)}
                        </span>
                        <span className="font-bold text-foreground text-lg">
                          {activity.user}
                        </span>
                        <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
                          {activity.location}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3 text-lg">
                        {activity.action}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground font-medium">
                          {activity.time}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
                          <span className="text-sm text-success font-bold">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Stats Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-card rounded-3xl p-8 shadow-medium animate-scale-in border border-border/50">
              <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="text-xl">📊</span>
                Live Platform Stats
              </h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <span className="text-muted-foreground font-medium">
                    Templates Used
                  </span>
                  <span className="font-bold text-primary text-lg">
                    {stats.templatesAvailable.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <span className="text-muted-foreground font-medium">
                    Mentors Online
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow"></div>
                    <span className="font-bold text-success text-lg">
                      {stats.mentorsOnline.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <span className="text-muted-foreground font-medium">
                    Jobs Posted Today
                  </span>
                  <span className="font-bold text-primary text-lg">
                    {stats.jobsPosted.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <span className="text-muted-foreground font-medium">
                    Interviews This Week
                  </span>
                  <span className="font-bold text-primary text-lg">
                    {stats.interviewsScheduled.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Success Indicators */}
            <div className="bg-gradient-to-br from-success/10 via-success/5 to-transparent rounded-3xl p-8 shadow-medium animate-scale-in border border-success/20">
              <h4 className="text-xl font-bold text-success mb-6 flex items-center gap-3">
                <span className="text-xl">🎯</span>
                Success Indicators
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-success/5 transition-colors cursor-pointer">
                  <div className="w-4 h-4 bg-success rounded-full animate-pulse-glow"></div>
                  <span className="text-success font-bold">
                    {stats.successRate.toFixed(1)}% Interview Success Rate
                  </span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-success/5 transition-colors cursor-pointer">
                  <div
                    className="w-4 h-4 bg-success rounded-full animate-pulse-glow"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <span className="text-success font-bold">
                    97.2% User Satisfaction
                  </span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-success/5 transition-colors cursor-pointer">
                  <div
                    className="w-4 h-4 bg-success rounded-full animate-pulse-glow"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <span className="text-success font-bold">
                    4.9⭐ Average Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Skills Section */}
      <section className="bg-gradient-to-br from-muted/30 via-transparent to-accent/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl font-bold text-foreground mb-6 flex items-center justify-center gap-4">
              <span className="text-4xl">🔥</span>
              Trending Skills & Market Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Stay ahead of the curve with real-time skill demand data and
              market insights powered by AI analysis of millions of job
              postings.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Trending Skills */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-3xl p-8 shadow-medium animate-scale-in border border-border/50">
                <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                  <span className="text-2xl">📈</span>
                  Hottest Skills This Week
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {trendingSkills.map((skill, idx) => (
                    <div
                      key={skill.skill}
                      className="group p-6 rounded-2xl bg-gradient-to-br from-card to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-500 cursor-pointer transform hover-scale hover:shadow-soft"
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-6 h-6 rounded-full bg-gradient-to-r ${skill.gradient} shadow-medium`}
                        ></div>
                        <span className="text-sm font-bold text-success bg-success/10 px-3 py-1 rounded-full">
                          {skill.growth}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground mb-2 text-lg group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {skill.skill}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground font-medium">
                          Demand:
                        </span>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            skill.demand === "Very High"
                              ? "bg-destructive/10 text-destructive"
                              : skill.demand === "High"
                              ? "bg-warning/10 text-warning"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {skill.demand}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Summary */}
            <div className="space-y-8">
              <div className="bg-card rounded-3xl p-8 shadow-medium animate-scale-in border border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="text-xl">🌟</span>
                  Market Summary
                </h3>
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-primary-glow/5 rounded-2xl border border-primary/20">
                    <div className="text-sm text-primary font-bold mb-1">
                      Most In-Demand
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      AI & Machine Learning
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-2xl border border-success/20">
                    <div className="text-sm text-success font-bold mb-1">
                      Highest Growth
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      Data Analysis
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-2xl border border-warning/20">
                    <div className="text-sm text-warning font-bold mb-1">
                      Emerging Field
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      DevOps Engineering
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-warning/20 via-warning/10 to-warning/5 rounded-3xl p-8 shadow-medium animate-scale-in border border-warning/30">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="text-xl">⚡</span>
                  Quick Action
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Start learning AI skills now and increase your job prospects
                  by 45%!
                </p>
                <button
                  onClick={() => navigate("/ai")}
                  className="w-full bg-gradient-to-r from-warning to-warning/80 text-warning-foreground py-4 px-6 rounded-2xl font-bold transform hover-scale transition-all duration-300 hover:shadow-glow"
                >
                  Start AI Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Market Intelligence */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl font-bold text-foreground mb-6 flex items-center justify-center gap-4">
            <span className="text-4xl">💼</span>
            Live Job Market Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Real-time insights from top companies actively hiring. Updated every
            minute with fresh opportunities and hiring trends.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {jobMarketData.map((company, idx) => (
            <div
              key={company.company}
              className="group bg-card rounded-3xl p-8 shadow-soft hover:shadow-glow transition-all duration-700 animate-scale-in cursor-pointer transform hover-scale border border-border/50 hover:border-primary/30 relative overflow-hidden"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute top-6 right-6">
                <div
                  className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-medium ${
                    company.hiring === "Rapidly"
                      ? "bg-gradient-to-r from-destructive to-destructive/80"
                      : company.hiring === "Actively"
                      ? "bg-gradient-to-r from-success to-success/80"
                      : "bg-gradient-to-r from-warning to-warning/80"
                  }`}
                >
                  {company.hiring}
                </div>
              </div>
              
              <div className="flex items-start gap-6 mb-6">
                <div className={`text-5xl p-4 rounded-2xl bg-gradient-to-br ${company.gradient} shadow-medium group-hover:scale-110 transition-all duration-500`}>
                  {company.logo}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {company.company}
                  </h3>
                  <p className="text-muted-foreground font-medium text-lg">
                    {company.type}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {company.openings.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground ml-3 text-lg">
                    open positions
                  </span>
                </div>
                <button className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-2xl font-bold hover:shadow-glow transform hover-scale transition-all duration-300">
                  View Jobs
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-secondary py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-20"></div>
        <div className="relative max-w-5xl mx-auto text-center px-6 animate-scale-in">
          <h3 className="text-5xl font-bold text-foreground mb-8">
            Ready to Transform Your Career?
          </h3>
          <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have already accelerated their
            careers with our AI-powered platform and real-time collaboration
            tools.
          </p>

          <Link
            to="/resume-builder"
            className="inline-block bg-card/90 backdrop-blur-sm text-foreground px-12 py-6 rounded-3xl font-bold text-2xl shadow-strong hover:shadow-glow transform hover-scale transition-all duration-500 animate-float hover-glow border-2 border-primary/20 hover:border-primary/40"
          >
            Get Started Free Today
          </Link>

          <p className="text-muted-foreground text-lg mt-6">
            No credit card required • Start building in under 60 seconds
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;