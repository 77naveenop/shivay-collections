import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, COUPONS } from '../data/products';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Clear out any legacy dummy data from previous session
  useEffect(() => {
    const legacyProducts = localStorage.getItem('shivay_products');
    if (legacyProducts && (legacyProducts.includes('w-1') || legacyProducts.includes('Banarasi'))) {
      localStorage.removeItem('shivay_products');
    }
    const legacyOrders = localStorage.getItem('shivay_orders');
    if (legacyOrders && legacyOrders.includes('SHIV-78214')) {
      localStorage.removeItem('shivay_orders');
    }
  }, []);

  // Products State (initialized from LocalStorage or empty INITIAL_PRODUCTS)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shivay_products_clean');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Save products when modified in Owner Dashboard
  useEffect(() => {
    localStorage.setItem('shivay_products_clean', JSON.stringify(products));
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

  // Orders State (100% clean, zero dummy orders)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('shivay_orders_clean');
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
    localStorage.setItem('shivay_orders_clean', JSON.stringify(orders));
  }, [orders]);

  // Owner Authentication State (Security for Dashboard)
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState(() => {
    return localStorage.getItem('shivay_owner_auth') === 'true';
  });

  const [ownerPin, setOwnerPin] = useState(() => {
    return localStorage.getItem('shivay_owner_pin') || '8888';
  });

  const verifyOwnerPIN = (inputPin) => {
    if (inputPin === ownerPin) {
      setIsOwnerAuthenticated(true);
      localStorage.setItem('shivay_owner_auth', 'true');
      showToast('Welcome back, Owner of Shivay Collections!');
      return true;
    }
    showToast('Incorrect Owner PIN. Default PIN is 8888', 'error');
    return false;
  };

  const logoutOwner = () => {
    setIsOwnerAuthenticated(false);
    localStorage.removeItem('shivay_owner_auth');
    showToast('Logged out from Owner Portal', 'info');
  };

  const changeOwnerPIN = (newPin) => {
    if (newPin && newPin.length >= 4) {
      setOwnerPin(newPin);
      localStorage.setItem('shivay_owner_pin', newPin);
      showToast('Owner PIN updated successfully!');
      return true;
    }
    showToast('PIN must be at least 4 digits', 'error');
    return false;
  };

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

    showToast(`Added "${product.name.slice(0, 25)}..." to your bag!`);
  };

  // Remove from cart
  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from bag', 'info');
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
        showToast('Removed from Wishlist', 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast('Saved to your Wishlist!');
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

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const shippingFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Create new customer order
  const createOrder = (orderData) => {
    const newOrder = {
      id: `SHIV-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: Date.now(),
      status: 'Pending Verification',
      verificationStatus: {
        isOrderVerified: false,
        isAddressVerified: false,
        paymentVerification: orderData.paymentMethod.includes('COD') ? 'Pending COD Confirmation' : 'Paid Online (Pending Bank Settlement)'
      },
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

  // OWNER DASHBOARD ACTIONS:

  // Add Product
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      createdAt: Date.now(),
      inStock: true
    };
    setProducts(prev => [product, ...prev]);
    showToast(`"${product.name}" added to catalog!`);
    return product;
  };

  // Edit / Update Product
  const updateProduct = (updated) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Updated "${updated.name}" successfully!`);
  };

  // Delete Product
  const deleteProduct = (id) => {
    const item = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Deleted "${item?.name || 'product'}" from catalog`, 'info');
  };

  // Order Verification Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} status set to ${newStatus}`);
  };

  const updatePaymentVerification = (orderId, paymentStatus) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? {
              ...o,
              verificationStatus: {
                ...o.verificationStatus,
                paymentVerification: paymentStatus
              }
            }
          : o
      )
    );
    showToast(`Payment verification updated: ${paymentStatus}`);
  };

  const verifyCustomerAddress = (orderId, isVerified) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? {
              ...o,
              verificationStatus: {
                ...o.verificationStatus,
                isAddressVerified: isVerified
              }
            }
          : o
      )
    );
    showToast(isVerified ? 'Address marked as Verified' : 'Address unverified');
  };

  const markOrderFullyVerified = (orderId) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? {
              ...o,
              status: 'Order Verified & Confirmed',
              verificationStatus: {
                ...o.verificationStatus,
                isOrderVerified: true,
                isAddressVerified: true,
                paymentVerification: o.paymentMethod.includes('COD') ? 'COD Verified by Owner' : 'Online Payment Verified'
              }
            }
          : o
      )
    );
    showToast(`Order ${orderId} has been verified and confirmed for dispatch!`);
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast(`Order ${orderId} removed`, 'info');
  };

  const clearAllOrders = () => {
    setOrders([]);
    localStorage.removeItem('shivay_orders_clean');
    showToast('All order records cleared', 'info');
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
        isOwnerAuthenticated,
        verifyOwnerPIN,
        logoutOwner,
        changeOwnerPIN,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        updatePaymentVerification,
        verifyCustomerAddress,
        markOrderFullyVerified,
        deleteOrder,
        clearAllOrders
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
