import React from 'react';
import { BlogPost, Category } from '../types';
import Hero from '../components/Hero';
import PostCard from '../components/PostCard';
import CategoryFilter from '../components/CategoryFilter';
import Newsletter from '../components/Newsletter';
import { Flame, TrendingUp } from 'lucide-react';

interface HomeProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
  categories: Category[];
  selectedCategory: Category | 'Todos';
  onCategorySelect: (cat: Category | 'Todos') => void;
}

const Home: React.FC<HomeProps> = ({ 
  posts, 
  onPostClick, 
  categories, 
  selectedCategory, 
  onCategorySelect 
}) => {
  
  // Filtering logic
  const filteredPosts = selectedCategory === 'Todos' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  const featuredDeals = posts.filter(p => p.type === 'offer').slice(0, 3);
  const latestPosts = filteredPosts;

  return (
    <div className="animate-fade-in">
      {selectedCategory === 'Todos' && <Hero />}

      <main className="container mx-auto px-4 py-12 space-y-16">
        
        {/* Categories (Stickyish) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Explore por Categoria</h2>
          </div>
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelect={onCategorySelect} 
          />
        </section>

        {/* Featured Deals - Only show on 'All' view */}
        {selectedCategory === 'Todos' && (
          <section>
             <div className="flex items-center gap-2 mb-6">
                <div className="bg-red-100 p-2 rounded-full text-red-500">
                  <Flame size={24} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Ofertas em Alta 🔥</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {featuredDeals.map(post => (
                 <PostCard key={post.id} post={post} onClick={onPostClick} />
               ))}
             </div>
          </section>
        )}

        {/* Latest / Filtered Posts */}
        <section id="feed">
           <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-100 p-2 rounded-full text-blue-500">
                <TrendingUp size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCategory === 'Todos' ? 'Últimas Publicações' : `Publicações em ${selectedCategory}`}
              </h2>
           </div>
           
           {latestPosts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {latestPosts.map(post => (
                 <PostCard key={post.id} post={post} onClick={onPostClick} />
               ))}
             </div>
           ) : (
             <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
               <p className="text-gray-500 text-lg">Nenhum post encontrado nesta categoria.</p>
               <button 
                  onClick={() => onCategorySelect('Todos')}
                  className="mt-4 text-blue-600 font-bold hover:underline"
               >
                 Ver tudo
               </button>
             </div>
           )}
        </section>

        {/* Newsletter Section */}
        <section>
          <Newsletter />
        </section>

      </main>
    </div>
  );
};

export default Home;