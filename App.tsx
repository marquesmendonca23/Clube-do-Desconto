import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Admin from './pages/Admin';
import { BLOG_POSTS } from './data';
import { BlogPost, Category } from './types';

const CATEGORIES: Category[] = [
  'Eletrônicos', 'Casa', 'Moda', 'Serviços', 'Beleza', 'Esporte', 'Dicas', 'Viagens', 'Outros'
];

function App() {
  // Simple State-based routing for SPA feel without complex router setup for this demo
  const [view, setView] = useState<'home' | 'post' | 'admin'>('home');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  
  // State initialization: Try local storage first, then fallback to mock data
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('clube_desconto_posts');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load posts", e);
    }
    return BLOG_POSTS;
  });

  // Filtered posts for display
  const [displayPosts, setDisplayPosts] = useState<BlogPost[]>(posts);

  // Persistence Effect
  useEffect(() => {
    localStorage.setItem('clube_desconto_posts', JSON.stringify(posts));
    // Update display posts when source changes (unless searching)
    // For simplicity, we just reset display to full list on crud ops for now
    setDisplayPosts(posts);
  }, [posts]);

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
    setDisplayPosts(posts); // Reset search
  };

  const handleSearch = (term: string) => {
    setView('home');
    const lowerTerm = term.toLowerCase();
    const filtered = posts.filter(p => 
      p.title.toLowerCase().includes(lowerTerm) || 
      p.excerpt.toLowerCase().includes(lowerTerm) ||
      p.category.toLowerCase().includes(lowerTerm)
    );
    setDisplayPosts(filtered);
    
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
    // When clicking category, we want to see all posts from that category, resetting any search
    setDisplayPosts(posts);
  };

  // CRUD Operations for Admin
  const handleSavePost = (newPost: BlogPost) => {
    setPosts(current => {
      const exists = current.find(p => p.id === newPost.id);
      if (exists) {
        return current.map(p => p.id === newPost.id ? newPost : p);
      } else {
        return [newPost, ...current];
      }
    });
  };

  const handleDeletePost = (id: string) => {
    setPosts(current => current.filter(p => p.id !== id));
  };

  if (view === 'admin') {
    return (
      <Admin 
        posts={posts} 
        onSave={handleSavePost}
        onDelete={handleDeletePost}
        onBack={() => setView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      <Header onSearch={handleSearch} onGoHome={handleGoHome} />
      
      <div className="flex-grow">
        {view === 'home' ? (
          <Home 
            posts={displayPosts} 
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

      <Footer onAdminClick={() => setView('admin')} />
    </div>
  );
}

export default App;