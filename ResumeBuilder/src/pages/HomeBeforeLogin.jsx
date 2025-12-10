import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Feature Data
const features = [
  {
    title: "Create Professional Resumes",
    desc: "Fill out easy forms with personalized templates to build resumes that get noticed by hiring managers.",
    icon: (
      <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h6l6 6v10a2 2 0 01-2 2z" />
      </svg>
    ),
    stats: "10+ Templates",
  },
  {
    title: "AI-Powered Suggestions",
    desc: "Get smart tips to improve your resume phrasing and highlight your best skills with cutting-edge AI.",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    stats: "95% Accuracy",
  },
  {
    title: "Real-Time Collaboration",
    desc: "Work together with friends, mentors, or career coaches to build the perfect resume in real-time.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    stats: "Live Editing",
  },
  {
    title: "Multiple Export Formats",
    desc: "Download your resume in PDF, Word, or plain text format with one click and share instantly.",
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    stats: "3 Formats",
  },
];

const additionalFeatures = [
  { title: "Cover Letter Builder", desc: "Create matching cover letters that complement your resume perfectly.", icon: "📄" },
  { title: "ATS Optimization", desc: "Ensure your resume passes Applicant Tracking Systems with our optimization tools.", icon: "🎯" },
  { title: "LinkedIn Integration", desc: "Import your LinkedIn profile data directly into your resume with one click.", icon: "💼" },
  { title: "Skill Assessment", desc: "Take our quiz to identify and highlight your strongest skills effectively.", icon: "🧠" },
  { title: "Version Control", desc: "Keep track of different resume versions and revert to previous ones easily.", icon: "🔄" },
  { title: "Analytics Dashboard", desc: "Track how many times your resume has been viewed and downloaded.", icon: "📊" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b1?w=150&h=150&fit=crop&crop=face",
    text: "Got my dream job at Google within 3 weeks! The AI suggestions were spot-on.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "The collaboration feature helped me get feedback from 5 industry experts.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "Netflix",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "ATS optimization feature got my resume through every screening process.",
    rating: 5,
  },
];

const stats = [
  { number: "50K+", label: "Resumes Created", icon: "📄" },
  { number: "95%", label: "Success Rate", icon: "✅" },
  { number: "500+", label: "Companies Hiring", icon: "🏢" },
  { number: "24/7", label: "Support Available", icon: "🎧" },
];

export default function HomeBeforeLogin() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden selection:bg-primary selection:text-white mesh-gradient">
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
          <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-emerald-500/20 rounded-full blur-[100px] animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Hero Text */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-8 animate-slide-up">
              <div className="inline-flex items-center space-x-2 bg-secondary/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary/50 transition-colors cursor-default">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-secondary-foreground">AI-Powered Resume Builder V2.0</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Craft Your <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                  Dream Career
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Stop struggling with Word templates. Our AI-driven platform helps you build professional, ATS-friendly resumes in minutes, not hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    Build My Resume
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <a
                  href="https://youtu.be/9ScqP1qmxFo?si=ul3yLciA0hGyDQ2q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 glass bg-secondary/10 hover:bg-secondary/20 border border-white/10 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 backdrop-blur-md"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black pl-1 group-hover:scale-110 transition-transform">▶</span>
                  <span>See How It Works</span>
                </a>
              </div>

              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-muted-foreground">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-background" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs ml-2">50k+</div>
                </div>
                <div>
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-foreground font-bold">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Hero Visualization */}
            <div className="lg:w-1/2 relative perspective-1000 animate-fade-in-right">
              <div className="relative transform rotate-y-6 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out preserve-3d">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-3xl opacity-20 -z-10 animate-pulse"></div>
                <img
                  src="https://cdn.dribbble.com/users/648/screenshots/15086874/media/3aa53bf0a786779edb9b0983d9882f4d.png"
                  alt="Resume Builder Interface"
                  className="rounded-2xl shadow-2xl border border-white/10 w-full object-cover"
                />

                {/* Floating Elements */}
                <div className="absolute -left-8 top-1/4 glass p-4 rounded-2xl shadow-xl animate-float delay-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold">ATS Score</div>
                      <div className="text-xs text-green-500 font-bold">98/100 Excellent</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-8 bottom-1/4 glass p-4 rounded-2xl shadow-xl animate-float delay-1000">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold">AI Assistant</div>
                      <div className="text-xs text-muted-foreground">Optimizing content...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Stats Grid */}
      <section className="py-12 border-y border-white/5 bg-secondary/5 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <div className="text-4xl mb-2 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-bw from-foreground to-foreground/70 bg-clip-text text-transparent mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Features Grid */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">
              Features That <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Empower You</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              We've packed the power of a professional resume writer into our advanced AI platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-secondary/10 hover:bg-secondary/20 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full transition-transform group-hover:scale-150"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 transform rotate-3 group-hover:rotate-0">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6">{feature.desc}</p>

                  <div className="inline-flex items-center text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                    {feature.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Extra Features */}
      <section className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Everything You Need</h2>
            <p className="text-xl text-muted-foreground">A complete toolkit for your job search success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
            {additionalFeatures.map((feature, idx) => (
              <div
                key={idx}
                className={`group p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${idx === 0 || idx === 3 ? 'md:col-span-2' : ''}`}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">Join thousands of professionals who landed their dream jobs.</p>
          </div>

          <div className="relative bg-gradient-to-br from-secondary/10 to-background border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl">
            {/* Decoration */}
            <div className="absolute top-4 right-8 text-9xl text-primary/10 font-serif leading-none">"</div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-background relative z-10"
                />
              </div>

              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="flex justify-center md:justify-start">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>

                <p className="text-xl md:text-2xl italic font-medium leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>

                <div>
                  <div className="text-lg font-bold text-foreground">{testimonials[currentTestimonial].name}</div>
                  <div className="text-primary font-medium">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-10 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? "w-8 bg-primary" : "w-2 bg-secondary/50 hover:bg-secondary"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="relative z-10 px-8 py-20 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Ready to land your dream job?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join over 50,000 professionals building their future with ResumeAI.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/resume-builder"
                className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3"
              >
                <span>🚀</span>
                <span>Get Started for Free</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6 block">ResumeAI</span>
              <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">
                The most advanced AI-powered resume builder. Create professional resumes in minutes.
              </p>
              <div className="flex gap-4">
                {['twitter', 'github', 'linkedin'].map((social) => (
                  <div key={social} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm">
                    <span className="capitalize text-xs">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-6">Product</h4>
              <ul className="space-y-4">
                <li><Link to="/resume-builder" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resume Builder</Link></li>
                <li><Link to="/templates" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Templates</Link></li>
                <li><Link to="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Career Blog</Link></li>
                <li><Link to="/examples" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resume Examples</Link></li>
                <li><Link to="/help" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link to="/accessibility" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Accessibility</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-500">
            <p>&copy; 2024 ResumeAI. All rights reserved.</p>
            <p>Made with ❤️ by Developers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
