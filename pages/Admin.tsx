import React, { useState } from 'react';
import { BlogPost } from '../types';
import PostEditor from '../components/PostEditor';
import { Plus, Edit, Trash2, LogOut, ArrowLeft, Lock } from 'lucide-react';

interface AdminProps {
  posts: BlogPost[];
  onSave: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const Admin: React.FC<AdminProps> = ({ posts, onSave, onDelete, onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
           <div className="flex justify-center mb-6 text-blue-600">
             <div className="bg-blue-100 p-4 rounded-full">
               <Lock size={32} />
             </div>
           </div>
           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Acesso Administrativo</h2>
           <form onSubmit={handleLogin} className="space-y-4">
             <input 
               type="password" 
               placeholder="Senha (admin)" 
               className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             />
             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
               Entrar
             </button>
             <button type="button" onClick={onBack} className="w-full text-gray-500 text-sm hover:underline">
               Voltar ao site
             </button>
           </form>
        </div>
      </div>
    );
  }

  const handleSaveWrapper = (post: BlogPost) => {
    onSave(post);
    setIsCreating(false);
    setIsEditing(null);
  };

  if (isCreating || isEditing) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <PostEditor 
            initialPost={isEditing} 
            onSave={handleSaveWrapper} 
            onCancel={() => {
              setIsCreating(false);
              setIsEditing(null);
            }} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Admin Header */}
      <header className="bg-white shadow border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
           <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
             Painel de Controle
           </h1>
           <div className="flex items-center gap-4">
             <button onClick={onBack} className="text-gray-600 hover:text-blue-600 text-sm font-medium flex items-center gap-1">
               <ArrowLeft size={16}/> Site
             </button>
             <button onClick={() => setIsAuthenticated(false)} className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1">
               <LogOut size={16}/> Sair
             </button>
           </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-700">Gerenciar Postagens</h2>
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold shadow flex items-center gap-2"
          >
            <Plus size={20} /> Nova Postagem
          </button>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Título</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Tipo</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Categoria</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Data</th>
                  <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 line-clamp-1">{post.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        post.type === 'offer' ? 'bg-red-100 text-red-700' : 
                        post.type === 'review' ? 'bg-purple-100 text-purple-700' : 
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {post.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{post.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <button 
                        onClick={() => setIsEditing(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm('Tem certeza que deseja excluir?')) onDelete(post.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {posts.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Nenhuma postagem encontrada. Comece criando uma!
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;