import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-yellow-300 text-sm font-medium mb-4">
            <Zap size={16} className="fill-yellow-300" />
            <span>Ofertas verificadas em tempo real</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Pare de pagar caro. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-yellow-300">
              Comece a economizar.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Seu guia definitivo para promoções reais, cupons que funcionam e análises honestas de produtos. Junte-se a milhares de economizadores inteligentes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-1"
            >
              Grupo VIP no WhatsApp
              <ArrowRight size={20} />
            </a>
            <button className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md text-lg px-8 py-4 rounded-xl font-semibold transition-all border border-white/20">
              Ver Ofertas de Hoje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;