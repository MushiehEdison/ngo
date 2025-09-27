import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Heart, Users, MessageSquare, Calendar, User, ArrowRight, Eye, Play, TrendingUp, Target, Award, Globe2, ChevronLeft, Mail,
  Phone, MapPin, Clock, Check, Star, Zap, Shield, FileText, Send, PenTool, Share2, Vote, Megaphone, HandHeart, UserPlus, AlertCircle
} from 'lucide-react';
import Header from './PageComponents/header';
import Footer from './PageComponents/footer';

const TakeActionPage = () => {
  const [activeTab, setActiveTab] = useState('petition');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Cameroon',
    city: '',
    zipCode: '',
    organization: '',
    message: '',
    newsletter: true,
    anonymous: false,
    volunteer: false
  });
  const [signatures, setSignatures] = useState(247);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [expandedGallery, setExpandedGallery] = useState(null);
  const [expandedStory, setExpandedStory] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === 'petition') {
      setSignatures(prev => prev + 1);
    }
    alert(`${type === 'petition' ? 'Petition signed' : type === 'volunteer' ? 'Volunteer application submitted' : type === 'newsletter' ? 'Newsletter subscription successful' : type === 'report' ? 'Report submitted' : 'Donation processed'}!`);
  };

  const fadeInClass = "opacity-0 translate-y-12 transition-all duration-1000 ease-out";
  const slideInFromLeft = "opacity-0 -translate-x-12 transition-all duration-1000 ease-out";
  const slideInFromRight = "opacity-0 translate-x-12 transition-all duration-1000 ease-out";
  const scaleIn = "opacity-0 scale-90 transition-all duration-1000 ease-out";
  const visibleClass = "opacity-100 translate-y-0 translate-x-0 scale-100";

  const actionStats = [
    { number: `${signatures.toLocaleString()}`, label: "Petition Signatures", icon: PenTool },
    { number: "340", label: "Active Volunteers", icon: Users },
    { number: "12", label: "Regions Engaged", icon: Globe2 },
    { number: "85%", label: "Program Success Rate", icon: Target }
  ];

  const volunteerOpportunities = [
    {
      title: "Community Outreach Volunteer",
      location: "Douala, Cameroon",
      commitment: "Part-time",
      description: "Engage with local communities to promote empowerment programs and GBV awareness."
    },
    {
      title: "Digital Advocate",
      location: "Remote",
      commitment: "Flexible",
      description: "Create social media content to raise awareness about I'm Human Org's initiatives."
    },
    {
      title: "Event Coordinator",
      location: "Cameroon",
      commitment: "Project-based",
      description: "Organize workshops and events like Do It 4/W Her to support women and girls."
    },
    {
      title: "Counseling Support",
      location: "Hybrid (Cameroon/Remote)",
      commitment: "Part-time",
      description: "Provide psychosocial support for GBV survivors and displaced individuals."
    }
  ];

  const impactStories = [
    {
      name: "Esther N.",
      location: "Douala, Cameroon",
      story: "Through I'm Human Org's My Voice Matters program, I gained confidence to advocate for girls' rights, impacting 50 girls in my community as of September 27, 2025.",
      avatar: "EN"
    },
    {
      name: "Grace M.",
      location: "Buea, Cameroon",
      story: "Volunteering with I'm Human Org helped me start a small business after receiving a livelihood grant, transforming my family's life.",
      avatar: "GM"
    },
    {
      name: "Paul T.",
      location: "Yaoundé, Cameroon",
      story: "I reported a GBV case through the organization's platform, leading to justice and support for a survivor in my neighborhood.",
      avatar: "PT"
    }
  ];

  const actionGallery = [
    {
      title: "Petition for GBV Prevention",
      shortDesc: "End violence now",
      fullDesc: "Sign petitions to push for stronger policies protecting women and girls from gender-based violence in Cameroon."
    },
    {
      title: "Volunteer for Empowerment",
      shortDesc: "Join our mission",
      fullDesc: "Volunteer to support education, advocacy, and livelihood programs for vulnerable women and children."
    },
    {
      title: "Awareness Campaigns",
      shortDesc: "Spread the word",
      fullDesc: "Participate in campaigns like Twitter Spaces to raise awareness about GBV and empowerment initiatives."
    },
    {
      title: "Report GBV Incidents",
      shortDesc: "Expose injustices",
      fullDesc: "Report gender-based violence cases to support survivors and strengthen advocacy efforts."
    },
    {
      title: "Donate to Programs",
      shortDesc: "Fund empowerment",
      fullDesc: "Donate to sustain I'm Human Org's programs for education, mental health, and economic empowerment."
    }
  ];

  // Auto-scroll for gallery
  useEffect(() => {
    if (!isAutoScrolling) return;
    const interval = setInterval(() => {
      setCurrentGalleryIndex(prev => (prev + 1) % actionGallery.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoScrolling, actionGallery.length]);

  const nextGallery = () => {
    setIsAutoScrolling(false);
    setCurrentGalleryIndex(prev => (prev + 1) % actionGallery.length);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const prevGallery = () => {
    setIsAutoScrolling(false);
    setCurrentGalleryIndex(prev => (prev - 1 + actionGallery.length) % actionGallery.length);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const toggleGalleryExpansion = (index) => {
    setExpandedGallery(expandedGallery === index ? null : index);
  };

  const toggleStoryExpansion = (index) => {
    setExpandedStory(expandedStory === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 border-b-2 border-gray-200 bg-gradient-to-r from-red-50 to-blue-50">
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
            className="absolute bottom-32 left-1/4 w-40 h-40 border-2 border-red-200 rounded-full opacity-20"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center border-2 border-red-600 px-4 py-2 rounded-full text-red-600 font-medium mb-8 animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-ping"></div>
              Empower Women and Girls
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="block">Take Action</span>
              <span className="block text-red-600">Support Our Cause</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join I'm Human Org to empower vulnerable women, girls, and children in Cameroon through petitions, volunteering, reporting, or donations as of 01:18 AM WAT on September 27, 2025.
            </p>
            
            <div className="mb-16">
              {/* Action Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {actionStats.map((stat, index) => (
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

              {/* Action Buttons Below Stats */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => setActiveTab('volunteer')}
                  className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'volunteer' 
                      ? 'bg-red-600 text-white shadow-xl' 
                      : 'border-2 border-gray-400 text-gray-700 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  <Users className="inline-block w-5 h-5 mr-3" />
                  Volunteer in Projects
                </button>
                
                <button 
                  onClick={() => setActiveTab('petition')}
                  className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'petition' 
                      ? 'bg-red-600 text-white shadow-xl' 
                      : 'border-2 border-gray-400 text-gray-700 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  <PenTool className="inline-block w-5 h-5 mr-3" />
                  Sign Petitions
                </button>
                
                <button 
                  onClick={() => setActiveTab('newsletter')}
                  className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'newsletter' 
                      ? 'bg-red-600 text-white shadow-xl' 
                      : 'border-2 border-gray-400 text-gray-700 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  <Mail className="inline-block w-5 h-5 mr-3" />
                  Subscribe to Newsletters
                </button>
                
                <button 
                  onClick={() => setActiveTab('report')}
                  className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'report' 
                      ? 'bg-red-600 text-white shadow-xl' 
                      : 'border-2 border-gray-400 text-gray-700 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  <AlertCircle className="inline-block w-5 h-5 mr-3" />
                  Report GBV Cases
                </button>
                
                <button 
                  onClick={() => setActiveTab('donation')}
                  className={`group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'donation' 
                      ? 'bg-red-600 text-white shadow-xl' 
                      : 'border-2 border-gray-400 text-gray-700 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  <Heart className="inline-block w-5 h-5 mr-3" />
                  Donations to Programs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Forms Section */}
      <section 
        id="action-forms" 
        data-animate
        className={`py-20 border-b-2 border-gray-200 ${fadeInClass} ${visibleSections['action-forms'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form Section */}
            <div className="order-2 lg:order-1">
              {activeTab === 'volunteer' && (
                <div className="bg-white border-2 border-gray-300 rounded-3xl p-6 lg:p-12 hover:border-red-600 transition-colors duration-300">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Volunteer in Projects</h3>
                      <p className="text-red-600 font-medium">Support I'm Human Org's Empowerment Mission</p>
                    </div>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, 'volunteer')} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                    </div>

                    <input
                      type="text"
                      name="organization"
                      placeholder="Current Organization/School (optional)"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                    />

                    <textarea
                      name="message"
                      placeholder="Tell us how you can contribute to I'm Human Org's mission *"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300 resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-4 md:py-5 rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    >
                      <UserPlus className="w-5 h-5 mr-3" />
                      Apply to Volunteer
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'petition' && (
                <div className="bg-white border-2 border-gray-300 rounded-3xl p-6 lg:p-12 hover:border-red-600 transition-colors duration-300">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                      <PenTool className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Sign Petitions</h3>
                      <p className="text-red-600 font-medium">{signatures.toLocaleString()} signatures so far</p>
                    </div>
                  </div>

                  <div className="mb-8 p-4 lg:p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-3">Petition Statement:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      We demand stronger policies to prevent gender-based violence and support empowerment programs for women and girls in Cameroon.
                    </p>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, 'petition')} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      >
                        <option value="Cameroon">Cameroon</option>
                        <option value="USA">United States</option>
                        <option value="CAN">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Other">Other</option>
                      </select>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                    </div>

                    <textarea
                      name="message"
                      placeholder="Add a message supporting women and girls in Cameroon (optional)"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300 resize-none"
                    />

                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:border-red-600"
                        />
                        <span className="ml-3 text-gray-700">Keep me updated on I'm Human Org's progress</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="anonymous"
                          checked={formData.anonymous}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:border-red-600"
                        />
                        <span className="ml-3 text-gray-700">Sign anonymously</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-4 md:py-5 rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    >
                      <PenTool className="w-5 h-5 mr-3" />
                      Sign Petition Now
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'newsletter' && (
                <div className="bg-white border-2 border-gray-300 rounded-3xl p-6 lg:p-12 hover:border-red-600 transition-colors duration-300">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Subscribe to Newsletters</h3>
                      <p className="text-red-600 font-medium">Updates on Empowerment Programs</p>
                    </div>
                  </div>

                  <div className="mb-8 p-4 lg:p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-3">What You'll Receive:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center"><Check className="w-4 h-4 text-red-500 mr-2" /> Program updates</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-red-500 mr-2" /> Event announcements</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-red-500 mr-2" /> Impact stories</li>
                    </ul>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, 'newsletter')} className="space-y-6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300 text-lg"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      >
                        <option value="Cameroon">Cameroon</option>
                        <option value="USA">United States</option>
                        <option value="CAN">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-4 md:py-5 rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    >
                      <Mail className="w-5 h-5 mr-3" />
                      Subscribe Now
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="bg-white border-2 border-gray-300 rounded-3xl p-6 lg:p-12 hover:border-red-600 transition-colors duration-300">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Report GBV Cases</h3>
                      <p className="text-red-600 font-medium">Support survivors in Cameroon</p>
                    </div>
                  </div>

                  <div className="mb-8 p-4 lg:p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-3">Report Details:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Document gender-based violence cases to support survivors and strengthen advocacy efforts in Cameroon.
                    </p>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, 'report')} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                    />

                    <textarea
                      name="message"
                      placeholder="Describe the GBV case or issue in Cameroon *"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300 resize-none"
                    />

                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="anonymous"
                          checked={formData.anonymous}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-red-600 border-2 border-gray-300 rounded focus:ring-red-500 focus:border-red-600"
                        />
                        <span className="ml-3 text-gray-700">Report anonymously</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-4 md:py-5 rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    >
                      <AlertCircle className="w-5 h-5 mr-3" />
                      Submit Report
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'donation' && (
                <div className="bg-white border-2 border-gray-300 rounded-3xl p-6 lg:p-12 hover:border-red-600 transition-colors duration-300">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Donations to Programs</h3>
                      <p className="text-red-600 font-medium">Fund Empowerment in Cameroon</p>
                    </div>
                  </div>

                  <div className="mb-8 p-4 lg:p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <h4 className="font-bold text-gray-900 mb-3">Donation Details:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Your donations support education, mental health, and livelihood programs for vulnerable women and children in Cameroon.
                    </p>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, 'donation')} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                    
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                    />

                    <input
                      type="number"
                      name="donationAmount"
                      placeholder="Donation Amount (USD) *"
                      value={formData.donationAmount || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300"
                    />

                    <textarea
                      name="message"
                      placeholder="Add a note supporting I'm Human Org's mission (optional)"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none transition-colors duration-300 resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-4 md:py-5 rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                    >
                      <Heart className="w-5 h-5 mr-3" />
                      Donate Now
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-red-50 to-blue-50 border-2 border-gray-300 rounded-3xl p-6 lg:p-8 mb-8 hover:border-red-600 transition-colors duration-300">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-3 text-red-600" />
                    Recent Activity
                  </h4>
                  <div className="space-y-4">
                    {[
                      { name: "Mary T.", location: "Douala", time: "2 min ago" },
                      { name: "John A.", location: "Buea", time: "5 min ago" },
                      { name: "Esther L.", location: "Yaoundé", time: "8 min ago" },
                      { name: "Clara M.", location: "Douala", time: "12 min ago" }
                    ].map((person, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{person.name}</div>
                            <div className="text-gray-600 text-xs">{person.location}</div>
                          </div>
                        </div>
                        <span className="text-gray-500 text-xs">{person.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-6 lg:p-8 text-white text-center">
                  <h4 className="text-2xl font-bold mb-2">Our Growing Movement</h4>
                  <div className="text-4xl font-bold mb-2">{signatures.toLocaleString()}</div>
                  <div className="text-red-100 mb-4">Signatures Collected</div>
                  <div className="w-full bg-red-500 rounded-full h-3 mb-4">
                    <div className="bg-white h-3 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                  <div className="text-sm text-red-100">Goal: 1,000 signatures</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities Section */}
      <section 
        id="opportunities" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-gray-50 ${slideInFromLeft} ${visibleSections['opportunities'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Volunteer Opportunities</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join I'm Human Org to empower women, girls, and children in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <div 
                key={index} 
                className="group bg-white border-2 border-gray-300 rounded-2xl p-6 hover:border-red-600 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <Users className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                      {opportunity.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{opportunity.location} | {opportunity.commitment}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{opportunity.description}</p>
                <button className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section 
        id="impact-stories" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 ${slideInFromRight} ${visibleSections['impact-stories'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Impact Stories</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Stories of empowerment from I'm Human Org's work in Cameroon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStories.map((story, index) => (
              <div 
                key={index} 
                className="group border-2 border-gray-300 rounded-2xl p-6 hover:border-red-600 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-red-600">
                  {story.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {story.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{story.location}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  <span className={expandedStory === index ? '' : 'line-clamp-3'}>{story.story}</span>
                </p>
                <button 
                  onClick={() => toggleStoryExpansion(index)}
                  className="text-red-600 hover:text-red-800 font-semibold flex items-center transition-all duration-300"
                >
                  {expandedStory === index ? 'Read Less' : 'Read More'}
                  <ChevronRight className={`h-4 w-4 ml-2 transition-transform duration-300 ${expandedStory === index ? 'rotate-90' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Gallery Section */}
      <section 
        id="action-gallery" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-gray-50 ${scaleIn} ${visibleSections['action-gallery'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Take Action Gallery</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore ways to support I'm Human Org's empowerment initiatives.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={prevGallery}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-300 hover:border-red-600 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-gray-600 hover:text-red-600" />
            </button>
            <button
              onClick={nextGallery}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-gray-300 hover:border-red-600 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-600 hover:text-red-600" />
            </button>

            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentGalleryIndex * 100}%)` }}
              >
                {actionGallery.map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-full px-2">
                    <div className="group border-2 border-gray-300 rounded-2xl p-6 hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl bg-white">
                      <div className="h-48 bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center mb-6">
                        <span className="text-gray-600 font-semibold text-lg">Action Spotlight</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{item.shortDesc}</p>
                      <div className={`transition-all duration-300 overflow-hidden ${expandedGallery === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-gray-700 mb-4 leading-relaxed">{item.fullDesc}</p>
                      </div>
                      <button 
                        onClick={() => toggleGalleryExpansion(index)}
                        className="text-red-600 hover:text-red-800 font-semibold flex items-center transition-all duration-300"
                      >
                        {expandedGallery === index ? 'Show Less' : 'Learn More'}
                        <ChevronRight className={`h-4 w-4 ml-2 transition-transform duration-300 ${expandedGallery === index ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {actionGallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentGalleryIndex(index);
                    setIsAutoScrolling(false);
                    setTimeout(() => setIsAutoScrolling(true), 10000);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentGalleryIndex ? 'bg-red-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

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

      {/* Impact Metrics Section */}
      <section 
        id="impact-metrics" 
        data-animate
        className={`py-24 border-b-2 border-gray-200 bg-gradient-to-r from-red-600 to-blue-600 ${fadeInClass} ${visibleSections['impact-metrics'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto leading-relaxed">
              Impact of I'm Human Org's work in Cameroon as of 01:18 AM WAT on September 27, 2025.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1,500+", label: "Women Empowered", suffix: "through programs" },
              { number: "800+", label: "Girls Educated", suffix: "via workshops" },
              { number: "12", label: "Regions Engaged", suffix: "in Cameroon" },
              { number: "90%", label: "Participant Satisfaction", suffix: "rate" }
            ].map((metric, index) => (
              <div key={index} className="text-center group" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 group-hover:bg-white/20 group-hover:border-white/40 group-hover:scale-105 transition-all duration-500">
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
          <div className="bg-gradient-to-r from-red-50 to-blue-50 border-2 border-gray-300 rounded-3xl p-8 lg:p-12 hover:border-red-600 transition-colors duration-500">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stay Connected with Our Mission
            </h3>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Receive updates on I'm Human Org's empowerment efforts as of 01:18 AM WAT on September 27, 2025.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none text-gray-900 font-medium transition-colors duration-300"
              />
              <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap">
                Join Our Community
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Join 1,000+ supporters. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default TakeActionPage;

