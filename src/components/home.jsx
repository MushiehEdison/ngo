import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, Users, MessageSquare, Calendar, User, ArrowRight, Eye, Play, TrendingUp, Target, Award, Globe2, ChevronLeft } from 'lucide-react';
import Header from './PageComponents/header';
import Footer from './PageComponents/footer';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [hoveredGallery, setHoveredGallery] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [projectsPerView, setProjectsPerView] = useState(3);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle responsive projects per view
  useEffect(() => {
    const updateProjectsPerView = () => {
      if (window.innerWidth < 768) {
        setProjectsPerView(1); // Mobile: 1 project
      } else if (window.innerWidth < 1024) {
        setProjectsPerView(2); // Tablet: 2 projects
      } else {
        setProjectsPerView(3); // Desktop: 3 projects
      }
    };

    updateProjectsPerView();
    window.addEventListener('resize', updateProjectsPerView);
    return () => window.removeEventListener('resize', updateProjectsPerView);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "7,000+", label: "Lives Impacted", icon: Heart },
    { number: "50+", label: "Projects Completed", icon: Target },
    { number: "1", label: "Country Reached", icon: Globe2 },
    { number: "95%", label: "Success Rate", icon: Award }
  ];

  const newsArticles = [
    {
      title: "Do It 4/W Her: Ending Violence Against Women",
      excerpt: "Join us on December 7, 2024, for a gathering focused on ending violence against women and girls, in collaboration with activist Amy Banda.",
      date: "September 18, 2025",
      author: "I'm Human Org Team",
      category: "Event",
      readTime: "3 min"
    },
    {
      title: "My Voice Matters: Empowering Girls in Cameroon",
      excerpt: "Advocacy program reminding girls of their potential through workshops, mentorship, and rights education. Seeking partners to scale impact.",
      date: "September 10, 2025",
      author: "Asobo Paul Teneng",
      category: "Program Update",
      readTime: "4 min"
    },
    {
      title: "International Youth Day: Celebrating Young Leaders",
      excerpt: "Tribute to young community leaders driving change in African development, with focus on vulnerable youth in Cameroon.",
      date: "August 12, 2025",
      author: "I'm Human Org Team",
      category: "Impact Story",
      readTime: "5 min"
    }
  ];

  const projects = [
    {
      title: "My Voice Matters",
      description: "Advocacy and empowerment program for vulnerable girls through workshops, mentorship, and rights education to build confidence.",
      status: "Active",
      progress: 80,
      funding: "$15,000",
      goal: "$20,000",
      supporters: 150
    },
    {
      title: "Alternative Learning Programs",
      description: "Non-formal education on digital skills, literacy, and vocational training for IDP women, children, and girls in Douala.",
      status: "Active",
      progress: 65,
      funding: "$10,500",
      goal: "$18,000",
      supporters: 120
    },
    {
      title: "Livelihood Support & Business Grants",
      description: "Grants, digital support, and entrepreneurship training to help displaced women start small businesses for economic independence.",
      status: "Planning",
      progress: 40,
      funding: "$8,000",
      goal: "$25,000",
      supporters: 89
    },
    {
      title: "Mental Health and Psychosocial Support",
      description: "Mobile units offering counseling and community dialogues on trauma from GBV and conflict for women and children.",
      status: "Active",
      progress: 70,
      funding: "$12,000",
      goal: "$16,000",
      supporters: 200
    }
  ];

  // Auto-scroll for projects
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentProjectIndex(prev => {
        const maxIndex = Math.max(0, projects.length - projectsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, projects.length, projectsPerView]);

  const nextProject = () => {
    setIsAutoScrolling(false);
    setCurrentProjectIndex(prev => {
      const maxIndex = Math.max(0, projects.length - projectsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const prevProject = () => {
    setIsAutoScrolling(false);
    setCurrentProjectIndex(prev => {
      const maxIndex = Math.max(0, projects.length - projectsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const galleryItems = [
    {
      title: "Community Solidarity",
      shortDesc: "Building inclusive communities in Cameroon",
      fullDesc: "I'm Human Org fosters unity through grassroots initiatives, empowering vulnerable populations in Douala and beyond."
    },
    {
      title: "Educational Empowerment",
      shortDesc: "Alternative learning for IDPs",
      fullDesc: "Providing digital skills, literacy, and vocational training to rebuild lives for displaced women and children."
    },
    {
      title: "Ending Gender-Based Violence",
      shortDesc: "Advocacy against GBV",
      fullDesc: "Programs like My Voice Matters promote women's rights and support survivors through counseling and awareness."
    },
    {
      title: "Livelihood Programs",
      shortDesc: "Economic independence for women",
      fullDesc: "Business grants and skills training enable self-reliance for IDP families facing socioeconomic challenges."
    },
    {
      title: "Youth Leadership",
      shortDesc: "Empowering young leaders",
      fullDesc: "Mentorship initiatives prepare Cameroonian youth for community development and humanitarian action."
    },
    {
      title: "Mental Health Support",
      shortDesc: "Psychosocial care for vulnerable",
      fullDesc: "Mobile units address trauma from conflict and violence, promoting resilience in affected communities."
    }
  ];

  const fadeInClass = "opacity-0 translate-y-12 transition-all duration-1000 ease-out";
  const slideInFromLeft = "opacity-0 -translate-x-12 transition-all duration-1000 ease-out";
  const slideInFromRight = "opacity-0 translate-x-12 transition-all duration-1000 ease-out";
  const scaleIn = "opacity-0 scale-90 transition-all duration-1000 ease-out";
  const visibleClass = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 border-b-2 border-gray-200">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-32 h-32 border-2 border-red-200 rounded-full opacity-30"
            style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)` }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-24 h-24 border-2 border-blue-200 rounded-lg opacity-30"
            style={{ transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * -0.05}deg)` }}
          ></div>
          <div 
            className="absolute bottom-32 left-1/4 w-40 h-40 border-2 border-purple-200 rounded-full opacity-20"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              {/* Animated Badge */}
              <div className="inline-flex items-center border-2 border-red-600 px-4 py-2 rounded-full text-red-600 font-medium mb-8 animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-ping"></div>
                Empowering Since Establishment
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="block animate-[slideInLeft_1s_ease-out]">Create Inclusive</span>
                <span className="block text-red-600 animate-[slideInLeft_1s_ease-out_0.2s_both]">Communities</span>
                <span className="block animate-[slideInLeft_1s_ease-out_0.4s_both]">for Every Human</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed animate-[fadeIn_1s_ease-out_0.6s_both]">
                I'm Human Org supports vulnerable women, girls, and children in Cameroon through education, skills training, and humanitarian aid.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16 animate-[fadeIn_1s_ease-out_0.8s_both]">
                <button className="group relative bg-red-600 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-200 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    Get Involved
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                
                <button className="group border-2 border-gray-400 text-gray-700 px-10 py-5 rounded-xl font-semibold transition-all duration-300 hover:border-red-600 hover:text-red-600 hover:shadow-lg flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-current rounded-full flex items-center justify-center mr-3 group-hover:animate-pulse">
                    <Play className="h-5 w-5 ml-1" />
                  </div>
                  Watch Our Impact
                </button>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 animate-[fadeIn_1s_ease-out_1s_both]">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto group-hover:border-red-600 group-hover:scale-110 transition-all duration-300">
                        <stat.icon className="h-7 w-7 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
                      </div>
                      <div className="absolute -inset-2 border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-[fadeIn_1s_ease-out_0.4s_both]">
              {/* Main Image Container */}
              <div className="relative group">
                <div className="border-2 border-gray-400 rounded-2xl h-96 lg:h-[500px] flex items-center justify-center group-hover:border-red-600 transition-all duration-500 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="text-center">
                    <div className="w-24 h-24 border-2 border-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Play className="h-10 w-10 text-red-600 ml-1" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-700">Our Empowerment Journey</p>
                    <p className="text-gray-500 mt-2">See lives transformed</p>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-6 -right-6 bg-white border-2 border-red-600 rounded-xl p-4 shadow-lg animate-bounce">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-semibold text-gray-800">Growing Impact</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-6 bg-white border-2 border-blue-600 rounded-xl p-4 shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-800">Community Unity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section 
        id="news-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 ${fadeInClass} ${visibleSections['news-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Latest News</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stay informed about our programs, events, and impact in supporting vulnerable communities in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {newsArticles.map((article, index) => (
              <div 
                key={index} 
                className="group border-2 border-gray-300 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="relative border-b-2 border-gray-300 h-56 flex items-center justify-center group-hover:border-red-600 transition-colors duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-blue-50 opacity-50"></div>
                  <span className="relative text-gray-600 font-medium text-lg z-10">Featured Story</span>
                  <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="border-2 border-red-600 text-red-600 px-4 py-1 rounded-full text-xs font-semibold tracking-wide">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  
                  <button className="group/btn flex items-center text-red-600 hover:text-red-800 font-semibold transition-all duration-300 transform hover:translate-x-1">
                    Read Full Story
                    <ChevronRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section with Auto-Scroll Carousel */}
      <section 
        id="projects-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-gray-50 ${slideInFromLeft} ${visibleSections['projects-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Programs</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our initiatives empowering vulnerable women, girls, and children in Cameroon.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevProject}
              className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-300 hover:border-red-600 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-gray-600 hover:text-red-600" />
            </button>
            
            <button
              onClick={nextProject}
              className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-300 hover:border-red-600 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-600 hover:text-red-600" />
            </button>

            {/* Carousel Track */}
            <div className="overflow-hidden mx-8 md:mx-16">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ 
                  transform: `translateX(-${currentProjectIndex * (100 / projectsPerView)}%)`
                }}
              >
                {projects.map((project, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 px-2 md:px-4 ${
                      projectsPerView === 1 ? 'w-full' : 
                      projectsPerView === 2 ? 'w-1/2' : 'w-1/3'
                    }`}
                  >
                    <div className="group bg-white border-2 border-gray-300 rounded-2xl p-4 md:p-8 hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl h-full">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 md:mb-6">
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 flex-1 mb-2 sm:mb-0 sm:mr-4">
                          {project.title}
                        </h3>
                        <span className={`border-2 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap self-start ${
                          project.status === 'Active' ? 'border-red-600 text-red-600 bg-red-50' :
                          project.status === 'Planning' ? 'border-yellow-600 text-yellow-600 bg-yellow-50' :
                          'border-blue-600 text-blue-600 bg-blue-50'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                        {project.description}
                      </p>
                      
                      <div className="mb-6 md:mb-8">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs md:text-sm font-semibold text-gray-700">Progress</span>
                          <span className="text-xs md:text-sm font-bold text-red-600">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-1000 ease-out transform origin-left"
                            style={{
                              width: visibleSections['projects-section'] ? `${project.progress}%` : '0%'
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                        <div className="flex justify-between items-center">
                          <span className="text-xs md:text-sm text-gray-600">Raised</span>
                          <span className="font-bold text-gray-900 text-sm md:text-base">{project.funding}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs md:text-sm text-gray-600">Goal</span>
                          <span className="font-bold text-gray-900 text-sm md:text-base">{project.goal}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs md:text-sm text-gray-600">Supporters</span>
                          <span className="font-bold text-red-600 text-sm md:text-base">{project.supporters}</span>
                        </div>
                      </div>
                      
                      <button className="w-full bg-red-600 text-white py-3 md:py-4 rounded-xl hover:bg-red-700 font-semibold transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg text-sm md:text-base">
                        Support This Program
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-6 md:mt-8 space-x-2">
              {Array.from({ length: Math.max(1, projects.length - projectsPerView + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentProjectIndex(index);
                    setIsAutoScrolling(false);
                    setTimeout(() => setIsAutoScrolling(true), 10000);
                  }}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex 
                      ? 'bg-red-600 w-6 md:w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Auto-scroll indicator */}
            <div className="text-center mt-6">
              <button 
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isAutoScrolling ? 'text-red-600' : 'text-gray-500'
                }`}
              >
                {isAutoScrolling ? '⏸️ Pause Auto-scroll' : '▶️ Resume Auto-scroll'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section 
        id="action-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 ${scaleIn} ${visibleSections['action-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">What You Can Do</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Every action helps create inclusive communities for vulnerable populations in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Heart,
                title: "Make a Donation",
                description: "Support education, skills training, and humanitarian aid for IDPs and vulnerable women in Cameroon.",
                action: "Donate Now",
                color: "red"
              },
              {
                icon: Users,
                title: "Volunteer Your Time",
                description: "Join our Douala-based team for workshops, events, and community outreach programs.",
                action: "Get Involved",
                color: "blue"
              },
              {
                icon: MessageSquare,
                title: "Amplify Our Mission",
                description: "Share our work on social media and advocate for gender equality and child rights in Cameroon.",
                action: "Share & Advocate",
                color: "purple"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group text-center border-2 border-gray-300 rounded-2xl p-10 hover:border-red-600 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="relative mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 border-2 rounded-2xl group-hover:scale-110 transition-all duration-300 ${
                    item.color === 'red' ? 'border-red-400 group-hover:border-red-600' :
                    item.color === 'blue' ? 'border-blue-400 group-hover:border-blue-600' :
                    'border-purple-400 group-hover:border-purple-600'
                  }`}>
                    <item.icon className={`h-9 w-9 transition-colors duration-300 ${
                      item.color === 'red' ? 'text-red-500 group-hover:text-red-600' :
                      item.color === 'blue' ? 'text-blue-500 group-hover:text-blue-600' :
                      'text-purple-500 group-hover:text-purple-600'
                    }`} />
                  </div>
                  <div className="absolute -inset-4 border border-gray-200 rounded-3xl opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {item.description}
                </p>
                
                <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  item.color === 'red' ? 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white' :
                  item.color === 'blue' ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' :
                  'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                }`}>
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section with Fixed Individual Hover */}
      <section 
        id="gallery-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-gray-50 ${slideInFromRight} ${visibleSections['gallery-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Impact Gallery</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Witness the transformation and resilience of communities we serve in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <div 
                key={index} 
                className="relative group border-2 border-gray-300 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl bg-white cursor-pointer"
                onMouseEnter={() => setHoveredGallery(index)}
                onMouseLeave={() => setHoveredGallery(null)}
                style={{
                  height: hoveredGallery === index ? 'auto' : '420px'
                }}
              >
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/10 group-hover:from-red-500/20 group-hover:to-blue-500/20 transition-all duration-500"></div>
                  <span className="relative text-gray-600 font-semibold text-lg z-10">Impact Story {index + 1}</span>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="h-12 w-12 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </div>
                
                <div className="p-6 bg-white border-t-2 border-gray-300 group-hover:border-red-600 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <div className="relative">
                    {/* Always show short description */}
                    <p className="text-gray-600 leading-relaxed mb-3">
                      {item.shortDesc}
                    </p>
                    
                    {/* Expanded content appears only on hover */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      hoveredGallery === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-gray-600 leading-relaxed text-sm mb-4 pt-2 border-t border-gray-200">
                        {item.fullDesc}
                      </p>
                      <button className="text-red-600 hover:text-red-800 font-semibold flex items-center transition-all duration-300">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/gallery" className="group border-2 border-red-600 text-red-600 px-12 py-5 rounded-xl hover:bg-red-600 hover:text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
               View Complete Gallery 
              <ArrowRight className="inline-block ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section 
        id="metrics-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-gradient-to-r from-red-600 to-red-700 ${fadeInClass} ${visibleSections['metrics-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Impact in Cameroon</h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
              Numbers showcasing our dedication to vulnerable women, children, and IDPs.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "7,000+", label: "People Supported", suffix: "across Cameroon" },
              { number: "50+", label: "Community Projects", suffix: "completed" },
              { number: "Douala", label: "Base of Operations", suffix: "Littoral Region" },
              { number: "100%", label: "Volunteer-Driven", suffix: "impact" }
            ].map((metric, index) => (
              <div key={index} className="text-center group" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 group-hover:bg-white/20 group-hover:border-white/40 group-hover:scale-105 transition-all duration-500">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {metric.number}
                  </div>
                  <div className="text-lg font-semibold text-red-100 mb-1">{metric.label}</div>
                  <div className="text-sm text-red-200">{metric.suffix}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section 
        id="newsletter-section" 
        data-animate
        className={`py-20 border-b-2 border-gray-200 ${scaleIn} ${visibleSections['newsletter-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-red-50 border-2 border-gray-300 rounded-3xl p-12 hover:border-red-600 transition-colors duration-500">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stay Connected with Our Mission
            </h3>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Receive updates on programs, events, and ways to support inclusive communities in Cameroon.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-8 py-5 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none text-gray-900 font-medium transition-colors duration-300"
              />
              <button className="bg-red-600 text-white px-10 py-5 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap">
                Join Our Community
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Join hundreds of supporters. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HomePage;