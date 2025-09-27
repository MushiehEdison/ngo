import React, { useState, useEffect, useMemo, Component } from 'react';
import { 
  Heart, User, Calendar, Clock, Search, Filter, ChevronDown, 
  FileText, Download, Eye, Share2, Bookmark, Tag,
  ChevronRight, ArrowRight, TrendingUp, Award, Globe2,
  BookOpen, Newspaper, MessageSquare, Bell, CreditCard, Banknote, Gift
} from 'lucide-react';
import Header from './PageComponents/header';
import Footer from './PageComponents/footer';

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">We apologize for the inconvenience. Please try refreshing the page.</p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-red-500">{this.state.error?.message}</p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const DonatePage = () => {
  const [activeTab, setActiveTab] = useState('one-time');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [visibleSections, setVisibleSections] = useState({});
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [donorDetails, setDonorDetails] = useState({ firstName: '', lastName: '', email: '' });
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Lagos' }));

  useEffect(() => {
    // Load bookmarked items from localStorage
    const savedBookmarks = localStorage.getItem('bookmarkedItems');
    if (savedBookmarks) {
      setBookmarkedItems(JSON.parse(savedBookmarks));
    }

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

    const timer = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Lagos' }));
    }, 60000); // Update every minute

    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('DonatePage mounted, tabs defined:', tabs);
    }

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  const tabs = [
    { id: 'one-time', name: 'One-Time Donations', icon: Gift },
    { id: 'monthly', name: 'Monthly Donations', icon: Banknote },
    { id: 'campaigns', name: 'Campaigns', icon: Heart }
  ];

  const donationItems = useMemo(() => ({
    'one-time': [
      {
        id: 1,
        title: "Empower Girls' Education",
        excerpt: `Support education for girls in Cameroon as of ${currentDate}.`,
        date: "September 27, 2025",
        category: "Education",
        amountRaised: "$5,000",
        goal: "$10,000",
        type: "one-time",
        featured: true,
        tags: ["Education", "Girls", "Cameroon"],
        fullContent: "This initiative provides scholarships, books, and safe learning spaces for 500 girls in rural Cameroon. Funds will cover school fees and mentorship programs, with progress reports by December 2025."
      },
      {
        id: 2,
        title: "Mental Health Support",
        excerpt: "Fund counseling services for women and children in crisis.",
        date: "September 25, 2025",
        category: "Healthcare",
        amountRaised: "$3,500",
        goal: "$8,000",
        type: "one-time",
        tags: ["Mental Health", "Women", "Children"],
        fullContent: "This fund supports trauma counseling and mental health workshops for 200 women and children in Cameroon. The program includes community-based support groups launching in November 2025."
      }
    ],
    'monthly': [
      {
        id: 3,
        title: "Sustain Women's Livelihoods",
        excerpt: "Monthly support for women's entrepreneurship programs.",
        date: "September 27, 2025",
        category: "Livelihood",
        amountRaised: "$2,000",
        goal: "$5,000",
        type: "monthly",
        tags: ["Women", "Entrepreneurship", "Cameroon"],
        fullContent: "Your monthly donation funds business training and micro-grants for 100 women in Cameroon, enabling sustainable livelihoods. Quarterly updates will highlight success stories and program expansion."
      },
      {
        id: 4,
        title: "Child Protection Program",
        excerpt: "Ongoing support to protect vulnerable children from GBV.",
        date: "September 20, 2025",
        category: "Protection",
        amountRaised: "$1,500",
        goal: "$4,000",
        type: "monthly",
        tags: ["Children", "Protection", "GBV"],
        fullContent: "This program provides safe spaces and advocacy training for 150 children at risk of gender-based violence in Cameroon. Monthly donations ensure continuous support and legal aid."
      }
    ],
    'campaigns': [
      {
        id: 5,
        title: "Cameroon Crisis Relief",
        excerpt: `Urgent aid for communities affected by conflict as of ${currentDate}.`,
        date: "September 27, 2025",
        category: "Relief",
        amountRaised: "$2,000",
        goal: "$7,500",
        type: "campaign",
        priority: "high",
        tags: ["Relief", "Conflict", "Urgent"],
        fullContent: "This campaign provides emergency food, shelter, and medical aid to 300 families displaced by conflict in Cameroon. Funds are needed by October 15, 2025, to prevent further hardship."
      },
      {
        id: 6,
        title: "Community Empowerment",
        excerpt: "Support community-led initiatives for sustainable development.",
        date: "September 15, 2025",
        category: "Community",
        amountRaised: "$4,000",
        goal: "$12,000",
        type: "campaign",
        tags: ["Community", "Empowerment", "Development"],
        fullContent: "This initiative supports community-led projects in Cameroon, including vocational training and clean energy solutions for 5 villages. The goal is to empower 1,000 individuals by April 2026."
      }
    ]
  }), [currentDate]);

  const filteredItems = donationItems[activeTab]?.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || item.category.toLowerCase() === filterBy.toLowerCase();
    return matchesSearch && matchesFilter;
  }) || [];

  const toggleBookmark = (itemId) => {
    setBookmarkedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleReadMore = (item) => {
    setSelectedCampaign(item);
  };

  const closePopup = () => {
    setSelectedCampaign(null);
    setDonationAmount('');
    setDonorDetails({ firstName: '', lastName: '', email: '' });
  };

  const handleDonate = (e) => {
    e.preventDefault();
    if (!donationAmount || !donorDetails.firstName || !donorDetails.lastName || !donorDetails.email) {
      alert('Please fill in all required fields.');
      return;
    }
    if (parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }
    const confirmation = window.confirm(`Confirm your $${donationAmount} donation to "${selectedCampaign.title}"?`);
    if (confirmation) {
      alert(`Thank you, ${donorDetails.firstName}! Your $${donationAmount} donation to "${selectedCampaign.title}" has been processed as of ${currentDate}.`);
      closePopup();
    }
  };

  const presetAmounts = [10, 25, 50, 100];

  const fadeInClass = "opacity-0 translate-y-12 transition-all duration-1000 ease-out";
  const slideInFromLeft = "opacity-0 -translate-x-12 transition-all duration-1000 ease-out";
  const slideInFromRight = "opacity-0 translate-x-12 transition-all duration-1000 ease-out";
  const scaleIn = "opacity-0 scale-90 transition-all duration-1000 ease-out";
  const visibleClass = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-red-50 to-blue-50 border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center border-2 border-red-600 px-6 py-3 rounded-full text-red-600 font-medium mb-8">
                <Bell className="w-5 h-5 mr-3" />
                Make a Difference Today
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Donate & <span className="text-red-600">Empower</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Your contribution transforms lives in Cameroon. Support our mission to empower vulnerable women, girls, and children through education, healthcare, and community programs as of {currentDate}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { icon: Heart, title: "One-Time Gifts", desc: "Quick support for urgent needs" },
                  { icon: Banknote, title: "Monthly Giving", desc: "Sustained impact over time" },
                  { icon: Globe2, title: "Community Campaigns", desc: "Join our efforts in Cameroon" }
                ].map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 border-2 border-red-600 rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="h-7 w-7 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs and Search */}
        <section className="py-8 bg-gray-50 border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center mb-8">
              {tabs ? (
                <div className="flex border-2 border-gray-300 rounded-2xl overflow-hidden bg-white">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-6 py-4 font-semibold transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-red-600 text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
                      }`}
                      aria-label={`Switch to ${tab.name}`}
                    >
                      <tab.icon className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">{tab.name}</span>
                      <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-red-600">
                  Error: Navigation tabs not available. Please try refreshing the page.
                </div>
              )}
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search */}
              <div className="relative flex-1 max-w-md mx-auto lg:mx-0">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search donation causes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none"
                  aria-label="Search donation causes"
                />
              </div>

              <div className="flex items-center justify-center gap-4">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="appearance-none bg-white border-2 border-gray-300 rounded-xl px-6 py-3 pr-12 focus:border-red-600 focus:outline-none font-medium"
                    aria-label="Filter by category"
                  >
                    <option value="all">All Categories</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="livelihood">Livelihood</option>
                    <option value="protection">Protection</option>
                    <option value="relief">Relief</option>
                    <option value="community">Community</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600 bg-white px-4 py-3 rounded-xl border-2 border-gray-300">
                  {filteredItems.length} causes
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section 
          id="content-section" 
          data-animate
          className={`py-16 ${fadeInClass} ${visibleSections['content-section'] ? visibleClass : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Causes */}
              <div className="lg:col-span-2">
                {/* Featured Cause */}
                {filteredItems.find(item => item.featured || item.priority === 'high') && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Award className="h-6 w-6 text-red-600 mr-3" />
                      Featured Cause
                    </h2>
                    
                    {(() => {
                      const featured = filteredItems.find(item => item.featured || item.priority === 'high');
                      const progress = (parseFloat(featured.amountRaised.replace('$', '')) / parseFloat(featured.goal.replace('$', ''))) * 100;
                      return (
                        <div className="group bg-white border-2 border-red-600 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                          {/* Featured Image */}
                          <div className="relative h-64 bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center overflow-hidden">
                            <img 
                              src={featured.e || "/https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE="} 
                              alt={featured.title} 
                              className="w-full h-full object-cover" 
                            />
                            
                            {/* Priority Badge */}
                            {featured.priority === 'high' && (
                              <div className="absolute top-4 left-4">
                                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                  URGENT
                                </span>
                              </div>
                            )}
                            
                            {/* Featured Badge */}
                            {featured.featured && (
                              <div className="absolute top-4 left-4">
                                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                  FEATURED
                                </span>
                              </div>
                            )}

                            <button
                              onClick={() => toggleBookmark(featured.id)}
                              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300"
                              aria-label={`Bookmark ${featured.title}`}
                            >
                              <Bookmark 
                                className={`h-5 w-5 transition-colors duration-300 ${
                                  bookmarkedItems.includes(featured.id) 
                                    ? 'text-red-600 fill-current' 
                                    : 'text-gray-600'
                                }`} 
                              />
                            </button>
                          </div>
                          
                          <div className="p-8">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              <span className="border-2 border-red-600 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                                {featured.category}
                              </span>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{featured.date}</span>
                                <span className="mx-2">•</span>
                                <span>{featured.amountRaised} of {featured.goal}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                              {featured.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                              {featured.excerpt}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-6">
                              <div className="w-full bg-gray-200 rounded-full h-4">
                                <div 
                                  className="bg-red-600 h-4 rounded-full transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{progress.toFixed(1)}% funded</p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {featured.tags?.map((tag, index) => (
                                <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500">
                                <User className="h-4 w-4 mr-2" />
                                <span>I’m Human Org</span>
                              </div>
                              
                              <button 
                                onClick={() => handleReadMore(featured)}
                                className="group/btn flex items-center text-red-600 hover:text-red-800 font-semibold transition-all duration-300"
                                aria-label={`Learn more about ${featured.title}`}
                              >
                                Learn More
                                <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Regular Causes Grid */}
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Heart className="h-6 w-6 text-gray-600 mr-3" />
                    Latest {tabs.find(tab => tab.id === activeTab)?.name || 'Causes'}
                  </h2>
                  
                  {filteredItems.filter(item => !item.featured && item.priority !== 'high').map((item, index) => {
                    const progress = (parseFloat(item.amountRaised.replace('$', '')) / parseFloat(item.goal.replace('$', ''))) * 100;
                    return (
                      <div
                        key={item.id}
                        className="group bg-white border-2 border-gray-300 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Cause Image */}
                          <div className="relative md:w-80 h-48 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <img 
                              src={item.image || "https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE="} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                            />
                            
                            {/* Type Badge */}
                            <div className="absolute top-3 left-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                item.type === 'one-time' ? 'bg-red-600 text-white' :
                                item.type === 'monthly' ? 'bg-blue-600 text-white' :
                                'bg-purple-600 text-white'
                              }`}>
                                {item.type.toUpperCase()}
                              </span>
                            </div>

                            <button
                              onClick={() => toggleBookmark(item.id)}
                              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300"
                              aria-label={`Bookmark ${item.title}`}
                            >
                              <Bookmark 
                                className={`h-4 w-4 transition-colors duration-300 ${
                                  bookmarkedItems.includes(item.id) 
                                    ? 'text-red-600 fill-current' 
                                    : 'text-gray-600'
                                }`} 
                              />
                            </button>
                          </div>
                        
                          {/* Cause Content */}
                          <div className="flex-1 p-6">
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                              <span className="border-2 border-gray-400 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold group-hover:border-red-600 group-hover:text-red-600 transition-colors duration-300">
                                {item.category}
                              </span>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{item.date}</span>
                                <span className="mx-2">•</span>
                                <span>{item.amountRaised} of {item.goal}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                              {item.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                              {item.excerpt}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-red-600 h-2.5 rounded-full transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{progress.toFixed(1)}% funded</p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.tags?.slice(0, 3).map((tag, tagIndex) => (
                                <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500">
                                <User className="h-4 w-4 mr-1" />
                                <span>I’m Human Org</span>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <button 
                                  className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-300"
                                  aria-label={`Share ${item.title}`}
                                  onClick={() => navigator.share?.({ title: item.title, url: window.location.href }) || alert('Share functionality not supported')}
                                >
                                  <Share2 className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleReadMore(item)}
                                  className="group/btn flex items-center text-red-600 hover:text-red-800 font-semibold transition-all duration-300"
                                  aria-label={`Learn more about ${item.title}`}
                                >
                                  Learn More
                                  <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* No Results */}
                  {filteredItems.length === 0 && (
                    <div className="text-center py-16">
                      <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No causes found</h3>
                      <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Quick Stats */}
                  <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Donation Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>This Month</span>
                        <span className="font-bold">$12,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Donors</span>
                        <span className="font-bold">350</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Bookmarked</span>
                        <span className="font-bold">{bookmarkedItems.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Date</span>
                        <span className="font-bold">{currentDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Popular Categories */}
                  <div className="bg-white border-2 border-gray-300 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Causes</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Education', count: 8 },
                        { name: 'Healthcare', count: 5 },
                        { name: 'Livelihood', count: 4 },
                        { name: 'Protection', count: 3 },
                        { name: 'Relief', count: 2 },
                        { name: 'Community', count: 6 }
                      ].map((category, index) => (
                        <button
                          key={index}
                          onClick={() => setFilterBy(category.name.toLowerCase())}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-300 w-full text-left"
                          aria-label={`Filter by ${category.name}`}
                        >
                          <span className="font-medium text-gray-700">{category.name}</span>
                          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
                            {category.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Donation Signup */}
                  <div className="bg-gradient-to-br from-blue-50 to-red-50 border-2 border-red-300 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Donate</h3>
                    <p className="text-gray-600 mb-4">Support a cause with a single click.</p>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {presetAmounts.map(amount => (
                          <button
                            key={amount}
                            onClick={() => setDonationAmount(amount.toString())}
                            className={`px-4 py-2 rounded-xl font-semibold border-2 ${
                              donationAmount === amount.toString()
                                ? 'bg-red-600 text-white border-red-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                            aria-label={`Select $${amount} donation amount`}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        placeholder="Custom Amount (USD)"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none"
                        aria-label="Enter custom donation amount"
                      />
                      <button 
                        onClick={() => handleReadMore(filteredItems[0] || {})}
                        className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300"
                        aria-label="Proceed to donate"
                      >
                        Donate Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popup for Donation */}
        {selectedCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{selectedCampaign.title}</h3>
                <button 
                  onClick={closePopup} 
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close donation popup"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <img 
                src={selectedCampaign.image || "https://media.istockphoto.com/id/1175387759/vector/camera-icon.jpg?s=612x612&w=0&k=20&c=paC1ZkU31dH2B5epXqT_cYOyca5uqh4v0WpFUldCUBE="} 
                alt={selectedCampaign.title} 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="border-2 border-red-600 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedCampaign.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{selectedCampaign.date}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedCampaign.amountRaised} of {selectedCampaign.goal}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{selectedCampaign.fullContent}</p>
              <form onSubmit={handleDonate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={donorDetails.firstName}
                    onChange={(e) => setDonorDetails({ ...donorDetails, firstName: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none"
                    aria-label="Enter first name"
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={donorDetails.lastName}
                    onChange={(e) => setDonorDetails({ ...donorDetails, lastName: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none"
                    aria-label="Enter last name"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email *"
                  value={donorDetails.email}
                  onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none"
                  aria-label="Enter email address"
                />
                <div className="flex flex-wrap gap-2 mb-3">
                  {presetAmounts.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount.toString())}
                      className={`px-4 py-2 rounded-xl font-semibold border-2 ${
                        donationAmount === amount.toString()
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                      aria-label={`Select $${amount} donation amount`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Donation Amount (USD) *"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none"
                  aria-label="Enter donation amount"
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300"
                  aria-label="Submit donation"
                >
                  <CreditCard className="h-5 w-5 mr-2 inline" />
                  Donate Now
                </button>
              </form>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  <span>I’m Human Org</span>
                </div>
                <button 
                  onClick={closePopup}
                  className="text-red-600 hover:text-red-800 font-semibold transition-colors duration-300"
                  aria-label="Cancel donation"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />

        <style jsx>{`
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

          @media (max-width: 768px) {
            .md:grid-cols-2 {
              grid-template-columns: 1fr;
            }
            .md:w-80 {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  );
};

export default DonatePage;