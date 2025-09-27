import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Heart, Filter, Search, Star, ChevronDown, 
  Grid, List, SlidersHorizontal, Eye, ArrowRight, Minus, Plus,
  Package, Truck, RefreshCw, Award, Shield, Users
} from 'lucide-react';
import Header from './PageComponents/header';
import Footer from './PageComponents/footer';

const ShopPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});
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

  const products = [
    {
      id: 1,
      name: "Empowerment T-Shirt",
      price: 20,
      originalPrice: 25,
      category: "apparel",
      image: "https://via.placeholder.com/300x300",
      rating: 4.8,
      reviews: 45,
      description: "Comfortable cotton t-shirt with 'My Voice Matters' slogan. Every purchase supports girls' education programs in Cameroon as of 01:27 AM WAT on September 27, 2025.",
      features: ["100% Cotton", "Empowerment Message", "Supports 1 Girl's Workshop"],
      inStock: true,
      isNew: true,
      impact: "Funds 1 advocacy workshop for a girl",
      stockUpdated: "September 27, 2025"
    },
    {
      id: 2,
      name: "Inclusive Community Mug",
      price: 15,
      category: "accessories",
      image: "https://via.placeholder.com/300x300",
      rating: 4.7,
      reviews: 32,
      description: "Ceramic mug with I'm Human Org logo. Proceeds support community unity initiatives.",
      features: ["Ceramic Material", "Microwave Safe", "Dishwasher Safe"],
      inStock: true,
      isBestseller: true,
      impact: "Supports 1 community dialogue session",
      stockUpdated: "September 25, 2025"
    },
    {
      id: 3,
      name: "Advocacy Notebook",
      price: 12,
      category: "stationery",
      image: "https://via.placeholder.com/300x300",
      rating: 4.6,
      reviews: 28,
      description: "Recycled paper notebook for notes on empowerment. Helps fund alternative learning programs.",
      features: ["Recycled Paper", "Spiral Bound", "100 Pages"],
      inStock: true,
      impact: "Provides materials for 1 child's education",
      stockUpdated: "September 20, 2025"
    },
    {
      id: 4,
      name: "Mental Health Keychain",
      price: 8,
      category: "accessories",
      image: "https://via.placeholder.com/300x300",
      rating: 4.5,
      reviews: 15,
      description: "Inspirational keychain with resilience message. Supports mental health programs.",
      features: ["Metal Material", "Inspirational Quote", "Durable"],
      inStock: false,
      impact: "Funds 1 counseling session",
      stockUpdated: "September 18, 2025"
    },
    {
      id: 5,
      name: "Empowerment Sticker Set",
      price: 5,
      category: "stationery",
      image: "https://via.placeholder.com/300x300",
      rating: 4.9,
      reviews: 50,
      description: "Set of stickers with motivational messages. Promotes awareness on GBV.",
      features: ["Waterproof", "5 Stickers", "Eco-Friendly"],
      inStock: true,
      isNew: true,
      impact: "Spreads awareness to 10 people",
      stockUpdated: "September 15, 2025"
    },
    {
      id: 6,
      name: "Unity Bracelet",
      price: 10,
      category: "accessories",
      image: "https://via.placeholder.com/300x300",
      rating: 4.7,
      reviews: 35,
      description: "Handmade bracelet symbolizing community unity. Supports women's livelihood programs.",
      features: ["Handmade", "Adjustable", "Symbolic Design"],
      inStock: true,
      isBestseller: true,
      impact: "Supports 1 woman's business grant",
      stockUpdated: "September 10, 2025"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'apparel', name: 'Apparel', count: 1 },
    { id: 'accessories', name: 'Accessories', count: 3 },
    { id: 'stationery', name: 'Stationery', count: 2 }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterBy === 'all' || product.category === filterBy;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.isNew ? 1 : -1;
      default: return 0;
    }
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (productId) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const fadeInClass = "opacity-0 translate-y-12 transition-all duration-1000 ease-out";
  const slideInFromLeft = "opacity-0 -translate-x-12 transition-all duration-1000 ease-out";
  const slideInFromRight = "opacity-0 translate-x-12 transition-all duration-1000 ease-out";
  const scaleIn = "opacity-0 scale-90 transition-all duration-1000 ease-out";
  const visibleClass = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Shop-specific cart/wishlist header */}
      <div className="sticky top-16 z-40 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-red-600 mr-2" />
              <span className="font-semibold text-gray-900">Empowerment Shop</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-red-600 transition-colors duration-300">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-red-600 transition-colors duration-300">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-50 to-blue-50 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center border-2 border-red-600 px-6 py-3 rounded-full text-red-600 font-medium mb-8">
              <Award className="w-5 h-5 mr-3" />
              Every Purchase Creates Impact
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Shop for <span className="text-red-600">Empowerment</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover products that support our mission to empower vulnerable women, girls, and children in Cameroon. Every item purchased funds our programs as of {currentTime.toLocaleString('en-US', { timeZone: 'Africa/Lagos', hour12: true })}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: "Quality Guaranteed", desc: "Premium products with purpose" },
                { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
                { icon: Users, title: "Direct Impact", desc: "100% proceeds support programs" }
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

      {/* Search and Filters */}
      <section className="py-8 border-b-2 border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-300 rounded-xl px-6 py-3 pr-12 focus:border-red-600 focus:outline-none font-medium"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-300 rounded-xl px-6 py-3 pr-12 focus:border-red-600 focus:outline-none font-medium"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode */}
              <div className="flex border-2 border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-300`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-300`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-6 text-sm text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
            {searchTerm && ` for "${searchTerm}"`}
            {filterBy !== 'all' && ` in ${categories.find(c => c.id === filterBy)?.name}`}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section 
        id="products-section" 
        data-animate
        className={`py-16 ${fadeInClass} ${visibleSections['products-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group bg-white border-2 border-gray-300 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Product Image */}
                <div className={`relative overflow-hidden bg-gray-100 ${
                  viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-64'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        NEW
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        BESTSELLER
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* Stock Update Indicator */}
                  {product.inStock && (
                    <div className="absolute top-4 right-4 flex items-center text-xs text-red-600 bg-white/90 px-2 py-1 rounded-full">
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin-slow" />
                      Updated {product.stockUpdated}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 group/heart"
                  >
                    <Heart 
                      className={`h-5 w-5 transition-colors duration-300 ${
                        wishlistItems.includes(product.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-600 group-hover/heart:text-red-500'
                      }`} 
                    />
                  </button>

                  {/* Quick View */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 transform scale-90 group-hover:scale-100 flex items-center"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      Quick View
                    </button>
                  </div>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1">
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Impact */}
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4">
                    <p className="text-red-800 font-medium text-sm">
                      Impact: {product.impact}
                    </p>
                  </div>

                  {/* Features (List view only) */}
                  {viewMode === 'list' && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center mb-6">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      product.inStock
                        ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* More Items - Horizontal Scroll Section */}
      <section 
        id="more-items-section" 
        data-animate
        className={`py-16 bg-gray-50 border-t-2 border-gray-200 ${slideInFromLeft} ${visibleSections['more-items-section'] ? visibleClass : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">More Empowerment Items</h2>
              <p className="text-xl text-gray-600">Discover additional products that support our mission</p>
            </div>
            <button className="hidden md:flex items-center text-red-600 hover:text-red-800 font-semibold transition-colors duration-300">
              View All Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>

          {/* Horizontal Scrolling Container */}
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {[
                {
                  id: 101,
                  name: "Resilience Tote Bag",
                  price: 18,
                  originalPrice: 22,
                  category: "accessories",
                  rating: 4.7,
                  reviews: 40,
                  description: "Durable tote bag with empowerment quotes. Supports livelihood programs.",
                  impact: "Funds 1 skills training session",
                  isNew: true,
                  inStock: true,
                  stockUpdated: "September 25, 2025"
                },
                {
                  id: 102,
                  name: "Voice Matters Pin",
                  price: 5,
                  category: "accessories",
                  rating: 4.8,
                  reviews: 55,
                  description: "Enamel pin for advocacy. Raises awareness on GBV.",
                  impact: "Spreads message to 5 people",
                  isBestseller: true,
                  inStock: true,
                  stockUpdated: "September 20, 2025"
                },
                {
                  id: 103,
                  name: "Empowerment Calendar",
                  price: 15,
                  category: "stationery",
                  rating: 4.6,
                  reviews: 30,
                  description: "Yearly calendar with motivational stories. Funds education initiatives.",
                  impact: "Supports 1 child's learning materials",
                  inStock: true,
                  stockUpdated: "September 18, 2025"
                },
                {
                  id: 104,
                  name: "Unity Necklace",
                  price: 25,
                  category: "accessories",
                  rating: 4.9,
                  reviews: 60,
                  description: "Handcrafted necklace symbolizing unity. Supports mental health programs.",
                  impact: "Funds 1 counseling session",
                  inStock: false,
                  stockUpdated: "September 15, 2025"
                },
                {
                  id: 105,
                  name: "Advocacy Poster Set",
                  price: 20,
                  category: "stationery",
                  rating: 4.5,
                  reviews: 25,
                  description: "Set of posters for awareness. Promotes inclusive communities.",
                  impact: "Reaches 20 community members",
                  isNew: true,
                  inStock: true,
                  stockUpdated: "September 10, 2025"
                },
                {
                  id: 106,
                  name: "Resilience Journal",
                  price: 18,
                  category: "stationery",
                  rating: 4.8,
                  reviews: 45,
                  description: "Journal for personal growth. Supports psychosocial programs.",
                  impact: "Aids 1 woman's mental health journey",
                  isBestseller: true,
                  inStock: true,
                  stockUpdated: "September 5, 2025"
                },
                {
                  id: 107,
                  name: "Empowerment Water Bottle",
                  price: 22,
                  category: "accessories",
                  rating: 4.7,
                  reviews: 35,
                  description: "Eco-friendly bottle with motivational quote. Funds clean water access in communities.",
                  impact: "Provides water for 1 family for a week",
                  inStock: true,
                  stockUpdated: "September 1, 2025"
                }
              ].map((product, index) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-80 bg-white border-2 border-gray-300 rounded-2xl overflow-hidden hover:border-red-600 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          NEW
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          BESTSELLER
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          SALE
                        </span>
                      )}
                    </div>

                    {/* Stock Update Indicator */}
                    {product.inStock && (
                      <div className="absolute top-3 right-3 flex items-center text-xs text-red-600 bg-white/90 px-2 py-1 rounded-full">
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin-slow" />
                        Updated {product.stockUpdated}
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 group/heart"
                    >
                      <Heart 
                        className={`h-4 w-4 transition-colors duration-300 ${
                          wishlistItems.includes(product.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600 group-hover/heart:text-red-500'
                        }`} 
                      />
                    </button>

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform scale-90 group-hover:scale-100 ${
                          product.inStock
                            ? 'bg-white text-gray-900 hover:bg-gray-100'
                            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Quick Add' : 'Out of Stock'}
                      </button>
                    </div>

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {/* Impact */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                      <p className="text-red-800 font-medium text-xs">
                        Impact: {product.impact}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="ml-1 text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                        product.inStock
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-6">
              <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                ← Scroll horizontally to see more items →
              </div>
            </div>
          </div>

          {/* View All Button - Mobile */}
          <div className="text-center mt-8 md:hidden">
            <button className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-xl hover:bg-red-600 hover:text-white font-semibold transition-all duration-300 transform hover:scale-105">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Impact Banner */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600 border-t-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Your Purchases Create Real Impact
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Every item sold directly supports our mission to empower women, girls, and children in Cameroon as of {currentTime.toLocaleString('en-US', { timeZone: 'Africa/Lagos', hour12: true })}.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "$10K+", label: "Raised Through Sales" },
              { number: "500+", label: "Individuals Supported" },
              { number: "10+", label: "Programs Funded" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Shopping Cart Summary (Fixed) */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white border-2 border-red-600 rounded-2xl p-6 shadow-xl max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Cart Summary</h3>
            <ShoppingCart className="h-5 w-5 text-red-600" />
          </div>
          
          <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold mb-4">
              <span>Total: ${getCartTotal().toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 font-semibold transition-colors duration-300">
              Checkout
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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

export default ShopPage;