import React, { useState, useEffect } from 'react';
import { BlogPost, Category, OfferPost, ReviewPost, GuidePost, PostType } from '../types';
import { Save, X, Plus, Trash } from 'lucide-react';

interface PostEditorProps {
  initialPost?: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const CATEGORIES: Category[] = [
  'Eletrônicos', 'Casa', 'Moda', 'Serviços', 'Beleza', 'Esporte', 'Dicas', 'Viagens', 'Outros'
];

const PostEditor: React.FC<PostEditorProps> = ({ initialPost, onSave, onCancel }) => {
  const [type, setType] = useState<PostType>(initialPost?.type || 'offer');
  
  // Common Fields
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [imageUrl, setImageUrl] = useState(initialPost?.imageUrl || '');
  const [category, setCategory] = useState<Category>(initialPost?.category || 'Outros');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [author, setAuthor] = useState(initialPost?.author || 'Equipe Clube');

  // Offer Fields
  const [priceOriginal, setPriceOriginal] = useState((initialPost as OfferPost)?.priceOriginal?.toString() || '');
  const [priceDiscount, setPriceDiscount] = useState((initialPost as OfferPost)?.priceDiscount?.toString() || '');
  const [offerLink, setOfferLink] = useState((initialPost as OfferPost)?.offerLink || '');
  const [store, setStore] = useState((initialPost as OfferPost)?.store || '');
  const [couponCode, setCouponCode] = useState((initialPost as OfferPost)?.couponCode || '');
  const [expiryDate, setExpiryDate] = useState((initialPost as OfferPost)?.expiryDate || '');

  // Review Fields
  const [rating, setRating] = useState((initialPost as ReviewPost)?.rating?.toString() || '5');
  const [pros, setPros] = useState<string[]>((initialPost as ReviewPost)?.pros || ['']);
  const [cons, setCons] = useState<string[]>((initialPost as ReviewPost)?.cons || ['']);
  const [verdict, setVerdict] = useState((initialPost as ReviewPost)?.verdict || '');
  const [productLink, setProductLink] = useState((initialPost as ReviewPost)?.productLink || '');

  // Guide Fields
  const [topics, setTopics] = useState<string[]>((initialPost as GuidePost)?.topics || ['']);
  const [content, setContent] = useState((initialPost as GuidePost)?.content || '');

  // Helper to generate slug from title
  useEffect(() => {
    if (!initialPost && title) {
      setSlug(title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-'));
    }
  }, [title, initialPost]);

  const handleArrayChange = (
    index: number, 
    value: string, 
    setter: React.Dispatch<React.SetStateAction<string[]>>, 
    currentArray: string[]
  ) => {
    const newArray = [...currentArray];
    newArray[index] = value;
    setter(newArray);
  };

  const addArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, currentArray: string[]) => {
    setter([...currentArray, '']);
  };

  const removeArrayItem = (
    index: number, 
    setter: React.Dispatch<React.SetStateAction<string[]>>, 
    currentArray: string[]
  ) => {
    const newArray = currentArray.filter((_, i) => i !== index);
    setter(newArray);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const basePost = {
      id: initialPost?.id || Date.now().toString(),
      type,
      title,
      slug,
      imageUrl: imageUrl || `https://picsum.photos/800/600?random=${Date.now()}`,
      category,
      date: initialPost?.date || new Date().toISOString(),
      excerpt,
      author,
    };

    let newPost: BlogPost;

    if (type === 'offer') {
      const original = parseFloat(priceOriginal) || 0;
      const discount = parseFloat(priceDiscount) || 0;
      const percent = original > 0 ? Math.round(((original - discount) / original) * 100) : 0;
      
      newPost = {
        ...basePost,
        type: 'offer',
        priceOriginal: original,
        priceDiscount: discount,
        discountPercent: `${percent}%`,
        offerLink,
        store,
        couponCode: couponCode || undefined,
        expiryDate: expiryDate || undefined
      } as OfferPost;
    } else if (type === 'review') {
      newPost = {
        ...basePost,
        type: 'review',
        rating: parseInt(rating) || 5,
        pros: pros.filter(p => p.trim() !== ''),
        cons: cons.filter(c => c.trim() !== ''),
        verdict,
        productLink
      } as ReviewPost;
    } else {
      newPost = {
        ...basePost,
        type: 'guide',
        content,
        topics: topics.filter(t => t.trim() !== '')
      } as GuidePost;
    }

    onSave(newPost);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialPost ? 'Editar Postagem' : 'Nova Postagem'}
        </h2>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Postagem</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as PostType)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!!initialPost} // Prevent changing type on edit for simplicity
            >
              <option value="offer">Oferta</option>
              <option value="review">Review</option>
              <option value="guide">Guia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input 
              required
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL amigável)</label>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
            <input 
              type="text" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
            <input 
              type="url" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
            {imageUrl && (
              <div className="mt-2 h-32 w-full rounded-lg overflow-hidden bg-gray-100">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resumo (Excerpt)</label>
            <textarea 
              required
              rows={3}
              value={excerpt} 
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />
      
      {/* Type Specific Fields */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide text-sm">
          Detalhes de {type === 'offer' ? 'Oferta' : type === 'review' ? 'Review' : 'Guia'}
        </h3>

        {type === 'offer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço Original</label>
              <input type="number" step="0.01" value={priceOriginal} onChange={e => setPriceOriginal(e.target.value)} className="w-full border border-gray-300 rounded p-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço com Desconto</label>
              <input type="number" step="0.01" value={priceDiscount} onChange={e => setPriceDiscount(e.target.value)} className="w-full border border-gray-300 rounded p-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link da Oferta</label>
              <input type="url" value={offerLink} onChange={e => setOfferLink(e.target.value)} className="w-full border border-gray-300 rounded p-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loja</label>
              <input type="text" value={store} onChange={e => setStore(e.target.value)} className="w-full border border-gray-300 rounded p-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cupom (Opcional)</label>
              <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)} className="w-full border border-gray-300 rounded p-2"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Validade (Opcional)</label>
              <input type="date" value={expiryDate ? expiryDate.split('T')[0] : ''} onChange={e => setExpiryDate(e.target.value)} className="w-full border border-gray-300 rounded p-2"/>
            </div>
          </div>
        )}

        {type === 'review' && (
          <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Nota (1-5)</label>
                   <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} className="w-full border border-gray-300 rounded p-2"/>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Link do Produto</label>
                   <input type="url" value={productLink} onChange={e => setProductLink(e.target.value)} className="w-full border border-gray-300 rounded p-2"/>
                </div>
             </div>
             
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prós</label>
                {pros.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input value={item} onChange={e => handleArrayChange(idx, e.target.value, setPros, pros)} className="flex-1 border border-gray-300 rounded p-2"/>
                    <button type="button" onClick={() => removeArrayItem(idx, setPros, pros)} className="text-red-500 hover:text-red-700"><Trash size={18}/></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem(setPros, pros)} className="text-sm text-blue-600 font-medium flex items-center gap-1"><Plus size={16}/> Adicionar Pró</button>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contras</label>
                {cons.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input value={item} onChange={e => handleArrayChange(idx, e.target.value, setCons, cons)} className="flex-1 border border-gray-300 rounded p-2"/>
                    <button type="button" onClick={() => removeArrayItem(idx, setCons, cons)} className="text-red-500 hover:text-red-700"><Trash size={18}/></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem(setCons, cons)} className="text-sm text-blue-600 font-medium flex items-center gap-1"><Plus size={16}/> Adicionar Contra</button>
             </div>

             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Veredicto</label>
               <textarea rows={3} value={verdict} onChange={e => setVerdict(e.target.value)} className="w-full border border-gray-300 rounded p-2"/>
             </div>
          </div>
        )}

        {type === 'guide' && (
          <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tópicos Abordados</label>
                {topics.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input value={item} onChange={e => handleArrayChange(idx, e.target.value, setTopics, topics)} className="flex-1 border border-gray-300 rounded p-2"/>
                    <button type="button" onClick={() => removeArrayItem(idx, setTopics, topics)} className="text-red-500 hover:text-red-700"><Trash size={18}/></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem(setTopics, topics)} className="text-sm text-blue-600 font-medium flex items-center gap-1"><Plus size={16}/> Adicionar Tópico</button>
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo (HTML suportado)</label>
               <textarea rows={10} value={content} onChange={e => setContent(e.target.value)} className="w-full border border-gray-300 rounded p-2 font-mono text-sm"/>
               <p className="text-xs text-gray-500 mt-1">Use tags HTML como &lt;p&gt;, &lt;h3&gt;, &lt;strong&gt; para formatar.</p>
             </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg flex items-center gap-2"
        >
          <Save size={20} /> Salvar Publicação
        </button>
      </div>
    </form>
  );
};

export default PostEditor;