<template>
  <div class="checkout-page">
    <div class="header-section">
      <h1 class="title-checkout">{{ $t('checkout.title') }}</h1>
      <div class="back-button" @click="goBack">
        <img src="@/assets/icons/back.svg" alt="Back">
        <span>{{ $t('checkout.back') }}</span>
      </div>
   
    </div>

    <div class="content">
      <div class="checkout-basket">
        <h3>{{ $t('cart.title') }}</h3>
        
        <div v-if="cartItems.length === 0" class="empty-cart">
          <p>{{ $t('cart.empty') }}</p>
        </div>
        
        <div v-else class="basket-items">
          <div v-for="(item, index) in cartItems" :key="index" class="basket-item">
            <div class="item-details">
              <h4>{{ getTitle(item) }}</h4>
              <p class="item-price">{{ PersianNumbers(item.price.toString()) }} {{ $t('tooman') }} × {{ item.quantity || 1 }}</p>
            </div>
            <div class="item-total">
              {{ PersianNumbers(((item.price) * (item.quantity || 1)).toString()) }} {{ $t('tooman') }}
            </div>
          </div>
          
          <div class="basket-total">
            <p>{{ $t('cart.total') }}: {{ PersianNumbers(calculateTotal().toString()) }} {{ $t('tooman') }}</p>
          </div>
        </div>
      </div>
      
      <div class="customer-info">
        <h3>{{ $t('checkout.customerInfo') }}</h3>
        
        <div class="delivery-options">
          <div class="option">
            <input type="radio" id="takeaway" name="delivery-option" value="takeaway" v-model="deliveryOption">
            <label for="takeaway">{{ $t('checkout.takeaway') }}</label>
          </div>
          <div class="option">
            <input type="radio" id="eatHere" name="delivery-option" value="eatHere" v-model="deliveryOption">
            <label for="eatHere">{{ $t('checkout.eatHere') }}</label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="name">{{ $t('checkout.name') }}</label>
          <input type="text" id="name" v-model="customerInfo.name" class="form-control">
        </div>
        
        <div v-if="deliveryOption === 'takeaway'">
          <div class="form-group">
            <label for="phone">{{ $t('checkout.phone') }}</label>
            <input type="tel" id="phone" v-model="customerInfo.phone" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="address">{{ $t('checkout.address') }}</label>
            <textarea id="address" v-model="customerInfo.address" class="form-control" rows="3"></textarea>
          </div>
        </div>
        
        <div v-if="deliveryOption === 'eatHere'">
          <div class="form-group">
            <label for="tableNumber">{{ $t('checkout.tableNumber') }}</label>
            <input type="text" id="tableNumber" v-model="customerInfo.tableNumber" class="form-control">
          </div>
        </div>
        
        <button class="process-payment-btn" @click="processPayment">{{ $t('checkout.processPayment') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import cartService from '@/services/CartService';
import axios from 'axios';

export default {
  name: 'Checkout',
  props: ['lang', 'branchId'],
  data() {
    return {
      cartItems: [],
      deliveryOption: 'takeaway', // Default option
      customerInfo: {
        name: '',
        phone: '',
        address: '',
        tableNumber: ''
      }
    }
  },
  methods: {
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
    
    calculateTotal() {
      return cartService.calculateTotal();
    },
    
    updateCartItems() {
      this.cartItems = cartService.getItems();
    },
    
    goBack() {
      this.$router.go(-1);
    },
    
    processPayment() {
      // Validate form fields
      if (!this.customerInfo.name) {
        alert(this.$t('checkout.nameRequired'));
        return;
      }
      
      if (this.deliveryOption === 'takeaway') {
        if (!this.customerInfo.phone) {
          alert(this.$t('checkout.phoneRequired'));
          return;
        }
        if (!this.customerInfo.address) {
          alert(this.$t('checkout.addressRequired'));
          return;
        }
      } else {
        if (!this.customerInfo.tableNumber) {
          alert(this.$t('checkout.tableNumberRequired'));
          return;
        }
      }
      
      // Prepare order data
      const orderData = {
        items: this.cartItems,
        customer: this.customerInfo,
        deliveryOption: this.deliveryOption,
        total: this.calculateTotal(),
        timestamp: new Date().toISOString()
      };
      
      // Send order data to the API
      axios.post('https://aghayekabab.com/online_menu/api/saveOrder.php', orderData)
        .then(response => {
          if (response.data.success) {
            // Show success message
            alert(this.$t('checkout.orderSuccess'));
            
            // Clear cart and redirect to home
            cartService.clearCart();
            this.$router.push({ name: 'Home', params: { branchId: this.branchId || 'lahijan', lang: this.lang } });
          } else {
            // Show error message
            alert(response.data.message || this.$t('checkout.orderError'));
          }
        })
        .catch(error => {
          console.error('Error saving order:', error);
          alert(this.$t('checkout.orderError'));
        });
    }
  },
  created() {
    this.updateCartItems();
    cartService.addChangeListener(this.updateCartItems);
    
    // If cart is empty, redirect to home
    if (cartService.getItemCount() === 0) {
      this.$router.push({ name: 'Home', params: { branchId: this.branchId || 'lahijan', lang: this.lang } });
    }
  },
  beforeUnmount() {
    cartService.removeChangeListener(this.updateCartItems);
  }
}
</script>

<style scoped>
.checkout-page {
  padding: 20px;
  background-color: #e4c68e;
  min-height: 100vh;
  direction: rtl;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.back-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
}

.back-button img {
  width: 24px;
  height: 24px;
  margin-left: 8px;
}

.back-button span {
  font-size: 16px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.checkout-basket, .customer-info {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #8c692c;
}

.empty-cart {
  text-align: center;
  padding: 20px 0;
  color: #888;
}

.basket-items {
  max-height: 400px;
  overflow-y: auto;
}

.basket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
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

.item-total {
  font-weight: bold;
}

.basket-total {
  padding: 15px 0;
  font-weight: bold;
  border-top: 1px solid #eee;
  margin-top: 10px;
  text-align: left;
}

.delivery-options {
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
}

.option {
  display: flex;
  align-items: center;
}

.option input {
  margin-left: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea.form-control {
  resize: vertical;
}

.process-payment-btn {
  width: 100%;
  padding: 15px;
  background-color: #8c692c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.process-payment-btn:hover {
  background-color: #714a00;
}

.title-checkout{
  color: #714a00;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
  
  .checkout-basket {
    margin-bottom: 20px;
  }
}
</style> 