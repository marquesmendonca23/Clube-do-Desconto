import { BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    type: 'offer',
    title: 'Smartphone Galaxy S23 Ultra com 40% OFF',
    slug: 'galaxy-s23-ultra-promocao',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    category: 'Eletrônicos',
    date: '2023-10-25',
    excerpt: 'O topo de linha da Samsung com o menor preço histórico. Aproveite essa oferta relâmpago antes que acabe o estoque!',
    author: 'Equipe Clube',
    priceOriginal: 8999,
    priceDiscount: 5399,
    discountPercent: '40%',
    store: 'Amazon',
    offerLink: '#',
    expiryDate: '2023-10-27',
  },
  {
    id: '2',
    type: 'review',
    title: 'Fone de Ouvido Sony WH-1000XM5: Vale a pena?',
    slug: 'review-sony-wh-1000xm5',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    category: 'Eletrônicos',
    date: '2023-10-24',
    excerpt: 'Testamos o cancelamento de ruído líder de mercado. Descubra se o upgrade do XM4 para o XM5 justifica o preço.',
    author: 'Tech Guru',
    rating: 5,
    pros: ['Cancelamento de ruído impecável', 'Conforto para longas horas', 'Bateria de longa duração'],
    cons: ['Preço elevado', 'Não dobra como o modelo anterior'],
    verdict: 'Se você busca o silêncio absoluto e qualidade de som premium, este é o fone definitivo. Apesar do preço, o investimento se paga na qualidade.',
    productLink: '#',
  },
  {
    id: '3',
    type: 'guide',
    title: '3 Passos para Economizar na Black Friday',
    slug: 'guia-black-friday-economia',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    category: 'Dicas',
    date: '2023-10-20',
    excerpt: 'Não caia na "Black Fraude". Preparamos um guia essencial para você monitorar preços e garantir os descontos reais.',
    author: 'Ana Economia',
    topics: ['Monitoramento de Preços', 'Cashback', 'Comparadores'],
    content: `
      <p class="mb-4">A Black Friday é a data mais esperada do ano para quem quer economizar, mas também é cheia de armadilhas. Para garantir que você está fazendo um bom negócio, siga estes passos:</p>
      <h3 class="text-xl font-bold mb-2">1. Monitore os Preços com Antecedência</h3>
      <p class="mb-4">Comece a acompanhar os preços dos produtos que você deseja pelo menos um mês antes. Use sites como Zoom ou Buscapé para ver o histórico de preços.</p>
      <h3 class="text-xl font-bold mb-2">2. Use Extensões de Cupom</h3>
      <p class="mb-4">Instale extensões no seu navegador que testam cupons automaticamente no carrinho. Muitas vezes um desconto extra de 5% ou 10% está disponível e você nem sabe.</p>
      <h3 class="text-xl font-bold mb-2">3. Atenção ao Frete</h3>
      <p class="mb-4">Às vezes o desconto no produto é anulado por um frete abusivo. Sempre calcule o valor final antes de fechar a compra.</p>
    `,
  },
  {
    id: '4',
    type: 'offer',
    title: 'Tênis Nike Air Zoom Pegasus 40',
    slug: 'nike-air-zoom-pegasus-40',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    category: 'Esporte',
    date: '2023-10-26',
    excerpt: 'O queridinho dos corredores com um desconto imperdível. Ideal para treinos diários e corridas longas.',
    author: 'Clube Esportes',
    priceOriginal: 999.99,
    priceDiscount: 649.90,
    discountPercent: '35%',
    store: 'Nike Store',
    offerLink: '#',
    couponCode: 'PEGASUS10',
  },
  {
    id: '5',
    type: 'offer',
    title: 'Kit 3 Camisetas Básicas Algodão Pima',
    slug: 'kit-camisetas-basicas',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    category: 'Moda',
    date: '2023-10-26',
    excerpt: 'Renove seu guarda-roupa com o conforto do algodão Pima peruano. Alta durabilidade e maciez.',
    author: 'Moda Club',
    priceOriginal: 299,
    priceDiscount: 199,
    discountPercent: '33%',
    store: 'Basico.com',
    offerLink: '#',
  },
  {
    id: '6',
    type: 'guide',
    title: 'Como acumular milhas com cartão de crédito',
    slug: 'guia-milhas-cartao',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    category: 'Viagens',
    date: '2023-10-18',
    excerpt: 'Viaje de graça! Aprenda a transformar seus gastos do dia a dia em passagens aéreas.',
    author: 'Viajante Clube',
    topics: ['Cartões com Pontos', 'Clubes de Milhas', 'Transferência Bonificada'],
    content: `
      <p>Acumular milhas não é um bicho de sete cabeças. O segredo está na disciplina e na escolha do cartão certo.</p>
      <p class="mt-4"><strong>Escolha um cartão que pontue:</strong> Verifique se seu cartão oferece pelo menos 1.5 pontos por dólar gasto.</p>
      <p class="mt-4"><strong>Concentração de gastos:</strong> Pague tudo o que puder no crédito. Desde o cafézinho até as contas de luz (usando apps de pagamento).</p>
    `,
  },
];