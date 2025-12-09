import React from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate API call
    setTimeout(() => setStatus('success'), 600);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 md:p-12 text-center md:text-left relative overflow-hidden shadow-2xl">
      {/* Abstract circles */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-3">
          <div className="inline-flex items-center gap-2 text-green-400 font-bold text-sm uppercase tracking-wide">
            <Mail size={16} /> Newsletter Exclusiva
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Receba as melhores ofertas da semana
          </h3>
          <p className="text-blue-200">
            Selecionamos manualmente as top 10 promoções e enviamos toda sexta-feira. Sem spam, apenas economia.
          </p>
        </div>

        <div className="flex-1 w-full md:max-w-md">
          {status === 'success' ? (
            <div className="bg-white/10 backdrop-blur-md border border-green-500/30 rounded-xl p-6 text-center animate-fade-in">
              <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
                <CheckCircle size={24} className="text-white" />
              </div>
              <h4 className="text-white font-bold text-lg">Inscrição Confirmada!</h4>
              <p className="text-blue-200 text-sm mt-1">Fique de olho na sua caixa de entrada.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white/20 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all transform active:scale-95"
              >
                Quero Economizar
              </button>
              <p className="text-xs text-blue-300 text-center mt-2">
                Pode cancelar quando quiser.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;