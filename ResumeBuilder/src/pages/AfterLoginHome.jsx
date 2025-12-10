import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

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
          growth: `+${parseInt(skill.growth.replace("%", "").replace("+", "")) +
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
      desc: "Create professional resumes with AI assistance and industry-specific templates.",
      icon: "🤖",
      gradient: "from-purple-500 via-pink-500 to-purple-600",
      stats: `${stats.templatesAvailable.toLocaleString()}+ templates`,
      badge: "Most Popular",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      title: "Real-Time Skill Assessment",
      desc: "Take dynamic quizzes that adapt to your responses and discover hidden strengths.",
      icon: "⚡",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      stats: "98.7% accuracy",
      badge: "AI Powered",
      badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      title: "Live Collaboration Hub",
      desc: "Work with mentors and peers in real-time with instant feedback and guidance.",
      icon: "👥",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      stats: `${stats.mentorsOnline.toLocaleString()}+ mentors`,
      badge: "Live Now",
      badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
      title: "Smart Analytics Dashboard",
      desc: "Track resume performance with detailed insights on views and hiring trends.",
      icon: "📊",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      stats: "Real-time insights",
      badge: "Advanced",
      badgeColor: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      title: "Job Market Intelligence",
      desc: "Access live job market data, salary insights, and trending skills.",
      icon: "🎯",
      gradient: "from-indigo-500 via-purple-500 to-pink-600",
      stats: `${stats.jobsPosted.toLocaleString()}+ jobs`,
      badge: "Exclusive",
      badgeColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
    },
    {
      title: "Interview Preparation",
      desc: "Practice with AI-powered mock interviews and get personalized feedback.",
      icon: "🎤",
      gradient: "from-yellow-500 via-orange-500 to-red-600",
      stats: `${stats.interviewsScheduled.toLocaleString()}+ interviews`,
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
    <div className="glass-card p-6 border-white/20 dark:border-white/10 group cursor-pointer hover:bg-white/50 dark:hover:bg-slate-800/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-700 dark:text-gray-300 text-sm font-bold tracking-wide group-hover:text-primary transition-colors">
          {label}
        </span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
        {typeof value === "number" ? Math.floor(value).toLocaleString() : value}
        {suffix}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700 backdrop-blur-sm shadow-sm">
                🚀 Join 50,000+ professionals worldwide
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight drop-shadow-sm text-slate-900 dark:text-white">
              Build Your Dream Career
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent pb-2 mt-2">
                In Real-Time
              </span>
            </h1>
            <p className="text-xl text-slate-700 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
              Join thousands of professionals using our AI-powered platform to
              create stunning resumes, assess skills, and land their dream jobs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/resume-builder"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-bold text-xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-3">
                  Start Building Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <a
                href="https://youtu.be/9ScqP1qmxFo?si=ul3yLciA0hGyDQ2q"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="glass-card px-8 py-4 rounded-2xl font-bold text-xl text-slate-800 dark:text-white hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 flex items-center gap-3 shadow-md hover:shadow-lg">
                  <span>▶️</span>
                  Watch Demo
                </button>
              </a>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 animate-fade-in-up delay-100">
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
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-card p-8 group hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl group-hover:rotate-6 transition-all duration-300`}
                >
                  {feature.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${feature.badgeColor} shadow-md`}>
                  {feature.badge}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-slate-700 dark:text-gray-300 mb-6 leading-relaxed font-medium">
                {feature.desc}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700/50">
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {feature.stats}
                </span>
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Time Activity Feed */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Live Notifications Banner */}
        {notifications.length > 0 && (
          <div className="mb-12 animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 animate-pulse group-hover:bg-white/20 transition-colors"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                  <span className="font-bold text-lg tracking-wide">{notifications[0]}</span>
                </div>
                <span className="text-sm font-bold bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">Live Update</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Live Activity Feed */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
                <span className="text-4xl">🌐</span>
                {getGreeting()}, See What's Happening Live
              </h3>
              <p className="text-slate-600 dark:text-gray-400 text-lg font-medium">
                Join a thriving community of{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-lg">{stats.activeUsers.toLocaleString()}+</span> professionals.
              </p>
            </div>

            <div className="glass-card p-6 border-white/20 dark:border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700/50">
                <h4 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <span>🚀</span>
                  Global Activity Feed
                </h4>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">Live</span>
                </div>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {activities.map((activity, idx) => (
                  <div
                    key={`${activity.user}-${activity.time}-${idx}`}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all animate-fade-in-up border border-transparent hover:border-blue-200 dark:hover:border-blue-700/50"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="text-2xl pt-1 scale-110">{activity.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {activity.user}
                        </span>
                        <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-600">
                          {activity.location}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm ml-auto font-medium">{activity.time}</span>
                      </div>
                      <p className="text-slate-700 dark:text-gray-300 text-sm mb-2 font-medium">
                        {activity.action}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getActivityIcon(activity.type)}</span>
                        <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">Successfully completed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending Skills */}
            <div className="glass-card p-6 border-white/20 dark:border-white/10 shadow-lg">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                <span>📈</span>
                Trending Skills
              </h3>
              <div className="space-y-4">
                {trendingSkills.slice(0, 4).map((skill, idx) => (
                  <div
                    key={skill.skill}
                    className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer border border-transparent hover:border-purple-200 dark:hover:border-purple-700/50 hover:shadow-md group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{skill.skill}</h4>
                      <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2.5 py-1 rounded-full">{skill.growth}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${skill.gradient} shadow-[0_0_10px_rgba(168,85,247,0.4)]`} style={{ width: '85%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Summary */}
            <div className="glass-card p-6 border-white/20 dark:border-white/10 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <span>⚡</span>
                Quick Action
              </h3>
              <p className="text-sm text-slate-700 dark:text-gray-300 mb-6 font-medium">
                Boost your profile visibility by adding verified skills.
              </p>
              <button
                onClick={() => navigate("/ai")}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3.5 px-6 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                Take Skill Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;