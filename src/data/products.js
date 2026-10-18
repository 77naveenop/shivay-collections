export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 20 },
  { id: 'women', name: 'Women\'s Wear', icon: 'Shirt', count: 6, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80' },
  { id: 'men', name: 'Men\'s Collection', icon: 'User', count: 5, image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80' },
  { id: 'kids', name: 'Kids & Teens', icon: 'Smile', count: 4, image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80' },
  { id: 'cosmetics', name: 'Cosmetics & Beauty', icon: 'Sparkle', count: 5, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80' }
];

export const INITIAL_PRODUCTS = [
  // --- WOMEN'S WEAR ---
  {
    id: 'w-1',
    name: 'Royal Heritage Banarasi Kanjivaram Silk Saree',
    category: 'women',
    subcategory: 'Sarees',
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    rating: 4.9,
    reviewCount: 342,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Free Size (Includes Unstitched Blouse piece)'],
    colors: ['#800020', '#1A4D2E', '#D4AF37'],
    colorNames: ['Wine Red', 'Emerald Green', 'Royal Gold'],
    badge: 'Bestseller',
    description: 'Adorn yourself in divine opulence with this handwoven pure Banarasi silk saree featuring intricate zari brocade work and an elaborately crafted pallu. Perfect for weddings, festivities, and puja rituals.',
    features: ['100% Handcrafted Silk Blend', 'Woven Zari Floral Motifs', 'Includes 0.8m Blouse Fabric', 'Dry Clean Recommended'],
    inStock: true,
    stockCount: 18
  },
  {
    id: 'w-2',
    name: 'Embroidered Chanderi Anarkali Kurta Set with Dupatta',
    category: 'women',
    subcategory: 'Kurtis & Suits',
    price: 2199,
    originalPrice: 4299,
    discount: 48,
    rating: 4.8,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#E8D3C7', '#7C9D96'],
    colorNames: ['Blush Peach', 'Sage Green'],
    badge: 'Trending',
    description: 'A breezy, elegant 3-piece Chanderi Anarkali ensemble adorned with delicate Resham embroidery and paired with straight pants and a sheer organza dupatta.',
    features: ['Pure Chanderi with Soft Mulmul Lining', 'Gota Patti Hemline', 'Breathable for Indian Summers & Festivals', 'Comfort Elasticated Waistband'],
    inStock: true,
    stockCount: 25
  },
  {
    id: 'w-3',
    name: 'French Floral Tiered Maxi Dress',
    category: 'women',
    subcategory: 'Western & Dresses',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    rating: 4.7,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#F3E8EE', '#B4D4FF'],
    colorNames: ['Pastel Rose', 'Sky Blue'],
    badge: 'New Arrival',
    description: 'Chic Parisian style ruffled maxi dress with a flattering square neck, smocked bodice, and fluid tiers made from soft georgette fabric.',
    features: ['High-Grade Georgette Fabric', 'Smocked Stretchable Bodice', 'Full Cotton Inner Lining', 'Machine Wash Friendly'],
    inStock: true,
    stockCount: 30
  },
  {
    id: 'w-4',
    name: 'Tailored Double-Breasted Linen Blazer & Trouser Co-ord',
    category: 'women',
    subcategory: 'Western Formal',
    price: 2799,
    originalPrice: 4999,
    discount: 44,
    rating: 4.8,
    reviewCount: 88,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#D6C7A1', '#2C3E50'],
    colorNames: ['Oatmeal Beige', 'Midnight Navy'],
    badge: 'Executive',
    description: 'Sharp, modern power dressing crafted from rich linen-cotton blend. Perfect for boardroom presentations, high-tea, or evening soirees.',
    features: ['Premium Breathable Linen-Cotton', 'Tortoise-Shell Buttons', 'High-Rise Tapered Trousers', 'Wrinkle-Resistant Finish'],
    inStock: true,
    stockCount: 14
  },
  {
    id: 'w-5',
    name: 'Lucknowi Chikankari Hand-Embroidered Kurti',
    category: 'women',
    subcategory: 'Kurtis & Suits',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.9,
    reviewCount: 410,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['#FFFFFF', '#D9AFD9', '#FFE6E6'],
    colorNames: ['Pure White', 'Lavender Dream', 'Baby Pink'],
    badge: 'Popular',
    description: 'Authentic handcrafted Lucknowi chikankari with delicate shadow-work and bakhiya stitching on premium georgette fabric.',
    features: ['100% Hand-embroidered in Lucknow', 'Side Slits with Tassels', 'Soft on Skin', 'Complimentary matching inner slip included'],
    inStock: true,
    stockCount: 42
  },
  {
    id: 'w-6',
    name: 'Designer Velvet Bridal Lehenga Choli Ensemble',
    category: 'women',
    subcategory: 'Bridal & Festive',
    price: 8999,
    originalPrice: 16999,
    discount: 47,
    rating: 5.0,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1583391733975-00c73204918e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Semi-Stitched (Fits up to Bust 44, Waist 42)'],
    colors: ['#800020', '#004225'],
    colorNames: ['Royal Crimson', 'Forest Jade'],
    badge: 'Luxury',
    description: 'Heavy micro-velvet lehenga embellished with antique dori, sequin, and zari work. Features double dupattas for a majestic bridal statement.',
    features: ['Heavy 12-Kali Flair with Can-Can', 'Double Zari Dupattas Included', 'Custom Tailoring Assistance Provided'],
    inStock: true,
    stockCount: 8
  },

  // --- MEN'S WEAR ---
  {
    id: 'm-1',
    name: 'Handloom Raw Silk Festive Kurta with Churidar',
    category: 'men',
    subcategory: 'Ethnic Wear',
    price: 1899,
    originalPrice: 3599,
    discount: 47,
    rating: 4.8,
    reviewCount: 220,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    colors: ['#C5842C', '#1E3A8A', '#78350F'],
    colorNames: ['Mustard Gold', 'Navy Blue', 'Maroon Brown'],
    badge: 'Festive Pick',
    description: 'A quintessential traditional ensemble crafted in lustrous raw silk with a structured mandarin collar, delicate thread piping, and paired with a crisp off-white churidar.',
    features: ['Rich Raw Silk Texture', 'Comfort Fit with Side Pockets', 'Complimentary Elasticated Churidar', 'Dry Clean Recommended'],
    inStock: true,
    stockCount: 32
  },
  {
    id: 'm-2',
    name: 'Woven Jacquard Nehru Bandhgala Jacket',
    category: 'men',
    subcategory: 'Ethnic Wear',
    price: 1699,
    originalPrice: 3299,
    discount: 48,
    rating: 4.9,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['38', '40', '42', '44'],
    colors: ['#1C1917', '#991B1B'],
    colorNames: ['Jet Black with Gold', 'Ruby Crimson'],
    badge: 'Top Rated',
    description: 'Elevate any basic kurta or shirt instantly with this royal jacquard sleeveless bandhgala jacket sporting brass buttons and a welt pocket square.',
    features: ['High-density Jacquard Weave', 'Tailored Slim Cut', 'Interior Silk Lining', 'Metallic Antique Buttons'],
    inStock: true,
    stockCount: 20
  },
  {
    id: 'm-3',
    name: '100% Giza Egyptian Cotton Slim-Fit Formal Shirt',
    category: 'men',
    subcategory: 'Formal Shirts',
    price: 1399,
    originalPrice: 2499,
    discount: 44,
    rating: 4.7,
    reviewCount: 289,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['39', '40', '42', '44'],
    colors: ['#FFFFFF', '#BFDBFE', '#E2E8F0'],
    colorNames: ['Crisp White', 'Pastel Sky', 'Silver Mist'],
    badge: 'Bestseller',
    description: 'Experience silky softness with long-staple Egyptian Giza cotton. Perfect for office wear, interviews, and dinner evenings.',
    features: ['100% Long-Staple Egyptian Cotton', 'Easy Iron & Anti-Wrinkle Finish', 'German Stiff Collar & French Cuffs', 'Breathable All-Day Comfort'],
    inStock: true,
    stockCount: 50
  },
  {
    id: 'm-4',
    name: 'Premium Supima Cotton Pique Polo T-Shirt',
    category: 'men',
    subcategory: 'Casual & Polos',
    price: 899,
    originalPrice: 1799,
    discount: 50,
    rating: 4.6,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1E293B', '#14532D', '#7F1D1D'],
    colorNames: ['Midnight Navy', 'Olive Green', 'Burgundy'],
    badge: 'Daily Essential',
    description: 'Engineered from ultra-durable Supima cotton pique knit. Retains its color and soft texture wash after wash.',
    features: ['240 GSM Heavyweight Supima Cotton', 'Anti-Curl Ribbed Collar', 'Embroidered Shivay Monogram', 'Color Fastness Guaranteed'],
    inStock: true,
    stockCount: 65
  },
  {
    id: 'm-5',
    name: 'Stretch Comfort Chino Trousers',
    category: 'men',
    subcategory: 'Bottomwear',
    price: 1299,
    originalPrice: 2399,
    discount: 45,
    rating: 4.7,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['#D4B996', '#334155'],
    colorNames: ['Khaki Tan', 'Slate Charcoal'],
    badge: 'Must Have',
    description: 'Modern tapered chinos with 4-way stretch flex for uncompromised mobility from desk to weekend getaways.',
    features: ['98% Cotton + 2% Elastane Flex', 'Reinforced Pocket Stitching', 'Fade-Resistant Garment Dye', 'YKK Metal Zipper'],
    inStock: true,
    stockCount: 28
  },

  // --- KIDS & TEENS (ALL AGES) ---
  {
    id: 'k-1',
    name: 'Boys Traditional Kurta Pajama with Brocade Jacket Set',
    category: 'kids',
    subcategory: 'Boys Ethnic',
    price: 1199,
    originalPrice: 2299,
    discount: 48,
    rating: 4.9,
    reviewCount: 178,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-12 Yrs'],
    colors: ['#D97706', '#0284C7'],
    colorNames: ['Haldi Yellow', 'Royal Blue'],
    badge: 'Festive Hit',
    description: 'Adorably royal 3-piece traditional attire for little princes. Soft cotton silk that keeps children comfortable during family pujas and weddings.',
    features: ['Skin-Friendly Soft Inner Lining', 'Elastic Drawstring Pajama', 'Brocade Floral Modi Jacket', 'Easy Hand Wash'],
    inStock: true,
    stockCount: 35
  },
  {
    id: 'k-2',
    name: 'Girls Sequin Flared Princess Ball Gown',
    category: 'kids',
    subcategory: 'Girls Party Wear',
    price: 1499,
    originalPrice: 2799,
    discount: 46,
    rating: 4.8,
    reviewCount: 145,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-10 Yrs'],
    colors: ['#F472B6', '#C084FC'],
    colorNames: ['Fairy Pink', 'Lavender Magic'],
    badge: 'Best for Birthdays',
    description: 'Magical flared tulle net dress adorned with delicate sequin bodice and satin bow belt. Creates enchanting twirls for birthday celebrations.',
    features: ['Multi-layered Soft Tulle', '100% Breathable Cotton Inner Lining (No Itchiness)', 'Concealed Back Zipper', 'Matching Hairband Included'],
    inStock: true,
    stockCount: 22
  },
  {
    id: 'k-3',
    name: 'Organic Cotton Infant Baby Rompers (Pack of 3)',
    category: 'kids',
    subcategory: 'Baby & Toddlers',
    price: 799,
    originalPrice: 1499,
    discount: 47,
    rating: 4.9,
    reviewCount: 290,
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['0-3 Months', '3-6 Months', '6-12 Months'],
    colors: ['#FEF3C7'],
    colorNames: ['Multi Pastel (Dino, Cloud, Bear)'],
    badge: 'Ultra Soft',
    description: 'GOTS-certified 100% organic combed cotton onesies with nickel-free snaps for quick, hassle-free diaper changes.',
    features: ['100% GOTS Certified Organic Cotton', 'Hypoallergenic & Non-toxic Dyes', 'Stretchable Envelope Neckline', 'Safe on Newborn Sensitive Skin'],
    inStock: true,
    stockCount: 40
  },
  {
    id: 'k-4',
    name: 'Teens Urban Graphic Hoodie & Jogger Tracksuit',
    category: 'kids',
    subcategory: 'Teens Casual',
    price: 1399,
    originalPrice: 2499,
    discount: 44,
    rating: 4.7,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['11-12 Yrs', '13-14 Yrs', '15-16 Yrs'],
    colors: ['#18181B', '#475569'],
    colorNames: ['Onyx Black', 'Cool Heather Grey'],
    badge: 'Trending Youth',
    description: 'Streetwear-inspired cozy fleece hoodie set for boys and girls. Perfect for winter mornings, sports, and casual outings.',
    features: ['Brushed Warm Fleece Fabric', 'Kangaroo Pocket & Ribbed Cuffs', 'Drawcord Elastic Waist Jogger', 'Unisex Fit'],
    inStock: true,
    stockCount: 24
  },

  // --- COSMETICS & BEAUTY ---
  {
    id: 'c-1',
    name: '24K Pure Gold Glow & Collagen Facial Serum (30ml)',
    category: 'cosmetics',
    subcategory: 'Skincare',
    price: 899,
    originalPrice: 1799,
    discount: 50,
    rating: 4.9,
    reviewCount: 520,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-548483b4b533?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['30ml Glass Dropper'],
    colors: ['#F59E0B'],
    colorNames: ['24K Liquid Gold'],
    badge: 'Bestseller',
    description: 'Infused with real 24k gold flakes, Hyaluronic Acid, and Niacinamide to boost radiance, blur fine lines, and give you an ethereal luminous glow.',
    features: ['Genuine 24K Gold Micro-Flakes', 'Deep Cellular Hydration with Hyaluronic Acid', 'Dermatologically Tested & Cruelty-Free', 'Non-greasy, Fast Absorption'],
    inStock: true,
    stockCount: 60
  },
  {
    id: 'c-2',
    name: 'Velvet Matte Weightless Lipstick Duo (Shivay Red & Nude Muse)',
    category: 'cosmetics',
    subcategory: 'Makeup & Lips',
    price: 699,
    originalPrice: 1299,
    discount: 46,
    rating: 4.8,
    reviewCount: 388,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Combo Pack (2 x 4.2g)'],
    colors: ['#991B1B', '#B45309'],
    colorNames: ['Iconic Crimson Red + Warm Nude Brown'],
    badge: 'Combo Deal',
    description: '16-hour long-lasting transfer-proof velvet matte lipstick infused with Vitamin E, Shea Butter, and Argan Oil so your lips stay soft and pigmented.',
    features: ['16H Smudge & Transfer Resistant', 'Enriched with Vitamin E & Shea Butter', 'Paraben-Free & 100% Vegan', 'High One-Stroke Color Payoff'],
    inStock: true,
    stockCount: 45
  },
  {
    id: 'c-3',
    name: 'Kannauj Steam-Distilled Pure Rose Water Face Mist (200ml)',
    category: 'cosmetics',
    subcategory: 'Skincare Toner',
    price: 449,
    originalPrice: 799,
    discount: 43,
    rating: 4.9,
    reviewCount: 610,
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['200ml Spray Bottle'],
    colors: ['#FDA4AF'],
    colorNames: ['Pure Noor Rose'],
    badge: '100% Ayurvedic',
    description: 'Sourced from the historic rose gardens of Kannauj, Uttar Pradesh. Steam distilled in copper degs to preserve pure floral goodness without synthetic fragrances.',
    features: ['100% Pure Hydro-Distilled Rose Water', 'Pores Tightening & pH Balancer', 'Zero Alcohol, Zero Artificial Perfume', 'Suitable for all skin types, including sensitive'],
    inStock: true,
    stockCount: 80
  },
  {
    id: 'c-4',
    name: 'Royal French Oud & Amber Luxury Unisex Eau De Parfum (50ml)',
    category: 'cosmetics',
    subcategory: 'Fragrances',
    price: 1599,
    originalPrice: 2999,
    discount: 47,
    rating: 4.9,
    reviewCount: 204,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['50ml Luxury Crystal Flacon'],
    colors: ['#78350F'],
    colorNames: ['Amber Gold Oud'],
    badge: 'Luxury Scent',
    description: 'A hypnotic oriental fragrance with top notes of saffron and bergamot, transitioning to Cambodian agarwood (oud) and lingering warm amber and Madagascar vanilla.',
    features: ['25% High Concentration Eau De Parfum', 'Lasts up to 24+ Hours on Fabric', 'Unisex Artisanal Blend', 'Handcrafted in Small Batches'],
    inStock: true,
    stockCount: 30
  },
  {
    id: 'c-5',
    name: 'Intense Black Ayurvedic Herbal Kajal & Liquid Liner Duo',
    category: 'cosmetics',
    subcategory: 'Eye Makeup',
    price: 499,
    originalPrice: 899,
    discount: 44,
    rating: 4.8,
    reviewCount: 340,
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['Kajal Stick (3g) + Liner (5ml)'],
    colors: ['#000000'],
    colorNames: ['Deepest Carbon Black'],
    badge: 'Essential',
    description: 'Formulated with organic Almond Oil, Castor Oil, and Triphala to soothe and brighten tired eyes while providing intense 24-hour waterproof black drama.',
    features: ['Ophthalmologically Safe & Contact Lens Friendly', 'Waterproof & Sweat-Resistant', 'Herbal Cooling Effect', 'Ultra-Fine 0.2mm Precision Felt Tip'],
    inStock: true,
    stockCount: 55
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Pooja Verma',
    city: 'New Delhi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'I ordered the Banarasi silk saree for my sister’s wedding and the quality blew me away! The zari work is pristine and delivery to Delhi took just 2 days. Shivay Collections is now my go-to store.'
  },
  {
    id: 2,
    name: 'Rajesh Sharma',
    city: 'Jaipur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Got the raw silk kurta and the boys ethnic wear for my son. Both were perfectly stitched, skin-friendly, and looked very regal during Diwali celebrations. Highly recommended!'
  },
  {
    id: 3,
    name: 'Ananya Deshmukh',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'The 24K Gold Radiance serum and the Oud perfume are exceptional. You get international designer quality at genuine honest Indian pricing. Packaging was also super premium.'
  }
];

export const COUPONS = [
  { code: 'SHIVAY10', discountType: 'percentage', value: 10, minOrder: 999, description: '10% OFF on orders above ₹999' },
  { code: 'FESTIVE500', discountType: 'flat', value: 500, minOrder: 2999, description: 'Flat ₹500 OFF on orders above ₹2,999' },
  { code: 'WELCOME200', discountType: 'flat', value: 200, minOrder: 1499, description: 'Flat ₹200 OFF on your first order above ₹1,499' }
];
