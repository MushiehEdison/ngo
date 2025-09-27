import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users, BookOpen, Stethoscope, Leaf, Crown, X, Calendar, MapPin, Eye, Share2, Search, Grid, List } from 'lucide-react';
import Header from './header';
import Footer from './footer';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleItems, setVisibleItems] = useState(6);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const categories = [
    { id: 'all', label: 'All Stories', icon: Eye, count: 12 },
    { id: 'education', label: 'Education', icon: BookOpen, count: 4 },
    { id: 'healthcare', label: 'Healthcare', icon: Stethoscope, count: 3 },
    { id: 'community', label: 'Community', icon: Users, count: 3 },
    { id: 'environment', label: 'Environment', icon: Leaf, count: 2 },
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Girls' School Reconstruction in Bamenda",
      shortDesc: "Rebuilding safe learning spaces for girls",
      fullDesc: "I’m Human Org reconstructed three primary schools in Bamenda, providing safe, modern learning environments for over 800 girls, complete with educational materials and trained teachers focused on gender equity.",
      category: "education",
      location: "Bamenda, Northwest Region",
      date: "March 2025",
      impact: "800+ girls educated",
      tags: ["girls education", "school reconstruction", "Cameroon"],
      photographer: "Sarah Mbah",
      featured: true,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 2,
      title: "Mobile Health Clinics for Women",
      shortDesc: "Delivering healthcare to rural mothers",
      fullDesc: "Our mobile clinics reached 50+ villages, providing maternal health services, vaccinations, and health education to women and children in remote areas of Cameroon affected by conflict.",
      category: "healthcare",
      location: "Southwest Region",
      date: "January 2025",
      impact: "5,000+ women served",
      tags: ["maternal health", "mobile clinic", "rural access"],
      photographer: "Dr. John Fru",
      featured: false,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 3,
      title: "Women's Leadership Summit",
      shortDesc: "Empowering women to lead change",
      fullDesc: "The 2025 Women’s Leadership Summit united 200 women in Buea to foster skills in governance, entrepreneurship, and advocacy, empowering them to drive community change in Cameroon.",
      category: "community",
      location: "Buea, Southwest Region",
      date: "February 2025",
      impact: "200 women leaders",
      tags: ["women empowerment", "leadership", "advocacy"],
      photographer: "Mary Ngole",
      featured: true,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 4,
      title: "Community Gardens for Families",
      shortDesc: "Growing food security for communities",
      fullDesc: "Launched 15 community gardens in Lebialem to support families, especially women-led households, with sustainable farming practices and access to fresh produce.",
      category: "environment",
      location: "Lebialem, Southwest Region",
      date: "April 2025",
      impact: "150 families supported",
      tags: ["food security", "sustainable farming", "women-led"],
      photographer: "Peter Tabe",
      featured: false,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 5,
      title: "Digital Literacy for Youth",
      shortDesc: "Equipping girls with tech skills",
      fullDesc: "Established digital literacy centers in 12 towns, training 500+ girls and young women in computer skills and internet usage to bridge the digital divide in Cameroon.",
      category: "education",
      location: "Multiple locations",
      date: "May 2025",
      impact: "500+ girls trained",
      tags: ["digital literacy", "girls education", "technology"],
      photographer: "Grace Ayuk",
      featured: false,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 6,
      title: "Emergency Maternal Care",
      shortDesc: "Saving mothers in crisis",
      fullDesc: "Our emergency response team provided critical maternal care during a health crisis, setting up treatment centers and awareness campaigns to protect women and newborns.",
      category: "healthcare",
      location: "Kumba, Southwest Region",
      date: "June 2025",
      impact: "300+ mothers saved",
      tags: ["maternal care", "emergency response", "public health"],
      photographer: "Dr. Agnes Mbu",
      featured: true,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 7,
      title: "Vocational Training for Girls",
      shortDesc: "Skills for a brighter future",
      fullDesc: "Vocational centers trained 400+ girls in tailoring and entrepreneurship, empowering them with marketable skills to achieve financial independence in Cameroon.",
      category: "education",
      location: "Mamfe, Southwest Region",
      date: "July 2025",
      impact: "400+ girls trained",
      tags: ["vocational training", "girls empowerment", "skills"],
      photographer: "Paul Eta",
      featured: false,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 8,
      title: "Clean Water for Communities",
      shortDesc: "Providing safe drinking water",
      fullDesc: "Installed 25 boreholes to provide clean water to 10,000+ people, prioritizing women and children in rural Cameroon communities.",
      category: "environment",
      location: "Multiple communities",
      date: "August 2025",
      impact: "10,000+ beneficiaries",
      tags: ["clean water", "sanitation", "community health"],
      photographer: "Thomas Ngwa",
      featured: true,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 9,
      title: "Cultural Preservation for Women",
      shortDesc: "Honoring women’s cultural roles",
      fullDesc: "Documented traditional practices led by women, preserving Cameroon’s cultural heritage through stories and performances for future generations.",
      category: "community",
      location: "Multiple villages",
      date: "September 2025",
      impact: "50+ traditions preserved",
      tags: ["cultural preservation", "women’s heritage", "documentation"],
      photographer: "Chief Samuel Ndive",
      featured: false,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 10,
      title: "Widow Support Network",
      shortDesc: "Empowering widows to rebuild",
      fullDesc: "Created support networks for widows, offering financial aid, counseling, and skills training to help them regain independence and support their children.",
      category: "community",
      location: "Wum, Northwest Region",
      date: "September 2025",
      impact: "180 widows supported",
      tags: ["widow empowerment", "counseling", "skills training"],
      photographer: "Elizabeth Che",
      featured: false,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 11,
      title: "Scholarships for Girls",
      shortDesc: "Education for a brighter future",
      fullDesc: "Awarded 150 scholarships to girls from low-income families, enabling them to pursue secondary and university education in Cameroon.",
      category: "education",
      location: "Multiple schools",
      date: "August 2025",
      impact: "150 girls supported",
      tags: ["scholarships", "girls education", "student support"],
      photographer: "Prof. Mary Tanyi",
      featured: true,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    },
    {
      id: 12,
      title: "Mental Health for Women",
      shortDesc: "Healing trauma for women",
      fullDesc: "Provided mental health workshops and counseling for women affected by conflict, helping them cope with trauma and build resilience.",
      category: "healthcare",
      location: "Nkambe, Northwest Region",
      date: "July 2025",
      impact: "800+ women counseled",
      tags: ["mental health", "trauma counseling", "women’s health"],
      photographer: "Dr. Patricia Nkeng",
      featured: false,
      image: "https://imgs.search.brave.com/WjwdQi0sb9hW4N2Qn6AEjSeHfIIXP8zE4yayCxKBN-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTMx/NjQzMTUwL3ZlY3Rv/ci9waWN0dXJlLWlj/b24uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVN0LWdwUm41/OGVJYThFREFIcG5f/eU80Q1paQW5HRDZ3/S3BsbjlsM1ozT2s9"
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const visibleFilteredItems = filteredItems.slice(0, visibleItems);

  const nextImage = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  const loadMore = () => {
    setVisibleItems(prev => prev + (window.innerWidth < 640 ? 3 : 6));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-16 sm:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div 
              className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-40 h-24 sm:h-40 border border-white/20 rounded-full"
              style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)` }}
            />
            <div 
              className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 border border-white/20 rounded-lg"
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center border border-white/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white/90 font-medium mb-4 sm:mb-6 text-sm sm:text-base">
              <Eye className="w-4 h-4 mr-2" />
              Impact Stories Gallery
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Stories of Hope & <span className="text-red-300">Empowerment</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-100 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Discover how I’m Human Org transforms lives of women, girls, and children in Cameroon through education, healthcare, and community empowerment.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 sm:h-5 w-4 sm:w-5 text-red-300" />
                <span>12 Impact Stories</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-red-300" />
                <span>Multiple Locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 sm:h-5 w-4 sm:w-5 text-red-300" />
                <span>15,000+ Lives Touched</span>
              </div>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stories..."
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none text-sm sm:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search impact stories"
                  />
                </div>
                
                <div className="flex border-2 border-gray-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 sm:px-4 py-2 sm:py-3 transition-colors ${
                      viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-label="Switch to grid view"
                  >
                    <Grid className="h-4 sm:h-5 w-4 sm:w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 sm:px-4 py-2 sm:py-3 transition-colors ${
                      viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-label="Switch to list view"
                  >
                    <List className="h-4 sm:h-5 w-4 sm:w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setCurrentCategory(category.id)}
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm ${
                      currentCategory === category.id
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-label={`Filter by ${category.label}`}
                  >
                    <category.icon className="h-3 sm:h-4 w-3 sm:w-4" />
                    <span>{category.label}</span>
                    <span className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                      currentCategory === category.id ? 'bg-red-500' : 'bg-gray-300'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <p className="text-gray-600 text-sm sm:text-base">
                Showing {visibleFilteredItems.length} of {filteredItems.length} stories
                {currentCategory !== 'all' && (
                  <span> in <strong>{categories.find(c => c.id === currentCategory)?.label}</strong></span>
                )}
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {visibleFilteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                      item.featured ? 'ring-2 ring-red-600/20' : ''
                    }`}
                    onClick={() => setSelectedImage(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View story: ${item.title}`}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(item)}
                  >
                    {item.featured && (
                      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-1 sm:py-2 text-xs sm:text-sm font-semibold">
                        Featured Story
                      </div>
                    )}
                    
                    <div className="relative h-48 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <img 
                        src={item.image || '/images/fallback-story.jpg'} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Eye className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-2 transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                          <p className="font-semibold text-sm sm:text-base">View Story</p>
                        </div>
                      </div>
                      
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className="bg-white/90 text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                          {categories.find(c => c.id === item.category)?.label || 'Story'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">
                        {item.shortDesc}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-red-600 font-semibold text-xs sm:text-sm">{item.impact}</span>
                        <button className="text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm transition-colors duration-300">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {visibleFilteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500 cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View story: ${item.title}`}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedImage(item)}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 h-48 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        <img 
                          src={item.image || '/images/fallback-story.jpg'} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                          <span className="bg-white/90 text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                            {categories.find(c => c.id === item.category)?.label || 'Story'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="sm:w-2/3 p-4 sm:p-6 lg:p-8">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                          {item.fullDesc}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                            <span>{item.impact}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {visibleItems < filteredItems.length && (
              <div className="text-center mt-8 sm:mt-12">
                <button
                  onClick={loadMore}
                  className="bg-red-600 text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-xl hover:bg-red-700 font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  aria-label="Load more stories"
                >
                  Load More Stories
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 overscroll-none">
            <div
              className="relative w-full max-w-2xl sm:max-w-4xl lg:max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] sm:max-h-[90vh] lg:max-h-[85vh]"
              role="dialog"
              aria-modal="true"
              aria-label={`Impact Story: ${selectedImage.title}`}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 sm:p-2 transition-all duration-300 shadow-lg"
                aria-label="Close story modal"
              >
                <X className="h-5 sm:h-6 w-5 sm:w-6" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 sm:p-2 transition-all duration-300 shadow-lg hidden sm:flex"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 sm:p-2 transition-all duration-300 shadow-lg hidden sm:flex"
                aria-label="Next story"
              >
                <ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
              </button>

              <div className="flex flex-col lg:flex-row h-full max-h-[95vh] sm:max-h-[90vh] lg:max-h-[85vh]">
                <div className="lg:w-2/3 h-48 sm:h-64 lg:h-auto relative overflow-hidden">
                  <img 
                    src={selectedImage.image || '/images/fallback-story.jpg'} 
                    alt={selectedImage.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="bg-white/90 text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {categories.find((c) => c.id === selectedImage.category)?.label || 'Story'}
                    </span>
                  </div>
                </div>

                <div className="lg:w-1/3 p-3 sm:p-4 lg:p-6 overflow-y-auto lg:max-h-[85vh] flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="bg-red-100 text-red-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {categories.find((c) => c.id === selectedImage.category)?.label || 'Story'}
                    </span>
                    <button
                      className="text-gray-400 hover:text-red-600 transition-colors duration-300"
                      aria-label={`Share story: ${selectedImage.title}`}
                      onClick={() => navigator.share?.({ title: selectedImage.title, url: window.location.href }) || alert('Share functionality not supported')}
                    >
                      <Share2 className="h-4 sm:h-5 w-4 sm:w-5" />
                    </button>
                  </div>

                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    {selectedImage.title}
                  </h2>

                  <p className="text-base sm:text-lg text-red-600 font-semibold mb-4 sm:mb-6">
                    {selectedImage.shortDesc}
                  </p>

                  <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-xs sm:text-sm lg:text-base">
                    {selectedImage.fullDesc}
                  </p>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium flex items-center text-xs sm:text-sm">
                        <MapPin className="h-4 sm:h-5 w-4 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                        Location
                      </span>
                      <span className="text-gray-900 font-semibold text-xs sm:text-sm text-right">
                        {selectedImage.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium flex items-center text-xs sm:text-sm">
                        <Calendar className="h-4 sm:h-5 w-4 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                        Date
                      </span>
                      <span className="text-gray-900 font-semibold text-xs sm:text-sm">
                        {selectedImage.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium flex items-center text-xs sm:text-sm">
                        <Heart className="h-4 sm:h-5 w-4 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                        Impact
                      </span>
                      <span className="text-red-600 font-bold text-xs sm:text-sm">
                        {selectedImage.impact}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 sm:py-3">
                      <span className="text-gray-600 font-medium text-xs sm:text-sm">
                        Photographer
                      </span>
                      <span className="text-gray-900 font-semibold text-xs sm:text-sm">
                        {selectedImage.photographer}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="/donate"
                    className="w-full bg-red-600 text-white py-2 sm:py-3 lg:py-4 rounded-xl hover:bg-red-700 font-semibold transition-all duration-300 text-sm sm:text-base text-center"
                    aria-label={`Support ${selectedImage.title}`}
                  >
                    Support This Cause
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-300 {
          scrollbar-color: #d1d5db #f3f4f6;
        }
        .scrollbar-track-gray-100 {
          &::-webkit-scrollbar {
            width: 8px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
            border-radius: 4px;
          }
          &::-webkit-scrollbar-track {
            background-color: #f3f4f6;
          }
        }
        .overscroll-none {
          overscroll-behavior: none;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;