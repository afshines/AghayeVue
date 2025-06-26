import { reactive } from 'vue';

class CartService {
  constructor() {
    this.state = reactive({
      items: [],
      listeners: []
    });
    
    // Load items from localStorage if available
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.state.items = JSON.parse(savedCart);
    }
  }
  
  getItems() {
    return this.state.items;
  }
  
  addItem(item) {
    // Check if the item already exists in the cart
    const existingItemIndex = this.state.items.findIndex(
      cartItem => cartItem.id === item.id
    );
    
    if (existingItemIndex !== -1) {
      // Item already exists, increment quantity
      if (!this.state.items[existingItemIndex].quantity) {
        // Initialize quantity if it doesn't exist
        this.state.items[existingItemIndex].quantity = 1;
      }
      this.state.items[existingItemIndex].quantity += 1;
    } else {
      // Item doesn't exist, add it with quantity 1
      item.quantity = 1;
      this.state.items.push(item);
    }
    
    this.saveToLocalStorage();
    this.notifyListeners();
  }
  
  increaseQuantity(index) {
    if (this.state.items[index]) {
      if (!this.state.items[index].quantity) {
        this.state.items[index].quantity = 1;
      }
      this.state.items[index].quantity += 1;
      this.saveToLocalStorage();
      this.notifyListeners();
    }
  }
  
  decreaseQuantity(index) {
    if (this.state.items[index] && this.state.items[index].quantity > 1) {
      this.state.items[index].quantity -= 1;
      this.saveToLocalStorage();
      this.notifyListeners();
    } else if (this.state.items[index] && this.state.items[index].quantity <= 1) {
      // If quantity is 1 or less, remove the item
      this.removeItem(index);
    }
  }
  
  removeItem(index) {
    this.state.items.splice(index, 1);
    this.saveToLocalStorage();
    this.notifyListeners();
  }
  
  clearCart() {
    this.state.items = [];
    this.saveToLocalStorage();
    this.notifyListeners();
  }
  
  calculateTotal() {
    return this.state.items.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + (parseInt(item.price) * quantity);
    }, 0);
  }
  
  getItemCount() {
    return this.state.items.reduce((count, item) => {
      return count + (item.quantity || 1);
    }, 0);
  }
  
  saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.state.items));
  }
  
  addChangeListener(callback) {
    this.state.listeners.push(callback);
  }
  
  removeChangeListener(callback) {
    const index = this.state.listeners.indexOf(callback);
    if (index !== -1) {
      this.state.listeners.splice(index, 1);
    }
  }
  
  notifyListeners() {
    this.state.listeners.forEach(callback => callback(this.state.items));
  }
}

// Create a singleton instance
const cartService = new CartService();
export default cartService; 