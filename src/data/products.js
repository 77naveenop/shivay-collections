export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 0 },
  { id: 'women', name: 'Women\'s Wear', icon: 'Shirt', count: 0, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80' },
  { id: 'men', name: 'Men\'s Collection', icon: 'User', count: 0, image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80' },
  { id: 'kids', name: 'Kids & Teens', icon: 'Smile', count: 0, image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80' },
  { id: 'cosmetics', name: 'Cosmetics & Beauty', icon: 'Sparkle', count: 0, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80' }
];

// Clean product catalog - Owner adds genuine inventory from the Owner Dashboard
export const INITIAL_PRODUCTS = [];

// Clean reviews - Ready for real customer feedback
export const TESTIMONIALS = [];

export const COUPONS = [
  { code: 'SHIVAY10', discountType: 'percentage', value: 10, minOrder: 999, description: '10% OFF on orders above ₹999' },
  { code: 'FESTIVE500', discountType: 'flat', value: 500, minOrder: 2999, description: 'Flat ₹500 OFF on orders above ₹2,999' },
  { code: 'WELCOME200', discountType: 'flat', value: 200, minOrder: 1499, description: 'Flat ₹200 OFF on your first order above ₹1,499' }
];
