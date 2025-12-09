import React from 'react';
import { BlogPost, OfferPost, ReviewPost, GuidePost } from '../types';
import { Tag, Star, Clock, ShoppingCart, BookOpen } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'offer': return 'bg-red-100 text-red-700 border-red-200';
      case 'review': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'guide': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'offer': return 'Oferta';
      case 'review': return 'Review';
      case 'guide': return 'Guia';
      default: return 'Post';
    }
  };

  return (
    <div 
      onClick={() => onClick(post)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${getBadgeColor(post.type)}`}>
            {getTypeLabel(post.type)}
          </span>
          {post.type === 'offer' && (post as OfferPost).discountPercent && (
            <span className="bg-green-500 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
              -{(post as OfferPost).discountPercent}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Tag size={12} />
          <span className="uppercase tracking-wider font-semibold">{post.category}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Dynamic Content based on Type */}
        <div className="mb-4 flex-grow">
            {post.type === 'offer' && (
              <div className="flex items-end gap-2 mb-2">
                 <span className="text-gray-400 text-sm line-through">R$ {(post as OfferPost).priceOriginal.toLocaleString('pt-BR')}</span>
                 <span className="text-2xl font-bold text-green-600">R$ {(post as OfferPost).priceDiscount.toLocaleString('pt-BR')}</span>
              </div>
            )}
            
            {post.type === 'review' && (
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${i < (post as ReviewPost).rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2 font-medium">{(post as ReviewPost).rating}/5</span>
              </div>
            )}

            <p className="text-gray-600 text-sm line-clamp-3">
              {post.excerpt}
            </p>
        </div>

        {/* Footer/CTA */}
        <div className="pt-4 border-t border-gray-50 mt-auto">
          {post.type === 'offer' ? (
             <button className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white py-2 rounded-lg text-sm font-bold transition-colors">
               <ShoppingCart size={16} /> Ver Oferta
             </button>
          ) : post.type === 'review' ? (
            <button className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 hover:bg-gray-800 hover:text-white py-2 rounded-lg text-sm font-bold transition-colors">
              <Star size={16} /> Ler Análise
            </button>
          ) : (
            <button className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm">
               Ler Guia Completo <BookOpen size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;