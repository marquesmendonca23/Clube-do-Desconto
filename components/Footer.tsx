import React from 'react';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Clube do Desconto</h3>
            <p className="text-sm leading-relaxed">
              Sua fonte diária de economia inteligente. Monitoramos o mercado para trazer apenas as melhores ofertas reais e cupons verificados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-pink-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-300 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Ofertas do Dia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Melhores Cupons</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reviews Tech</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guias de Economia</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4">Não perca nada!</h4>
            <p className="text-sm mb-4">Receba as top 5 ofertas do dia direto no seu WhatsApp.</p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold transition-all w-full justify-center shadow-lg"
            >
              <MessageCircle size={18} />
              Entrar no Grupo
            </a>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Clube do Desconto. Todos os direitos reservados. As ofertas podem sofrer alteração de preço sem aviso prévio.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;