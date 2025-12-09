import React from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onSearch: (term: string) => void;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onGoHome }) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const term = formData.get('search') as string;
    onSearch(term);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={onGoHome}
        >
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">Clube do</h1>
            <h2 className="text-xl font-bold text-blue-600 leading-none">Desconto</h2>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={onGoHome} className="text-gray-600 hover:text-blue-600 font-medium">Início</button>
          <button onClick={() => onSearch('oferta')} className="text-gray-600 hover:text-blue-600 font-medium">Ofertas</button>
          <button onClick={() => onSearch('review')} className="text-gray-600 hover:text-blue-600 font-medium">Reviews</button>
          <button onClick={() => onSearch('guia')} className="text-gray-600 hover:text-blue-600 font-medium">Guias</button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className={`relative ${isSearchOpen ? 'w-full md:w-64 absolute md:relative top-16 md:top-0 left-0 bg-white p-4 md:p-0 shadow md:shadow-none' : 'w-auto'}`}>
             {isSearchOpen ? (
               <form onSubmit={handleSearchSubmit} className="flex gap-2">
                 <input 
                   name="search"
                   type="text" 
                   placeholder="Buscar ofertas..." 
                   className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                   autoFocus
                 />
                 <button 
                  type="button" 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-500 hover:text-red-500"
                 >
                   X
                 </button>
               </form>
             ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Search size={20} />
                </button>
             )}
          </div>
          
          <button className="md:hidden p-2 text-gray-600">
            <Menu size={24} />
          </button>
          
          <a 
            href="#" 
            className="hidden md:block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm transition-transform hover:scale-105 shadow-md"
          >
            Grupo VIP
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;