import React, { useState, useEffect } from 'react';
import { 
  Calendar, User, Clock, Search, Filter, ChevronDown, 
  FileText, Download, Eye, Share2, Bookmark, Tag,
  ChevronRight, ArrowRight, TrendingUp, Award, Globe2,
  BookOpen, Newspaper, MessageSquare, Bell
} from 'lucide-react';
import Header from './PageComponents/header';
import Footer from './PageComponents/footer';

const NewsPublicationsPage = () => {
  const [activeTab, setActiveTab] = useState('news-bulletin');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [visibleSections, setVisibleSections] = useState({});
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

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

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  const tabs = [
    { id: 'news-bulletin', name: 'News Bulletin', icon: Newspaper },
    { id: 'press-statements', name: 'Press Statements', icon: MessageSquare },
    { id: 'memos', name: 'Memos', icon: FileText },
    { id: 'blogs', name: 'Blogs', icon: BookOpen }
  ];

  const newsItems = {
    'news-bulletin': [
      {
        id: 1,
        title: "Latest News Bulletin - September 2025",
        excerpt: "Key highlights from our recent programs, including My Voice Matters expansion and community events in Douala as of September 27, 2025.",
        date: "September 27, 2025",
        author: "Editorial Team",
        category: "News Update",
        readTime: "8 min",
        views: 450,
        type: "bulletin",
        featured: true,
        tags: ["Programs", "Community", "Empowerment"],
        fullContent: "This bulletin covers the ongoing success of My Voice Matters, with new partnerships announced for girls' advocacy workshops. We also highlight the Do It 4/W Her event preparations for December 2024 and updates on alternative learning sessions reaching 500+ participants in conflict-affected areas."
      },
      {
        id: 2,
        title: "Q3 2025 Impact Report Released",
        excerpt: "Overview of our third quarter achievements, supporting over 1,500 vulnerable women and children through livelihood programs and mental health support.",
        date: "September 20, 2025",
        author: "Impact Team",
        category: "Impact Report",
        readTime: "12 min",
        views: 380,
        type: "bulletin",
        tags: ["Impact", "Report", "Women"],
        fullContent: "The report details grants provided to 200 displaced women for small businesses, digital skills training for 800 girls, and psychosocial counseling sessions for 500 children. It includes testimonials from beneficiaries and plans for scaling programs in the Littoral Region."
      },
      {
        id: 3,
        title: "New Partnership with Open Dreams NGO",
        excerpt: "Collaboration to enhance GBV survivor support through joint Twitter Spaces and community dialogues in Cameroon.",
        date: "September 10, 2025",
        author: "Partnerships Team",
        category: "Partnership",
        readTime: "5 min",
        views: 290,
        type: "bulletin",
        tags: ["Partnership", "GBV", "Advocacy"],
        fullContent: "This partnership builds on our 2023 Twitter Spaces success, focusing on awareness campaigns and resource sharing. Joint events are scheduled for October 2025 to reach more IDP communities in Douala."
      }
    ],
    'press-statements': [
      {
        id: 4,
        title: "Statement on Ending Gender-Based Violence",
        excerpt: "I'm Human Org calls for increased action against GBV in Cameroon, highlighting the need for policy reforms and community support as of September 27, 2025.",
        date: "September 25, 2025",
        author: "Communications Office",
        category: "Official Statement",
        readTime: "6 min",
        views: 520,
        type: "statement",
        priority: "high",
        tags: ["GBV", "Official", "Advocacy"],
        fullContent: "This statement urges government and stakeholders to prioritize GBV prevention, referencing our My Voice Matters program data showing a 30% increase in reported cases in conflict zones. We commit to expanding counseling services."
      },
      {
        id: 5,
        title: "Position on Women's Rights in Cameroon",
        excerpt: "Affirming our commitment to gender equality and support for vulnerable women amid ongoing challenges.",
        date: "September 15, 2025",
        author: "Advocacy Department",
        category: "Rights Statement",
        readTime: "10 min",
        views: 410,
        type: "statement",
        tags: ["Rights", "Women", "Equality"],
        fullContent: "Drawing from International Women's Day 2025 workshops, this statement outlines demands for better access to education and economic opportunities, with calls for international solidarity."
      },
      {
        id: 6,
        title: "Response to Youth Day Celebrations",
        excerpt: "Celebrating young leaders and reiterating our focus on youth empowerment in African development.",
        date: "August 12, 2025",
        author: "Youth Programs",
        category: "Youth Response",
        readTime: "4 min",
        views: 350,
        type: "statement",
        tags: ["Youth", "Leadership", "Development"],
        fullContent: "This response thanks young volunteers and announces new mentorship opportunities under our programs, emphasizing their role in community resilience."
      }
    ],
    'memos': [
      {
        id: 7,
        title: "Internal Update on Volunteer Training - September 2025",
        excerpt: "Guidelines for upcoming volunteer orientations focusing on GBV awareness and program delivery.",
        date: "September 22, 2025",
        author: "Administration",
        category: "Training Memo",
        readTime: "7 min",
        views: 180,
        type: "memo",
        internal: true,
        tags: ["Training", "Volunteers", "GBV"],
        fullContent: "This memo details the schedule for Labor Day-inspired volunteer training sessions, including sessions on digital literacy and psychosocial support, mandatory for all new recruits in Douala."
      },
      {
        id: 8,
        title: "Program Expansion Memo Q4 2025",
        excerpt: "Strategic planning for scaling livelihood support and mental health initiatives in additional regions.",
        date: "September 18, 2025",
        author: "Program Management",
        category: "Expansion Memo",
        readTime: "5 min",
        views: 150,
        type: "memo",
        internal: true,
        tags: ["Expansion", "Programs", "Planning"],
        fullContent: "Outlines resource allocation for Q4, targeting 300 more women with business grants and deploying two new mobile units for counseling in IDP camps."
      }
    ],
    'blogs': [
      {
        id: 9,
        title: "Stories from the Field: Empowering Girls in Cameroon",
        excerpt: "Personal accounts from My Voice Matters participants sharing their journey to confidence and self-reliance.",
        date: "September 27, 2025",
        author: "Field Coordinator",
        category: "Beneficiary Stories",
        readTime: "15 min",
        views: 620,
        type: "blog",
        popular: true,
        tags: ["Stories", "Girls", "Empowerment"],
        fullContent: "This blog features three stories: a girl's rise from displacement to advocacy leader, a mother's gratitude for skills training, and a community's transformation through our workshops. Includes photos and quotes from Douala sessions."
      },
      {
        id: 10,
        title: "Reflecting on Community Unity in Cameroon",
        excerpt: "Lessons from our national unity reflections and the role of humanitarian action in fostering resilience.",
        date: "May 20, 2025",
        author: "Community Team",
        category: "Reflection",
        readTime: "11 min",
        views: 480,
        type: "blog",
        tags: ["Unity", "Community", "Resilience"],
        fullContent: "Exploring themes from our May 2025 posts, this blog discusses how programs like alternative learning build bridges in divided communities, with data on participant engagement and future unity events."
      }
    ]
  };

  const filteredItems = newsItems[activeTab]?.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || item.category.toLowerCase().includes(filterBy.toLowerCase());
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
    setSelectedArticle(item);
  };

  const closePopup = () => {
    setSelectedArticle(null);
  };

  const fadeInClass = "opacity-0 translate-y-12 transition-all duration-1000 ease-out";
  const slideInFromLeft = "opacity-0 -translate-x-12 transition-all duration-1000 ease-out";
  const slideInFromRight = "opacity-0 translate-x-12 transition-all duration-1000 ease-out";
  const scaleIn = "opacity-0 scale-90 transition-all duration-1000 ease-out";
  const visibleClass = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-50 to-blue-50 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center border-2 border-red-600 px-6 py-3 rounded-full text-red-600 font-medium mb-8">
              <Bell className="w-5 h-5 mr-3" />
              Stay Updated with Our Latest News
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              News & <span className="text-red-600">Publications</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stay informed about our programs, events, and impact stories empowering vulnerable women, girls, and children in Cameroon as of {currentTime.toLocaleString('en-US', { timeZone: 'Africa/Lagos', hour12: true })}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: TrendingUp, title: "Latest Updates", desc: "Program and event news" },
                { icon: Award, title: "Official Statements", desc: "Advocacy communications" },
                { icon: Globe2, title: "Community Impact", desc: "Stories from Cameroon" }
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
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md mx-auto lg:mx-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles and publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-300 rounded-xl px-6 py-3 pr-12 focus:border-red-600 focus:outline-none font-medium"
                >
                  <option value="all">All Categories</option>
                  <option value="news">News Update</option>
                  <option value="statement">Official Statement</option>
                  <option value="report">Impact Report</option>
                  <option value="partnership">Partnership</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600 bg-white px-4 py-3 rounded-xl border-2 border-gray-300">
                {filteredItems.length} articles
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
            {/* Main Articles */}
            <div className="lg:col-span-2">
              {/* Featured Article */}
              {filteredItems.find(item => item.featured || item.priority === 'high') && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Award className="h-6 w-6 text-red-600 mr-3" />
                    Featured Article
                  </h2>
                  
                  {(() => {
                    const featured = filteredItems.find(item => item.featured || item.priority === 'high');
                    return (
                      <div className="group bg-white border-2 border-red-600 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                        {/* Featured Image Placeholder */}
                        <div className="relative h-64 bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-blue-100/50"></div>
                          <FileText className="h-16 w-16 text-red-600/60 relative z-10" />
                          
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
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{featured.readTime}</span>
                              <span className="mx-2">•</span>
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{featured.views} views</span>
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                            {featured.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                            {featured.excerpt}
                          </p>

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
                              <span>{featured.author}</span>
                            </div>
                            
                            <button 
                              onClick={() => handleReadMore(featured)}
                              className="group/btn flex items-center text-red-600 hover:text-red-800 font-semibold transition-all duration-300"
                            >
                              Read Full Article
                              <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Regular Articles Grid */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FileText className="h-6 w-6 text-gray-600 mr-3" />
                  Latest {tabs.find(tab => tab.id === activeTab)?.name}
                </h2>
                
                {filteredItems.filter(item => !item.featured && item.priority !== 'high').map((item, index) => (
                  <div
                    key={item.id}
                    className="group bg-white border-2 border-gray-300 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Article Image */}
                      <div className="relative md:w-80 h-48 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-400" />
                        
                        {/* Type Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.type === 'bulletin' ? 'bg-red-600 text-white' :
                            item.type === 'statement' ? 'bg-red-600 text-white' :
                            item.type === 'memo' ? 'bg-yellow-600 text-white' :
                            'bg-purple-600 text-white'
                          }`}>
                            {item.type.toUpperCase()}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleBookmark(item.id)}
                          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300"
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
                      
                      {/* Article Content */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <span className="border-2 border-gray-400 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold group-hover:border-red-600 group-hover:text-red-600 transition-colors duration-300">
                            {item.category}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{item.date}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{item.readTime}</span>
                            <span className="mx-2">•</span>
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{item.views} views</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>

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
                            <span>{item.author}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-300">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleReadMore(item)}
                              className="group/btn flex items-center text-red-600 hover:text-red-800 font-semibold transition-all duration-300"
                            >
                              Read More
                              <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* No Results */}
                {filteredItems.length === 0 && (
                  <div className="text-center py-16">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
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
                  <h3 className="text-xl font-bold mb-4">Publication Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="font-bold">8 articles</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Views</span>
                      <span className="font-bold">2.5K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Bookmarked</span>
                      <span className="font-bold">{bookmarkedItems.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Time Now</span>
                      <span className="font-bold">{currentTime.toLocaleString('en-US', { timeZone: 'Africa/Lagos', hour12: true })}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Categories */}
                <div className="bg-white border-2 border-gray-300 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Categories</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Impact Reports', count: 6 },
                      { name: 'Official Statements', count: 5 },
                      { name: 'Beneficiary Stories', count: 8 },
                      { name: 'Partnership News', count: 4 },
                      { name: 'Program Updates', count: 7 }
                    ].map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-300">
                        <span className="font-medium text-gray-700">{category.name}</span>
                        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
                          {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-red-50 to-blue-50 border-2 border-red-300 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Updated</h3>
                  <p className="text-gray-600 mb-4">Get the latest on our programs and events delivered to your inbox as of {currentTime.toLocaleString('en-US', { timeZone: 'Africa/Lagos', hour12: true })}.</p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none"
                    />
                    <button className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup for Full Article */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{selectedArticle.title}</h3>
              <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="border-2 border-red-600 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                {selectedArticle.category}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{selectedArticle.date}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{selectedArticle.readTime}</span>
                <span className="mx-2">•</span>
                <Eye className="h-4 w-4 mr-1" />
                <span>{selectedArticle.views} views</span>
              </div>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{selectedArticle.fullContent}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-2" />
                <span>{selectedArticle.author}</span>
              </div>
              <button 
                onClick={closePopup}
                className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300"
              >
                Close
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
  );
};

export default NewsPublicationsPage;