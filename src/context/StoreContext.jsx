import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, COUPONS } from '../data/products';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Products State (initialized from LocalStorage or INITIAL_PRODUCTS)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shivay_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Save products when modified in Admin
  useEffect(() => {
    localStorage.setItem('shivay_products', JSON.stringify(products));
  }, [products]);

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shivay_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('shivay_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('shivay_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('shivay_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('shivay_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'SHIV-78214',
        date: '16 Oct 2026',
        status: 'Delivered',
        customer: {
          name: 'Vikram Rajput',
          phone: '+91 98765 43210',
          email: 'vikram.rajput@gmail.com',
          address: 'Flat 402, Lotus Towers, Andheri West, Mumbai, MH - 400053'
        },
        items: [
          {
            id: 'm-1',
            name: 'Handloom Raw Silk Festive Kurta with Churidar',
            price: 1899,
            quantity: 1,
            selectedSize: '40 (M)',
            selectedColor: 'Mustard Gold',
            image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=400&q=80'
          }
        ],
        subtotal: 1899,
        discount: 189,
        shipping: 0,
        total: 1710,
        paymentMethod: 'Razorpay UPI (Google Pay)'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('shivay_orders', JSON.stringify(orders));
  }, [orders]);

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('store'); // 'store', 'admin', 'domain-guide', 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Helper toast notification
  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add to cart
  const addToCart = (product, size = null, color = null, quantity = 1) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const chosenColor = color || (product.colorNames && product.colorNames[0]) || 'Default';
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            cartItemId,
            selectedSize: chosenSize,
            selectedColor: chosenColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name.slice(0, 30)}..." to your bag!`);
  };

  // Remove from cart
  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  // Update item quantity
  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved to your Wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Coupon handling
  const applyCouponCode = (code) => {
    const found = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast('Invalid coupon code. Try SHIVAY10 or FESTIVE500', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Minimum order of ₹${found.minOrder.toLocaleString('en-IN')} required for ${found.code}`, 'error');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Calculate cart metrics
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  // Free shipping on orders above ₹999
  const shippingFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Create new order
  const createOrder = (orderData) => {
    const newOrder = {
      id: `SHIV-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Confirmed',
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: grandTotal,
      coupon: appliedCoupon ? appliedCoupon.code : null,
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Admin Actions
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: `cust-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      inStock: true
    };
    setProducts(prev => [product, ...prev]);
    showToast('New product added to Shivay Collections store!');
  };

  const updateProduct = (updated) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} status set to ${newStatus}`);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingFee,
        grandTotal,
        appliedCoupon,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        toastMessage,
        showToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCouponCode,
        removeCoupon,
        createOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
