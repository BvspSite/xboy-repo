import { useState, useEffect } from 'react';
import { Github, Instagram, Mail, Code2, Database, Palette, ExternalLink, Menu, X, Download, Award, GraduationCap, Calendar, Send, Sun, Moon, Sparkles, ArrowUp, Briefcase, TrendingUp } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { ThemeCustomizer } from './ThemeCustomizer';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { theme, toggleTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [formErrors, setFormErrors] = useState<{name?: string; email?: string; message?: string}>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'error' | 'success' | 'sending'>('idle');
  const [showFormFeedback, setShowFormFeedback] = useState(false);

  // Cinematic loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 seconds cinematic animation
    return () => clearTimeout(timer);
  }, []);

  // Typing animation for hero subtitle
  useEffect(() => {
    const text = "Full Stack Developer | UI/UX Enthusiast";
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [isLoading]);

  // Handle subtle cursor effect (optional, only on desktop)
  useEffect(() => {
    // Only add custom cursor on desktop devices with fine pointer
    if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursor.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorOutline);

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorOutline.style.left = e.clientX + 'px';
      cursorOutline.style.top = e.clientY + 'px';
      };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
        if (document.body.contains(cursor)) document.body.removeChild(cursor);
        if (document.body.contains(cursorOutline)) document.body.removeChild(cursorOutline);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'about', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add mouse move effect for project cards
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card: Element) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "Personal Blog Platform",
      description: "A modern blog platform built with React and Node.js",
      tech: ["React", "Node.js"],
      code: `const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
}`,
      link: "https://github.com/BvspSite"

    },
    {
      title: "E-Commerce Website",
      description: "Online store with payment integration",
      tech: ["Next.js", "Express", "MySQL"],
      code: `async function processPayment(order) {
  try {
    const result = await stripe.charges.create({
      amount: order.total,
      currency: 'usd'
    });
    return result;
  } catch (err) {
    console.error(err);
  }
}`,
      link: "https://github.com/BvspSite"
    },
    {
      title: "Portfolio Website",
      description: "Professional portfolio website with modern design",
      tech: ["React", "Tailwind CSS", "TypeScript"],
      code: `interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}`,
      link: "https://github.com/BvspSite"
    }
  ];

  const languages = [
     "HTML", "CSS", "PHP", "JavaScript", "Python", "SQL", "C#"
  ];

  const skills = [
    { name: "HTML/CSS 🗿", level: 95, category: "frontend" },
    { name: "JavaScript", level: 90, category: "frontend" },
    { name: "React", level: 85, category: "frontend" },
    { name: "TypeScript", level: 80, category: "frontend" },
    { name: "Tailwind CSS", level: 90, category: "frontend" },
    { name: "Node.js", level: 75, category: "backend" },
    { name: "Express", level: 70, category: "backend" },
    { name: "MySQL", level: 80, category: "backend" },
    { name: "MongoDB", level: 75, category: "backend" },
    { name: "C#", level: 70, category: "backend" },
    { name: "Git & GitHub", level: 85, category: "tools" },
    { name: "Figma", level: 20, category: "design" },
    { name: "Responsive Design", level: 90, category: "design" }
  ];

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Freelance",
      period: "2023 - Present",
      description: "Developing responsive web applications using React, Node.js, and modern web technologies. Focus on creating intuitive user interfaces and scalable backend systems.",
      type: "freelance"
    },
    {
      title: "Web Development Student",
      company: "SMK Negeri 1 Denpasar",
      period: "2023 - Present",
      description: "Learning software engineering principles, web development, database management, and object-oriented programming. Active in school projects and competitions.",
      type: "education"
    },
    {
      title: "Self-Taught Developer",
      company: "Personal Projects",
      period: "2022 - Present",
      description: "Building various projects to learn new technologies. Completed online courses in React, TypeScript, and modern web development practices.",
      type: "learning"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form validation and submission
  const validateForm = () => {
    const errors: {name?: string; email?: string; message?: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nama harus diisi!';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email harus diisi!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid!';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Pesan harus diisi!';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Pesan minimal 10 karakter!';
    }
    
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous states
    setFormErrors({});
    setFormStatus('idle');
    setShowFormFeedback(false);
    
    // Validate
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      // Has errors - show error animation
      setFormErrors(errors);
      setFormStatus('error');
      setShowFormFeedback(true);
      
      // Hide feedback after 3 seconds
      setTimeout(() => {
        setShowFormFeedback(false);
      }, 3000);
      
      return;
    }
    
    // No errors - simulate sending
    setFormStatus('sending');
    
    setTimeout(() => {
      // Success!
      setFormStatus('success');
      setShowFormFeedback(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setFormStatus('idle');
        setShowFormFeedback(false);
      }, 3000);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center z-50 overflow-hidden">
        {/* Animated Stars Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Rocket Animation */}
        <div className="relative z-10">
          {/* Rocket Container */}
          <div className="rocket-container">
            <div className="text-9xl animate-rocket-fly">
              🚀
            </div>
            {/* Rocket Trail */}
            <div className="rocket-trail"></div>
          </div>

          {/* Loading Text */}
          <div className="text-center mt-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4 animate-pulse">
              Fabrilio Portfolio
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-gray-400 text-sm mt-4 animate-pulse">Launching...</p>
          </div>
        </div>

        {/* Zoom Effect Overlay */}
        <div className="absolute inset-0 zoom-overlay"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text glow">
              Fabrilio
            </a>
            
            {/* Mobile menu button & theme toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : theme === 'light' ? (
                  <Moon className="w-5 h-5 text-blue-400" />
                ) : (
                  <Sparkles className="w-5 h-5 text-purple-400" />
                )}
              </button>
              <button onClick={() => setIsNavOpen(!isNavOpen)}>
              {isNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Skills', 'Projects', 'About', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-300'}`}
                >
                  {item}
                </a>
              ))}
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-all duration-300 group relative overflow-hidden"
                aria-label="Toggle theme"
              >
                <div className="relative z-10">
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-400 transition-transform group-hover:rotate-45" />
                  ) : theme === 'light' ? (
                    <Moon className="w-5 h-5 text-blue-400 transition-transform group-hover:-rotate-12" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-purple-400 transition-transform group-hover:rotate-12" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isNavOpen && (
            <div className="md:hidden py-4">
              {['Home', 'Skills', 'Projects', 'About', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsNavOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="hero-bg" />
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text glow animate-fade-in">
              Fabrilio
            </h1>
            <div className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 min-h-[2rem] font-mono px-4">
              <span className="typing-cursor">{typedText}</span>
              <span className="animate-blink">|</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {languages.map((lang, index) => (
                <span
                  key={lang}
                  className="language-tag px-5 py-2.5"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {lang}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-6 mb-8">
              <a href="https://github.com/BvspSite" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-blue-400 transition-all transform hover:scale-125 hover:-translate-y-1">
                <Github size={32} />
              </a>
              <a href="https://www.instagram.com/pabrilll_?igsh=MWtzdzF4ZXppdTcyOA==" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-pink-400 transition-all transform hover:scale-125 hover:-translate-y-1">
                <Instagram size={32} />
              </a>
              <a href="mailto:****@gmail.com" className="social-icon text-gray-400 hover:text-purple-400 transition-all transform hover:scale-125 hover:-translate-y-1">
                <Mail size={32} />
              </a>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
              <Download size={20} />
              Download CV
            </a>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text reveal">My Skills</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto reveal">
            Teknologi dan tools yang saya kuasai untuk membangun aplikasi web modern
          </p>

          {/* Skills with Progress Bars */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-gray-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out skill-progress"
                      style={{ 
                        width: `${skill.level}%`,
                        animation: `slideIn 1s ease-out ${index * 0.1}s forwards`,
                        transform: 'translateX(-100%)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="skill-card group transform hover:-translate-y-2 transition-all duration-300 reveal">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl group-hover:scale-110 transition-transform">
                  <Code2 className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Frontend Development</h3>
              </div>
              <p className="text-gray-300 mb-4">Building interactive & responsive user interfaces</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">HTML</span>
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">CSS</span>
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">JavaScript</span>
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">React</span>
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">TypeScript</span>
              </div>
            </div>

            <div className="skill-card group transform hover:-translate-y-2 transition-all duration-300 reveal">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Backend Development</h3>
              </div>
              <p className="text-gray-300 mb-4">Creating robust server-side applications</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">Node.js</span>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">Express</span>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">MySQL</span>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">MongoDB</span>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">C#</span>
              </div>
            </div>

            <div className="skill-card group transform hover:-translate-y-2 transition-all duration-300 reveal">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-xl group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white">UI/UX Design</h3>
              </div>
              <p className="text-gray-300 mb-4">Designing beautiful user experiences</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-sm text-pink-300">Figma</span>
                <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-sm text-pink-300">Tailwind CSS</span>
                <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-sm text-pink-300">Responsive Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text reveal">Work Experience</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto reveal">
            My professional journey and learning experiences
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 md:pl-12 border-l-2 border-blue-500/50 hover:border-blue-500 transition-colors reveal">
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 shadow-lg"></div>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all transform hover:-translate-x-2">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-blue-400" />
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      </div>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      {exp.company}
                    </p>
                    <p className="text-gray-300">{exp.description}</p>
                    <div className="mt-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exp.type === 'freelance' ? 'bg-green-500/10 border border-green-500/20 text-green-300' :
                        exp.type === 'education' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-300' :
                        'bg-purple-500/10 border border-purple-500/20 text-purple-300'
                      }`}>
                        {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Featured Projects</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Beberapa project yang telah saya kerjakan dengan berbagai teknologi modern
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="project-card group transform hover:scale-[1.02] transition-all duration-300">
                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                      <Code2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                    >
                      <ExternalLink size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </a>
                  </div>

                  {/* Project Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs font-medium text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Code Preview */}
                  <div className="code-block mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                      </div>
                      <span className="text-xs text-gray-500">preview.js</span>
                    </div>
                    <pre className="text-xs">
                      <code>{project.code}</code>
                    </pre>
                  </div>

                  {/* View Project Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group/link"
                  >
                    View Project 
                    <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* More Projects Link */}
          <div className="text-center mt-12">
            <a
              href="https://github.com/BvspSite"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-all group"
            >
              <Github size={20} />
              View More on GitHub
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">About Me</h2>
          
          <div className="max-w-5xl mx-auto">
            {/* Introduction Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 mb-8 shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-2 h-16 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Hai, Perkenalkan Saya</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text">
                    FABRILIO 
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
              Saya adalah seorang yang memiliki ketertarikan mendalam pada dunia teknologi,
               khususnya dalam pengembangan web (web development) dan bahasa pemrograman C#. 
               Saya percaya bahwa teknologi dapat memberikan dampak positif bagi kehidupan manusia, 
               dan saya ingin menjadi bagian dari itu.
              </p>
            </div>

            {/* Journey and Goals Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Journey Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                    <Code2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Perjalanan Saya</h3>
          </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ketertarikan saya pada web development dimulai ketika saya menyadari potensi besar internet untuk menghubungkan orang dan informasi.
                  Saya mulai mempelajari dasar-dasar HTML, CSS, dan JavaScript untuk membangun antarmuka pengguna yang menarik dan interaktif.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Seiring berjalannya waktu, saya mendalami framework modern seperti React untuk mengembangkan aplikasi web yang lebih kompleks.
                  Saya percaya web development bukan hanya menulis kode, tetapi memahami kebutuhan pengguna.
                </p>
        </div>

              {/* Goals Card */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Tujuan Saya</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Saya memiliki harapan besar untuk menjadi seorang pengembang web dan C# yang handal dan profesional.
                  Saya ingin terus belajar dan mengembangkan diri agar dapat memberikan kontribusi yang berarti bagi dunia teknologi.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Saya percaya bahwa dengan kerja keras, dedikasi, dan semangat pantang menyerah, 
                  saya dapat mencapai tujuan saya dan menjadi orang yang berguna bagi orang lain.
                </p>
              </div>
            </div>

            {/* Closing Message */}
            <div className="mt-8 text-center">
              <div className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-8 py-4 rounded-xl border border-gray-700/50">
                <p className="text-gray-300 text-lg italic">
                  "Mari kita bersama-sama membangun masa depan yang lebih baik melalui teknologi"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certificates Section */}
      <section id="education" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Education & Certificates</h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="space-y-8">
              {/* Education Item 1 */}
              <div className="relative pl-8 md:pl-12 border-l-2 border-blue-500/50 hover:border-blue-500 transition-colors">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900 shadow-lg shadow-blue-500/50"></div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all transform hover:-translate-x-2">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">SMK</h3>
                    <span className="ml-auto text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      2023 - Sekarang
                    </span>
                  </div>
                  <p className="text-blue-400 font-semibold mb-2">Rekayasa Perangkat Lunak (RPL)</p>
                  <p className="text-gray-300">
                    Mempelajari dasar-dasar pemrograman, web development, database management, dan software engineering.
                  </p>
                </div>
              </div>

              {/* Certificate Item 1 */}
              <div className="relative pl-8 md:pl-12 border-l-2 border-purple-500/50 hover:border-purple-500 transition-colors">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-gray-900 shadow-lg shadow-purple-500/50"></div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all transform hover:-translate-x-2">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Award className="w-5 h-5 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Web Development Fundamentals</h3>
                    <span className="ml-auto text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      2024
                    </span>
                  </div>
                  <p className="text-purple-400 font-semibold mb-2">Online Course</p>
                  <p className="text-gray-300">
                    Sertifikasi dalam HTML, CSS, JavaScript, dan framework modern untuk pengembangan web.
              </p>
            </div>
          </div>

              {/* Add more education/certificates as needed */}
              <div className="relative pl-8 md:pl-12 border-l-2 border-green-500/50 hover:border-green-500 transition-colors">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900 shadow-lg shadow-green-500/50"></div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:shadow-lg hover:shadow-green-500/10 transition-all transform hover:-translate-x-2">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Award className="w-5 h-5 text-green-400" />
                    <h3 className="text-xl font-bold text-white">React & TypeScript</h3>
                    <span className="ml-auto text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      2024
                    </span>
                  </div>
                  <p className="text-green-400 font-semibold mb-2">Self-Learning</p>
                  <p className="text-gray-300">
                    Mendalami React ecosystem, TypeScript, dan modern web development tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Let's Connect</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Saya terbuka untuk kolaborasi, diskusi, atau sekadar bertemu orang baru. Mari terhubung!
          </p>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl transition-all duration-300 ${formStatus === 'error' ? 'animate-shake border-red-500/50' : formStatus === 'success' ? 'border-green-500/50' : ''}`}>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Send className={`w-6 h-6 transition-all duration-300 ${formStatus === 'sending' ? 'animate-bounce text-blue-400' : formStatus === 'success' ? 'text-green-400' : formStatus === 'error' ? 'text-red-400' : 'text-blue-400'}`} />
                Send Me a Message
              </h3>
              
              {/* Feedback Messages */}
              {showFormFeedback && formStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg animate-slide-down">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl animate-wiggle">⚠️</span>
                    <div className="flex-1">
                      <p className="text-red-400 font-semibold mb-1">Oops! Ada yang kurang:</p>
                      {Object.values(formErrors).map((error, idx) => (
                        <p key={idx} className="text-red-300 text-sm">• {error}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {showFormFeedback && formStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg animate-slide-down">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl animate-bounce">✅</span>
                    <div className="flex-1">
                      <p className="text-green-400 font-semibold mb-1">Berhasil Terkirim! 🎉</p>
                      <p className="text-green-300 text-sm">Terima kasih! Pesan Anda telah diterima.</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Your Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 outline-none transition-all text-white ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 animate-shake' : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'}`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (formErrors.name) setFormErrors({...formErrors, name: undefined});
                    }}
                  />
                  {formErrors.name && (
                    <p className="text-red-400 text-xs mt-1 animate-slide-down">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Your Email</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 outline-none transition-all text-white ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 animate-shake' : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'}`}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (formErrors.email) setFormErrors({...formErrors, email: undefined});
                    }}
                  />
                  {formErrors.email && (
                    <p className="text-red-400 text-xs mt-1 animate-slide-down">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Message</label>
                  <textarea
                    rows={5}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg focus:ring-2 outline-none transition-all text-white resize-none ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 animate-shake' : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'}`}
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({...formData, message: e.target.value});
                      if (formErrors.message) setFormErrors({...formErrors, message: undefined});
                    }}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-400 text-xs mt-1 animate-slide-down">{formErrors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full py-4 px-6 font-semibold rounded-lg transition-all duration-300 transform ${
                    formStatus === 'sending' 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white cursor-wait scale-95' 
                      : formStatus === 'success'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105 shadow-lg shadow-green-500/50'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50'
                  }`}
                >
                  {formStatus === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </span>
                  ) : formStatus === 'success' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-bounce">✓</span>
                      Terkirim!
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:axxxxx@gmail.com"
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all group"
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">xxxxx@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/+6208133******?text=HAI+PABRILER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all group"
                  >
                    <div className="p-3 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">WhatsApp</p>
                      <p className="text-white font-medium">+62 813 xxxxx</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/BvspSite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all group text-center"
                  >
                    <Github className="w-6 h-6 mx-auto mb-2 text-gray-400 group-hover:text-white transition-colors" />
                    <p className="text-sm text-gray-400">GitHub</p>
                  </a>
                  <a
                    href="https://www.instagram.com/pabrilll_?igsh=MWtzdzF4ZXppdTcyOA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all group text-center"
                  >
                    <Instagram className="w-6 h-6 mx-auto mb-2 text-gray-400 group-hover:text-pink-400 transition-colors" />
                    <p className="text-sm text-gray-400">Instagram</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Pabril. All rights reserved.</p>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed left-6 bottom-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 animate-bounce-subtle"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Theme Customizer */}
      <ThemeCustomizer />
    </div>
  );
}

export default App;