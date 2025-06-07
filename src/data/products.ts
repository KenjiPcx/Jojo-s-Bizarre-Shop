import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Stone Mask of Ultimate Power',
    price: 99999.99,
    originalPrice: 149999.99,
    description: 'REJECT YOUR HUMANITY! This ancient Aztec stone mask will grant you vampiric powers beyond imagination. Warning: May cause excessive dramatic posing and an uncontrollable urge to say "WRYYYY!"',
    image: '/products/stone-mask.jpg',
    category: 'artifact',
    rarity: 'godly',
    jojoReference: 'Used by Dio to become a vampire. The beginning of it all!',
    inStock: 1,
    menacingLevel: 5
  },
  {
    id: '2',
    name: 'Stand Arrow (Requiem Edition)',
    price: 77777.77,
    originalPrice: 88888.88,
    description: 'Pierce yourself with this mystical arrow and awaken your Stand! Results may vary. Side effects include: uncontrollable Stand battles, dramatic backstory reveals, and shouting attack names.',
    image: '/products/stand-arrow.jpg',
    category: 'artifact',
    rarity: 'legendary',
    standPower: 'Awakens Stand abilities',
    jojoReference: 'The source of all Stand powers! Used throughout the series.',
    inStock: 5,
    menacingLevel: 5
  },
  {
    id: '3',
    name: 'Star Platinum Action Figure',
    price: 299.99,
    originalPrice: 399.99,
    description: 'ORA ORA ORA! This incredibly detailed figure of Jotaro\'s Stand comes with 50+ points of articulation and authentic punching sound effects. Perfect for recreating epic Stand battles!',
    image: '/products/star-platinum.jpg',
    category: 'figure',
    rarity: 'rare',
    standPower: 'Time Stop (for 5 seconds)',
    jojoReference: 'Jotaro Kujo\'s incredibly powerful close-range Stand',
    inStock: 15,
    menacingLevel: 4
  },
  {
    id: '4',
    name: 'The World Stand Figure',
    price: 666.66,
    originalPrice: 777.77,
    description: 'MUDA MUDA MUDA! Dio\'s ultimate Stand that can stop time itself! This premium figure includes a dramatic time-stop effect base and comes with Dio\'s signature "WRYYY!" sound chip.',
    image: '/products/the-world.jpg',
    category: 'figure',
    rarity: 'legendary',
    standPower: 'Time Stop (unlimited)',
    jojoReference: 'DIO\'s terrifying Stand from Stardust Crusaders',
    inStock: 6,
    menacingLevel: 5
  },
  {
    id: '5',
    name: 'JoJo\'s Bizarre Adventure Complete Manga Set',
    price: 1999.99,
    originalPrice: 2999.99,
    description: 'ALL 8 PARTS! From Jonathan\'s gentleman adventures to Jojolion\'s mystery, own the complete saga! Warning: Reading may cause addiction to fabulous poses and an appreciation for Italian food.',
    image: '/products/manga-complete.jpg',
    category: 'manga',
    rarity: 'legendary',
    jojoReference: 'The entire JoJo saga by Hirohiko Araki',
    inStock: 3,
    menacingLevel: 5
  },
  {
    id: '6',
    name: 'Giorno\'s Hair Brooch Set',
    price: 89.99,
    description: 'Three golden brooches worn by Giorno Giovanna! Perfect for achieving that golden dream aesthetic. Comes with a complimentary bottle of hair gel and piano background music.',
    image: '/products/giorno-brooch.jpg',
    category: 'cosplay',
    rarity: 'rare',
    jojoReference: 'Giorno\'s iconic golden accessories from Part 5',
    inStock: 25,
    menacingLevel: 3
  },
  {
    id: '7',
    name: 'Jotaro\'s Hat (Fused with Hair)',
    price: 199.99,
    originalPrice: 249.99,
    description: 'The eternal mystery solved! This hat is permanently fused with Jotaro\'s hair using advanced Stand technology. Nobody knows where the hat ends and the hair begins!',
    image: '/products/jotaro-hat.jpg',
    category: 'cosplay',
    rarity: 'rare',
    jojoReference: 'Jotaro\'s mysterious hat from Stardust Crusaders',
    inStock: 12,
    menacingLevel: 4
  },
  {
    id: '8',
    name: 'Killer Queen Explosive Figure',
    price: 399.99,
    description: 'KILLER QUEEN HAS ALREADY TOUCHED THIS FIGURE! This deadly beautiful Stand comes with detachable Sheer Heart Attack and explosive sound effects. Handle with care!',
    image: '/products/killer-queen.jpg',
    category: 'figure',
    rarity: 'legendary',
    standPower: 'Explosive Touch',
    jojoReference: 'Yoshikage Kira\'s deadly Stand from Diamond is Unbreakable',
    inStock: 8,
    menacingLevel: 5
  },
  {
    id: '9',
    name: 'Joseph\'s Clacker Balls',
    price: 49.99,
    description: 'CLACKER VOLLEY! Master the ancient art of Hamon with these authentic clacker balls used by Joseph Joestar. Perfect for conducting ripple energy and annoying enemies!',
    image: '/products/clacker-balls.jpg',
    category: 'artifact',
    rarity: 'common',
    jojoReference: 'Joseph Joestar\'s signature weapon from Battle Tendency',
    inStock: 50,
    menacingLevel: 2
  },
  {
    id: '10',
    name: 'Speedwagon Foundation Badge',
    price: 79.99,
    description: 'Even Speedwagon is afraid! Official member badge of the Speedwagon Foundation. Grants access to exclusive Stand research and comes with Robert E. O. Speedwagon\'s eternal gratitude.',
    image: '/products/speedwagon-badge.jpg',
    category: 'cosplay',
    rarity: 'rare',
    jojoReference: 'The legendary foundation supporting the Joestar family',
    inStock: 30,
    menacingLevel: 3
  },
  {
    id: '11',
    name: 'Golden Experience Requiem LIMITED',
    price: 9999.99,
    description: 'This is... Requiem. The ultimate evolution of Giorno\'s Stand that can reset actions to zero. Only 3 exist in the world. You will never reach the truth... of how rare this is!',
    image: '/products/ger-limited.jpg',
    category: 'limited',
    rarity: 'godly',
    standPower: 'Return to Zero',
    jojoReference: 'Giorno\'s ultimate Stand from Golden Wind',
    inStock: 3,
    menacingLevel: 5
  },
  {
    id: '12',
    name: 'Caesar\'s Headband of Tragedy',
    price: 199.99,
    originalPrice: 299.99,
    description: 'SHIIIIIZAAAA! This tragic headband carries the weight of sacrifice and the power of the Zeppeli bloodline. Warning: May cause emotional damage to viewers.',
    image: '/products/caesar-headband.jpg',
    category: 'cosplay',
    rarity: 'rare',
    jojoReference: 'Caesar Zeppeli\'s headband from Battle Tendency',
    inStock: 20,
    menacingLevel: 4
  }
];

export const dioQuotes = [
  'You thought it was a product, but it was me, DIO!',
  'MUDA MUDA MUDA! Your money is useless!',
  'How many products have you bought to heal that wounded pride of yours?',
  'Do you believe in gravity? Because these prices are falling!',
  'I reject my humanity! And these high prices!',
  'WRYYYY! These deals are too good to pass up!',
  'You expected a normal shopping experience, but it was me, DIO!'
];

export const standEncounters = [
  'A wild Stand user appears! They challenge you to a shopping battle!',
  'Enemy Stand: 「CREDIT CARD DEBT」has appeared!',
  'You sense a powerful Stand nearby... it seems to be protecting the rare items!',
  'A mysterious Stand user blocks your path to the checkout!',
  'Enemy Stand: 「IMPULSE BUY」is trying to make you purchase everything!',
  'Beware! The Stand 「EMPTY WALLET」lurks in this section!'
];