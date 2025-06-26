<template>
  <div class="basket-container">
    <div class="basket-icon" @click="toggleBasket">
      <img src="@/assets/icons/cart.svg" alt="Shopping Cart">
      <span v-if="getTotalItemCount() > 0" class="basket-badge">{{ getTotalItemCount() }}</span>
    </div>
    
    <div v-if="showBasket" class="basket-popup">
      <div class="basket-header">
        <h3>{{ $t('cart.title') }}</h3>
        <button class="close-btn" @click="toggleBasket">&times;</button>
      </div>
      
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>{{ $t('cart.empty') }}</p>
      </div>
      
      <div v-else class="basket-items">
        <div v-for="(item, index) in cartItems" :key="index" class="basket-item">
          <div class="item-details">
            <h4>{{ getTitle(item) }}</h4>
            <p class="item-price">{{ PersianNumbers(item.price.toString()) }} {{ $t('tooman') }}</p>
          </div>
          <div class="item-actions">
            <div class="quantity-controls">
              <button class="quantity-btn" @click="decreaseQuantity(index)">-</button>
              <span class="quantity">{{ item.quantity || 1 }}</span>
              <button class="quantity-btn" @click="increaseQuantity(index)">+</button>
            </div>
            <button class="delete-btn" @click="removeFromCart(index)">{{ $t('cart.remove') }}</button>
          </div>
        </div>
        
        <div class="basket-total">
          <p>{{ $t('cart.total') }}: {{ PersianNumbers(calculateTotal().toString()) }} {{ $t('tooman') }}</p>
        </div>
        
        <div class="basket-actions">
          <button class="checkout-btn" @click="goToCheckout">{{ $t('cart.checkout') }}</button>
          <button class="clear-btn" @click="clearCart">{{ $t('cart.clear') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartService from '@/services/CartService';

export default {
  name: 'Basket',
  props: ['lang'],
  data() {
    return {
      showBasket: false,
      cartItems: []
    }
  },
  methods: {
    toggleBasket() {
      this.showBasket = !this.showBasket;
    },
    
    PersianNumbers(value) {
      if (!value) return null;
      var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return value.replace(/[0-9]/g, function(w) {
        return id[+w]
      });
    },
    
    getTitle(item) {
      switch (this.lang) {
        case 'en':
          return item.title_en;
        case 'fa':
          return item.title;
        case 'ar':
          return item.title_ar;
        default:
          return item.title;
      }
    },
    
    addToCart(item) {
      cartService.addItem(item);
    },
    
    increaseQuantity(index) {
      cartService.increaseQuantity(index);
    },
    
    decreaseQuantity(index) {
      cartService.decreaseQuantity(index);
    },
    
    removeFromCart(index) {
      cartService.removeItem(index);
    },
    
    clearCart() {
      cartService.clearCart();
    },
    
    calculateTotal() {
      return cartService.calculateTotal();
    },
    
    getTotalItemCount() {
      return cartService.getItemCount();
    },
    
    goToCheckout() {
      // Navigate to checkout page
      this.$router.push({ name: 'Checkout', params: { lang: this.lang } });
    },
    
    updateCartItems() {
      this.cartItems = cartService.getItems();
    }
  },
  created() {
    this.updateCartItems();
    cartService.addChangeListener(this.updateCartItems);
  },
  beforeUnmount() {
    cartService.removeChangeListener(this.updateCartItems);
  }
}
</script>

<style scoped>
.basket-container {
  position: relative;
}

.basket-icon {
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.basket-icon img {
  width: 30px;
  height: 30px;
}

.basket-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 0 5px;
  font-size: 12px;
  min-width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
}

.basket-popup {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 15px;
  overflow-y: auto;
  direction: rtl;
}

.basket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #888;
}

.empty-cart {
  text-align: center;
  padding: 20px 0;
  color: #888;
}

.basket-items {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.basket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.item-details h4 {
  margin: 0;
  font-size: 16px;
}

.item-price {
  margin: 5px 0 0;
  color: #555;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.quantity-btn {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.quantity-btn:hover {
  background-color: #f1f1f1;
}

.quantity {
  margin: 0 8px;
  font-size: 14px;
  min-width: 20px;
  text-align: center;
}

.delete-btn {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #f1f1f1;
}

.basket-total {
  padding: 15px 0;
  font-weight: bold;
  border-top: 1px solid #eee;
  margin-top: 10px;
}

.basket-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.checkout-btn, .clear-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
}

.checkout-btn {
  background-color: #8c692c;
  color: white;
}

.clear-btn {
  background-color: #f1f1f1;
  color: #333;
}

.checkout-btn:hover {
  background-color: #714a00;
}

.clear-btn:hover {
  background-color: #e6e6e6;
}

/* For mobile screens */
@media (max-width: 768px) {
  .basket-popup {
    width: 100%;
  }
}
</style> 