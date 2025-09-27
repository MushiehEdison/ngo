import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, Users, Target, Award, Globe2, Calendar, MapPin, Mail, Phone, Linkedin, Twitter, Facebook, Quote, ArrowRight, Eye, TrendingUp, Shield, Lightbulb, Handshake } from 'lucide-react';
import Header from './PageComponents/header';
import Footer from './PageComponents/footer';

const AboutUsPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Auto-cycle timeline items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineItem(prev => (prev + 1) % timelineData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "7", label: "Years of Impact", icon: Calendar },
    { number: "7K+", label: "Lives Touched", icon: Heart },
    { number: "5", label: "Regions Reached", icon: Globe2 },
    { number: "90%", label: "Community Trust", icon: Award }
  ];

  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain transparency and accountability in all our efforts to empower vulnerable communities in Cameroon.",
      color: "blue"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We develop creative solutions to address gender-based violence and socioeconomic challenges for women and children.",
      color: "yellow"
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description: "We partner with local and global organizations to amplify our impact for displaced women and girls.",
      color: "red"
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "Our work is driven by a deep commitment to the dignity and well-being of vulnerable populations.",
      color: "red"
    }
  ];

  const teamMembers = [
    {
      name: "Esther Ngo",
      role: "Founder & Executive Director",
      bio: "With over a decade of advocacy, Esther leads I'm Human Org’s mission to empower women and girls in Cameroon.",
      image: "Founder",
      linkedin: "#",
      twitter: "https://x.com/imhuman_org"
    },
    {
      name: "Paul Teneng",
      role: "Program Coordinator",
      bio: "Paul manages community programs, focusing on education and livelihood support for displaced families.",
      image: "Coordinator",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Mary Shu",
      role: "Outreach Manager",
      bio: "Mary drives community engagement and advocacy efforts to combat gender-based violence in Douala.",
      image: "Outreach",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Grace Mbi",
      role: "Mental Health Lead",
      bio: "Grace oversees psychosocial support programs for women and children affected by conflict.",
      image: "MentalHealth",
      linkedin: "#",
      twitter: "#"
    }
  ];

  const timelineData = [
    {
      year: "2018",
      title: "Organization Founded",
      description: "I'm Human Org was established to empower vulnerable women, girls, and children in Cameroon.",
      milestone: "Foundation"
    },
    {
      year: "2019",
      title: "My Voice Matters Launch",
      description: "Launched the flagship program to advocate for girls’ rights and combat gender-based violence.",
      milestone: "Advocacy"
    },
    {
      year: "2021",
      title: "Alternative Learning Program",
      description: "Initiated non-formal education for displaced women and children, focusing on digital skills.",
      milestone: "Education"
    },
    {
      year: "2023",
      title: "Livelihood Support Expansion",
      description: "Expanded business grants and training to support 300+ women in starting small businesses.",
      milestone: "Economic Empowerment"
    },
    {
      year: "2025",
      title: "Mental Health Initiative",
      description: "Launched mobile units for psychosocial support, reaching 1,000+ conflict-affected individuals.",
      milestone: "Mental Health"
    }
  ];

  const testimonials = [
    {
      quote: "I'm Human Org’s programs gave me the skills to start my own business and support my family.",
      author: "Amina T., Beneficiary",
      role: "Entrepreneur",
      location: "Douala"
    },
    {
      quote: "Their advocacy workshops empowered my daughter to speak up against violence. Truly life-changing.",
      author: "Clara M., Parent",
      role: "Community Member",
      location: "Buea"
    },
    {
      quote: "The mental health support provided by I'm Human Org helped our community heal from conflict trauma.",
      author: "John K., Volunteer",
      role: "Community Leader",
      location: "Limbe"
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
                Empowering Since 2018
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="block animate-[slideInLeft_1s_ease-out]">About</span>
                <span className="block text-red-600 animate-[slideInLeft_1s_ease-out_0.2s_both]">I'm Human Org</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed animate-[fadeIn_1s_ease-out_0.6s_both]">
                I'm Human Org is dedicated to empowering vulnerable women, girls, and children in Cameroon through education, advocacy, and humanitarian aid.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16 animate-[fadeIn_1s_ease-out_0.8s_both]">
                <button className="group relative bg-red-600 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-200 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    Our Impact Stories
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                
                <button className="group border-2 border-gray-400 text-gray-700 px-10 py-5 rounded-xl font-semibold transition-all duration-300 hover:border-red-600 hover:text-red-600 hover:shadow-lg flex items-center justify-center">
                  <Users className="h-5 w-5 mr-3" />
                  Meet Our Team
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
                      <Heart className="h-10 w-10 text-red-600" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-700">Our Story</p>
                    <p className="text-gray-500 mt-2">7 years of empowerment</p>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-6 -right-6 bg-white border-2 border-red-600 rounded-xl p-4 shadow-lg animate-bounce">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                    <span className="text-sm font-semibold text-gray-800">Empowering Growth</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-6 bg-white border-2 border-blue-600 rounded-xl p-4 shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                  <div className="flex items-center space-x-2">
                    <Globe2 className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-800">Community Impact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section 
        id="mission-vision-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-gray-50 ${slideInFromLeft} ${visibleSections['mission-vision-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div className="group border-2 border-gray-300 rounded-2xl p-10 hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl bg-white">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-red-400 rounded-2xl mb-6 group-hover:border-red-600 group-hover:scale-110 transition-all duration-300">
                  <Target className="h-10 w-10 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 group-hover:text-red-600 transition-colors duration-300">
                  Our Mission
                </h2>
              </div>
              
              <div className="border-2 border-gray-300 rounded-xl h-48 flex items-center justify-center mb-8 group-hover:border-red-600 transition-colors duration-300 bg-gradient-to-br from-red-50 to-blue-50">
                <Eye className="h-12 w-12 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed text-center">
                To empower vulnerable women, girls, and children in Cameroon through education, advocacy, and humanitarian support, fostering inclusive communities.
              </p>
            </div>

            {/* Vision */}
            <div className="group border-2 border-gray-300 rounded-2xl p-10 hover:border-blue-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl bg-white">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-blue-400 rounded-2xl mb-6 group-hover:border-blue-600 group-hover:scale-110 transition-all duration-300">
                  <Eye className="h-10 w-10 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">
                  Our Vision
                </h2>
              </div>
              
              <div className="border-2 border-gray-300 rounded-xl h-48 flex items-center justify-center mb-8 group-hover:border-blue-600 transition-colors duration-300 bg-gradient-to-br from-blue-50 to-purple-50">
                <Lightbulb className="h-12 w-12 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed text-center">
                A Cameroon where every woman, girl, and child has access to education, economic opportunities, and a life free from violence and discrimination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section 
        id="values-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 ${fadeInClass} ${visibleSections['values-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              These principles guide our work to empower vulnerable communities in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index} 
                className="group text-center border-2 border-gray-300 rounded-2xl p-8 hover:border-red-600 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl bg-white"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="relative mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 border-2 rounded-2xl group-hover:scale-110 transition-all duration-300 ${
                    value.color === 'blue' ? 'border-blue-400 group-hover:border-blue-600' :
                    value.color === 'yellow' ? 'border-yellow-400 group-hover:border-yellow-600' :
                    value.color === 'red' ? 'border-red-400 group-hover:border-red-600' :
                    'border-red-400 group-hover:border-red-600'
                  }`}>
                    <value.icon className={`h-9 w-9 transition-colors duration-300 ${
                      value.color === 'blue' ? 'text-blue-500 group-hover:text-blue-600' :
                      value.color === 'yellow' ? 'text-yellow-500 group-hover:text-yellow-600' :
                      value.color === 'red' ? 'text-red-500 group-hover:text-red-600' :
                      'text-red-500 group-hover:text-red-600'
                    }`} />
                  </div>
                  <div className="absolute -inset-4 border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        id="timeline-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-gray-50 ${slideInFromRight} ${visibleSections['timeline-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Seven years of empowering vulnerable women, girls, and children in Cameroon.
            </p>
          </div>

          {/* Timeline Navigation */}
          <div className="flex justify-center mb-16 overflow-x-auto pb-4">
            <div className="flex space-x-4">
              {timelineData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTimelineItem(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTimelineItem === index
                      ? 'bg-red-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Active Timeline Item */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-gray-300 rounded-2xl p-12 hover:border-red-600 transition-all duration-500 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center border-2 border-red-600 px-6 py-2 rounded-full text-red-600 font-medium mb-8">
                  <Calendar className="h-5 w-5 mr-2" />
                  {timelineData[activeTimelineItem].milestone}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {timelineData[activeTimelineItem].title}
                </h3>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {timelineData[activeTimelineItem].description}
                </p>
                
                <div className="text-6xl md:text-8xl font-bold text-red-600 opacity-20">
                  {timelineData[activeTimelineItem].year}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((activeTimelineItem + 1) / timelineData.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{timelineData[0].year}</span>
              <span>{timelineData[timelineData.length - 1].year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        id="team-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 ${scaleIn} ${visibleSections['team-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Dedicated leaders driving empowerment for vulnerable communities in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group bg-white border-2 border-gray-300 rounded-2xl p-8 hover:border-red-600 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl text-center"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto group-hover:border-red-600 group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100">
                    <span className="text-lg font-bold text-gray-600 group-hover:text-red-600 transition-colors duration-300">
                      {member.image}
                    </span>
                  </div>
                  <div className="absolute -inset-2 border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {member.name}
                </h3>
                
                <p className="text-red-600 font-semibold mb-4">
                  {member.role}
                </p>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
                
                <div className="flex justify-center space-x-4">
                  <a 
                    href={member.linkedin}
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href={member.twitter}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-red-600 ${fadeInClass} ${visibleSections['testimonials-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">What People Say</h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
              Voices from communities and supporters impacted by our work in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="mb-6">
                  <Quote className="h-12 w-12 text-red-200 mb-4" />
                  <p className="text-white text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="border-t border-white/20 pt-6">
                  <h4 className="text-white font-bold text-lg mb-1">
                    {testimonial.author}
                  </h4>
                  <p className="text-red-100 font-medium mb-1">
                    {testimonial.role}
                  </p>
                  <p className="text-red-200 text-sm flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section 
        id="objectives-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 ${slideInFromLeft} ${visibleSections['objectives-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Objectives</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Strategic goals to empower vulnerable women, girls, and children in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Education Access",
                description: "Providing non-formal education and digital skills training to displaced women and children in Cameroon.",
                points: [
                  "Reach 5,000 learners by 2026",
                  "Train 200 facilitators",
                  "Launch 10 mobile learning units",
                  "Provide 1,000 scholarships"
                ]
              },
              {
                title: "Economic Empowerment",
                description: "Supporting women with business grants and training to achieve economic independence.",
                points: [
                  "Fund 500 women-led businesses",
                  "Train 1,000 entrepreneurs",
                  "Create 2,000 job opportunities",
                  "Expand digital literacy programs"
                ]
              },
              {
                title: "Mental Health Support",
                description: "Delivering psychosocial care to women and children affected by conflict and violence.",
                points: [
                  "Deploy 10 mobile counseling units",
                  "Support 2,000 individuals",
                  "Train 100 counselors",
                  "Host community healing events"
                ]
              },
              {
                title: "Advocacy Against GBV",
                description: "Promoting gender equality and combating gender-based violence through education and campaigns.",
                points: [
                  "Reach 10,000 girls with advocacy",
                  "Host 20 awareness events",
                  "Partner with 10 organizations",
                  "Support 500 GBV survivors"
                ]
              }
            ].map((objective, index) => (
              <div 
                key={index} 
                className="group bg-white border-2 border-gray-300 rounded-2xl p-8 hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {objective.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {objective.description}
                </p>
                
                <div className="space-y-3">
                  {objective.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section 
        id="contact-cta-section" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-gray-50 ${scaleIn} ${visibleSections['contact-cta-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-12 text-white">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Support Our Mission?
            </h3>
            <p className="text-xl text-red-100 mb-10 leading-relaxed">
              Join us in empowering vulnerable communities in Cameroon as of September 27, 2025.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-white text-red-600 px-10 py-5 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center">
                <Mail className="h-5 w-5 mr-3" />
                Get In Touch
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button className="group border-2 border-white text-white px-10 py-5 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Phone className="h-5 w-5 mr-3" />
                Schedule a Call
              </button>
            </div>

            <div className="flex justify-center space-x-6 mt-10 pt-8 border-t border-white/20">
              <a href="https://www.facebook.com/imhumanorg" className="text-red-200 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://x.com/imhuman_org" className="text-red-200 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-red-200 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers Section */}
      <section 
        id="impact-numbers-section" 
        data-animate
        className={`py-20 border-b-2 border-gray-200 ${fadeInClass} ${visibleSections['impact-numbers-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Metrics reflecting our commitment to vulnerable communities as of September 27, 2025.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Projects Completed", color: "red" },
              { number: "7,000+", label: "Lives Impacted", color: "blue" },
              { number: "5", label: "Regions Reached", color: "purple" },
              { number: "1,000+", label: "Supporters Engaged", color: "red" }
            ].map((metric, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className={`bg-gradient-to-r ${
                  metric.color === 'red' ? 'from-red-500 to-red-600' :
                  metric.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  metric.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  'from-red-500 to-red-600'
                } text-white rounded-2xl p-8 group-hover:scale-105 group-hover:shadow-xl transition-all duration-300`}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {metric.number}
                  </div>
                  <div className="text-lg font-medium opacity-90">
                    {metric.label}
                  </div>
                </div>
              </div>
            ))}
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

export default AboutUsPage;
