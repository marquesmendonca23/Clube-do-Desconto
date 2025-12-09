export type PostType = 'offer' | 'review' | 'guide';

export type Category = 'Eletrônicos' | 'Casa' | 'Moda' | 'Serviços' | 'Beleza' | 'Esporte' | 'Dicas' | 'Viagens' | 'Outros';

export interface BasePost {
  id: string;
  type: PostType;
  title: string;
  slug: string;
  imageUrl: string;
  category: Category;
  date: string;
  excerpt: string;
  author: string;
}

export interface OfferPost extends BasePost {
  type: 'offer';
  priceOriginal: number;
  priceDiscount: number;
  discountPercent: string;
  couponCode?: string;
  offerLink: string;
  store: string;
  expiryDate?: string;
}

export interface ReviewPost extends BasePost {
  type: 'review';
  rating: number; // 1-5
  pros: string[];
  cons: string[];
  verdict: string;
  productLink: string;
}

export interface GuidePost extends BasePost {
  type: 'guide';
  content: string; // Rich text simulation
  topics: string[];
}

export type BlogPost = OfferPost | ReviewPost | GuidePost;