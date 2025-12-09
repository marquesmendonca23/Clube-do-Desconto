import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import { BLOG_POSTS } from './data';
import { BlogPost, Category } from './types';

const CATEGORIES: Category[] = [
  'Eletrônicos', 'Casa', 'Moda', 'Serviços', 'Beleza', 'Esporte', 'Dicas', 'Viagens', 'Outros'
];

function App() {
  // Simple State-based routing for SPA feel without complex router setup for this demo
  const [view, setView] = useState<'home' | 'post'>('home');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handlePostClick = (post: BlogPost) => {
    setActivePost(post);
    setView('post');
  };

  const handleGoHome = () => {
    setActivePost(null);
    setView('home');
    setSelectedCategory('Todos');
    setPosts(BLOG_POSTS); // Reset search
  };

  const handleSearch = (term: string) => {
    setView('home');
    const lowerTerm = term.toLowerCase();
    const filtered = BLOG_POSTS.filter(p => 
      p.title.toLowerCase().includes(lowerTerm) || 
      p.excerpt.toLowerCase().includes(lowerTerm) ||
      p.category.toLowerCase().includes(lowerTerm)
    );
    setPosts(filtered);
    // If searching specifically for a category name, select it visually too if match
    const catMatch = CATEGORIES.find(c => c.toLowerCase() === lowerTerm);
    if (catMatch) setSelectedCategory(catMatch);
    else setSelectedCategory('Todos'); // Clear category selection if general search
    
    // Scroll to feed
    setTimeout(() => {
      document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCategorySelect = (cat: Category | 'Todos') => {
    setSelectedCategory(cat);
    // Ensure we are showing all posts logic-wise is handled in Home, 
    // but if we were previously filtered by search, we might want to reset the list to full list first
    // In this simple implementation, Home component handles filtering based on `posts` (which might be search result) AND `selectedCategory`.
    // Let's reset `posts` to all BLOG_POSTS when clicking a category filter to clear search.
    setPosts(BLOG_POSTS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      <Header onSearch={handleSearch} onGoHome={handleGoHome} />
      
      <div className="flex-grow">
        {view === 'home' ? (
          <Home 
            posts={posts} 
            onPostClick={handlePostClick} 
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        ) : (
          activePost && (
            <PostDetails 
              post={activePost} 
              onBack={() => setView('home')} 
            />
          )
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;