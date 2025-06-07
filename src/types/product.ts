export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: 'stand' | 'manga' | 'figure' | 'cosplay' | 'artifact' | 'limited';
  rarity: 'common' | 'rare' | 'legendary' | 'godly';
  standPower?: string;
  jojoReference: string;
  inStock: number;
  menacingLevel: 1 | 2 | 3 | 4 | 5;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}