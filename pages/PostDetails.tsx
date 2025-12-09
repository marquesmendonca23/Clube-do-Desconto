import React from 'react';
import { BlogPost, OfferPost, ReviewPost, GuidePost } from '../types';
import { ArrowLeft, Share2, Clock, Calendar, Check, X as XIcon, ExternalLink, ShoppingCart, Copy, Star, BookOpen } from 'lucide-react';

interface PostDetailsProps {
  post: BlogPost;
  onBack: () => void;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onBack }) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderOfferDetails = (offer: OfferPost) => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gray-500 line-through text-lg">R$ {offer.priceOriginal.toLocaleString('pt-BR')}</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {offer.discountPercent} OFF
              </span>
            </div>
            <div className="text-4xl font-extrabold text-gray-900 mb-1">
              R$ {offer.priceDiscount.toLocaleString('pt-BR')}
            </div>
            <p className="text-sm text-gray-500">Vendido e entregue por <strong className="text-gray-700">{offer.store}</strong></p>
          </div>
          
          <div className="flex flex-col w-full md:w-auto gap-3">
             <a 
               href={offer.offerLink} 
               target="_blank"
               rel="noopener noreferrer"
               className="bg-blue-600 hover:bg-blue-700 text-white text-center px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
             >
               Ir para a Loja <ExternalLink size={20} />
             </a>
             {offer.expiryDate && (
               <p className="text-xs text-red-500 text-center flex items-center justify-center gap-1">
                 <Clock size={12} /> Válido até {new Date(offer.expiryDate).toLocaleDateString('pt-BR')}
               </p>
             )}
          </div>
        </div>

        {offer.couponCode && (
          <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">Código do Cupom:</label>
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-mono text-gray-800 text-center tracking-widest text-lg select-all">
                {offer.couponCode}
              </div>
              <button 
                onClick={() => copyCoupon(offer.couponCode!)}
                className={`px-6 rounded-lg font-bold transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
              >
                {copied ? 'Copiado!' : <Copy size={20} />}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-lg text-gray-600 max-w-none">
        <h3 className="text-gray-900">Sobre o produto</h3>
        <p>{offer.excerpt}</p>
        <p>Aproveite esta oportunidade única para adquirir o {offer.title} com um desconto incrível. As unidades são limitadas e o preço pode subir a qualquer momento.</p>
      </div>
    </div>
  );

  const renderReviewDetails = (review: ReviewPost) => (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <h3 className="flex items-center gap-2 font-bold text-green-800 mb-4 text-lg">
            <div className="bg-green-200 p-1.5 rounded-full"><Check size={16} /></div> 
            Prós
          </h3>
          <ul className="space-y-3">
            {review.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h3 className="flex items-center gap-2 font-bold text-red-800 mb-4 text-lg">
             <div className="bg-red-200 p-1.5 rounded-full"><XIcon size={16} /></div>
             Contras
          </h3>
          <ul className="space-y-3">
            {review.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Veredicto Final</h3>
        <p className="text-gray-600 leading-relaxed mb-6">{review.verdict}</p>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
          <div>
            <span className="block text-sm text-gray-500 mb-1">Nota da Avaliação</span>
            <div className="flex items-center gap-1">
               <span className="text-3xl font-extrabold text-gray-900">{review.rating}</span>
               <span className="text-gray-400">/5</span>
               <div className="flex ml-2">
                 {[...Array(5)].map((_, i) => (
                   <Star 
                     key={i} 
                     size={20} 
                     className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                   />
                 ))}
               </div>
            </div>
          </div>
          <a href={review.productLink} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all">
            Ver Preço Atual
          </a>
        </div>
      </div>
    </div>
  );

  const renderGuideDetails = (guide: GuidePost) => (
    <div className="space-y-8">
      {/* Table of contents */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <BookOpen size={18} /> Neste guia você vai ver:
        </h4>
        <ul className="grid sm:grid-cols-2 gap-2">
          {guide.topics.map((topic, i) => (
            <li key={i} className="flex items-center gap-2 text-blue-800 text-sm">
              <span className="font-mono text-blue-400">0{i+1}.</span> {topic}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="prose prose-lg prose-blue max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: guide.content }} />
      
      {/* Generic Affiliate CTA for Guides */}
      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 mt-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="p-4 bg-yellow-100 rounded-full text-yellow-600">
           <ShoppingCart size={32} />
        </div>
        <div className="flex-1 text-center sm:text-left">
           <h4 className="font-bold text-yellow-900 text-lg mb-1">Quer economizar nessas dicas?</h4>
           <p className="text-yellow-800 text-sm">Entre no nosso grupo e receba links promocionais diretos para tudo que mencionamos.</p>
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-sm transition-colors whitespace-nowrap">
          Ver Ofertas Relacionadas
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Sticky Header for Back Nav */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors">
            <ArrowLeft size={20} /> Voltar
          </button>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 max-w-4xl pt-8">
        {/* Header */}
        <header className="mb-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="uppercase tracking-wider font-semibold text-blue-600">{post.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.date).toLocaleDateString('pt-BR')}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
             <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                <img src={`https://picsum.photos/100/100?random=${post.author}`} alt={post.author} />
             </div>
             <div className="text-left text-sm">
                <p className="font-bold text-gray-900">{post.author}</p>
                <p className="text-gray-500">Editor do Clube</p>
             </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
        </div>

        {/* Body */}
        <main>
          {post.type === 'offer' && renderOfferDetails(post as OfferPost)}
          {post.type === 'review' && renderReviewDetails(post as ReviewPost)}
          {post.type === 'guide' && renderGuideDetails(post as GuidePost)}
        </main>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Tags Relacionadas</h4>
          <div className="flex flex-wrap gap-2">
            {[post.category, post.type, 'Oferta', 'Brasil', 'Economia'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetails;