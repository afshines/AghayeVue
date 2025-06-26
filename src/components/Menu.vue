<template>
  <div class="cafe-menu">
    <!-- HEADER -->
    <header class="menu-header">
      <!-- Refresh icon -->
      <div class="menu-top-top">
        <div class="refresh-icon" @click="fetchAllCategories">
          <!-- Replace with your actual icon path or component -->
          <img :src="require('../assets/icons/refresh.svg')" alt="Refresh" />
        </div>

        <p class="title-cat">{{ $t(selectedCategory.id) }}</p>

        <div class="basket-container">
        <Basket :lang="currentLang" /> 
        </div>
      </div>

      <nav class="categories">
        <ul>
          <li v-for="cat in categories" :key="cat.id" :class="{ active: cat.id === selectedCategory.id }"
            @click="selectCategory({ id: cat.id, apiId: cat.apiId })">
            <!-- Optional: Load an icon based on category id -->
            <img v-show="!scrolled" :src="getCategoryIcon(cat)" :alt="$t(cat.id)" />
            <span>{{ $t(cat.id) }}</span>
          </li>
        </ul>
      </nav>

      <input type="text" id="searchInput" :placeholder="$t('search')" v-model="searchQuery" />

      <!-- Add subcategory filter here -->
      <div class="subcategory-filter">
        <div class="subcategories-scroll">
          <button 
            v-for="subcategory in subcategories" 
            :key="subcategory"
            :class="{ active: selectedSubcategory === subcategory }"
            @click="selectSubcategory(subcategory)">
            {{ subcategory === 'all' ? $t('all') : subcategory }}
          </button>
        </div>
      </div>

    </header>

    <!-- FOOD ITEMS (display filtered data based on selected category) -->
    <section v-if="filteredData.length > 0" class="food-category">
   
      <template v-for="item in filteredData" :key="item.id">
        <div class="section-title">{{ getCategoryTitle(item) }}</div>
        <div class="food-list">
          <article class="food-item" v-for="(food, i) in item.foods" :key="i">

            <div
              :style="{ backgroundImage: 'url(' + food.img + ')', backgroundSize: '300%', backgroundPosition: 'top left' }">
              <img style="width: 100%; margin: 0 auto; display: flex; margin-bottom: 20px;" :src="food.img"
                :alt="getTitle(food)" />
            </div>
            <div class="details">
              <div>
                <h3 style="color: #8c692c;">{{ getTitle(food) }}</h3>
                <span style="float: left;" class="price">{{ PersianNumbers(getBranchPrice(food)) }} <span>{{ $t('tooman') }}</span></span>
                <div style="clear: both;height: 20px;"></div>
                <p>{{ getDes(food) }}</p>
                <button class="add-to-cart-btn" @click="addToCart(food)">{{ $t('cart.add') }}</button>
              </div>
            </div>
          </article>
        </div>
      </template>
    </section>

    <!-- No results message -->
    <section v-else class="no-results">
      <p>{{ $t('noResultsFound') }}</p>
    </section>


    <button v-if="scrolled" class="back-to-top" @click="scrollToTop">
      <img :src="require('../assets/kazheno/up-arrow-svgrepo-com.svg')" alt="Back to Top" />
    </button>

    <!-- FOOTER (Shown on mobile only) -->
    <footer class="mobile-footer">
      <ul>

        <li v-on:click="toggleLanguage">
          <img :src="require('../assets/icons/language.svg')" alt="language" style="width: 30px; padding-bottom: 9px;" />
          <span>{{ currentLang == 'fa' ? 'English' : 'فارسی' }}</span>
        </li>

        <li v-on:click="this.$router.push({ name: 'Home', params: { lang: this.currentLang } })">
          <img :src="require('../assets/icons/home.svg')" alt="home" style="width: 37px;" />
          <span>{{ $t('home') }}</span>
        </li>
        <li v-on:click="this.$router.push({ name: 'ContactUs', params: { lang: this.currentLang } })">
          <img :src="require('../assets/icons/support.svg')" alt="support" style="width: 29px;" />
          <span>{{ $t('contactUs') }}</span>
        </li>
      </ul>
    </footer>
  </div>
</template>


<script>
import axios from 'axios';
 import Basket from './Basket.vue';
import cartService from '@/services/CartService';

export default {
  props: ['lang', 'id', 'branchId'],
  name: "Menu-Main",
   components: {
     Basket
   },
  data() {
    const categories = [
      { id: 'Dishes', apiId: 'Dishes' },
      { id: 'Kabab', apiId: 'Kabab' },
      { id: 'Sea', apiId: 'Sea' },
      { id: 'Side', apiId: 'Side' },
      { id: 'Drinks', apiId: 'Drinks' },
    ];

    const defaultSelectedCategory =
      categories.find(category => category.id === this.id) || categories[0];

    return {
      scrolled: false,
      currentLang: this.lang,
      categories,
      // We'll store all fetched data here
      allCategoryData: [],
      selectedCategory: defaultSelectedCategory,
      searchQuery: '',
      selectedSubcategory: 'all' // Changed from 'All' to 'all' as translation key
    }
  },

  watch: {
    lang(newLang) {
      this.currentLang = newLang || 'fa'; // Update currentLang when lang changes
      this.$i18n.locale = newLang;
    },
    searchQuery(newVal) {
      if (newVal.trim() !== '') {
        this.selectedSubcategory = 'all'; // Changed from 'All' to 'all'
      }
    }
  },
  methods: {
    // Get the branch-specific price based on branch ID
    getBranchPrice(food) {
      if (this.branchId === 'lahijan' && food.price_lahijan) {
        return food.price_lahijan.toString();
      } else if (this.branchId === 'karaj' && food.price_karaj) {
        return food.price_karaj.toString();
      } 
      // Fallback to the first available price
      return (food.price_lahijan || food.price_karaj || food.price || '0').toString();
    },
    getCategoryTitle(item) {
      switch (this.currentLang) {
        case 'en':
          return item.en_title;
        case 'fa':
          return item.fa_title;
      }
    },

    PersianNumbers(value) {
      if (!value) return null;
      var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return value.replace(/[0-9]/g, function (w) {
        return id[+w]
      });
    },

    // Convert Persian numbers to English numbers
    convertToEnglishNumbers(value) {
      if (!value) return "";
      // First, handle the case where there's a slash and we need to extract just the first part
      if (value.includes('/')) {
        value = value.split('/')[0];
      }
      // Convert Persian numerals to English
      const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return value.toString().replace(/[۰-۹]/g, function(match) {
        return persianDigits.indexOf(match).toString();
      });
    },

    getTitle(food) {
      switch (this.lang) {
        case 'en':
          return food.title_en;
        case 'fa':
          return food.title;
        case 'ar':
          return food.title_ar;
      }
    },
    getDes(food) {
      switch (this.lang) {
        case 'en':
          return food.description_en;
        case 'fa':
          return food.description;
        case 'ar':
          return food.description_ar;
      }
    },

    // Attempts to load an icon for the category based on its id.
    getCategoryIcon(category) {
      try {
        return require(`../assets/icons/${category.id}.png`);
      } catch (e) {
        return null; // fallback icon if not found
      }
    },

    /**
      * Fetches ALL categories one by one and merges them into allCategoryData.
      */
    fetchAllCategories() {
      this.searchQuery = '';
      this.allCategoryData = [];
      const requests = this.categories.map(cat => {
        // The URL still uses cat.id, but you can change this if needed.
        const url = `https://aghayekabab.com/online_menu/api/json.php?menu_name=${cat.id}`;
        return axios.get(url)
          .then(response => {
            if (response.data && Array.isArray(response.data)) {
              // Filter foods based on branch visibility before returning data
              const filteredData = response.data.map(category => {
                if (category.foods && Array.isArray(category.foods)) {
                  // Filter foods based on branch visibility
                  const filteredFoods = category.foods.filter(food => {
                    // Check if the food should be visible for the current branch
                    if (this.branchId === 'lahijan') {
                      return food.show_lahijan === '1';
                    } else if (this.branchId === 'karaj') {
                      return food.show_karaj === '1';
                    }
                    // Default to showing all foods if branchId is not specified
                    return true;
                  });
                  
                  // Return category with filtered foods
                  return {
                    ...category,
                    foods: filteredFoods
                  };
                }
                return category;
              });
              
              // Return the fetched and filtered data along with the main_id
              return { main_id: cat.apiId, data: filteredData };
            } else {
              console.error('Invalid data format for', cat.id, response.data);
              return { main_id: cat.apiId, data: [] };
            }
          })
          .catch(error => {
            console.error('Error fetching category:', cat.id, error);
            return { main_id: cat.apiId, data: [] };
          });
      });

      Promise.all(requests).then(results => {
        // Flatten all returned data arrays and attach main_id to each object.
        this.allCategoryData = results.flatMap(item =>
          item.data.map(obj => ({
            ...obj,
            main_id: item.main_id
          }))
        );
        console.log("All Category Data:", this.allCategoryData);
      });
    },
    // Set the selected category by its id.
    // Switch selected category WITHOUT extra fetch
    selectCategory(cat) {
      this.searchQuery = '';
      this.selectedCategory = cat;
      this.selectedSubcategory = 'all'; // Changed from 'All' to 'all'
      // We do NOT call fetch here anymore because we already have all the data.
      // The computed property `filteredData` automatically updates.
    },

    // Toggle the language (example toggling between 'fa' and 'en')
    toggleLanguage() {
      const newLang = this.currentLang === 'fa' ? 'en' : 'fa';
      const route = this.$router.resolve({
        name: this.$route.name,
        params: { 
          branchId: this.branchId || 'lahijan',
          lang: newLang,
          id: this.id
        }
      }).href;
      window.location.href = route;
    },
    handleScroll() {
      this.scrolled = window.pageYOffset > 100;
    },

    // Smoothly scroll back to the top
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    selectSubcategory(subcategory) {
      this.selectedSubcategory = subcategory;
      
      // Scroll back to top of the food list after filtering
      this.$nextTick(() => {
        // Wait for DOM to update with filtered results before scrolling
        const foodSection = document.querySelector('.food-category');
        if (foodSection) {
          foodSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Fallback to scrolling to top if section not found
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    },
    
    addToCart(food) {
      const id = food.id ? food.id : parseInt(Math.random()* 100000);
      const title = this.getTitle(food);
      const price = this.getBranchPrice(food);
      const description = this.getDes(food);
      const img = food.img;
      const f = {
        id, title, price, description, img
      };
      // Add the item to the cart service
      cartService.addItem(f);
      // Show a confirmation message
      //alert(this.$t('cart.add') + ': ' + this.getTitle(food));
    }
  },
  computed: {
    // Get unique subcategories
    subcategories() {
      // First filter by main category
      const categoryData = this.allCategoryData.filter(
        item => item.main_id === this.selectedCategory.apiId
      );
      
      // Extract unique subcategory titles
      const uniqueSubcats = new Set(['all']); // Changed from 'All' to 'all'
      categoryData.forEach(item => {
        uniqueSubcats.add(this.getCategoryTitle(item));
      });
      
      return Array.from(uniqueSubcats);
    },
    
    // Update filtered data to include subcategory filtering
    filteredData() {
      let data = this.allCategoryData.filter(
        categoryItem => categoryItem.main_id === this.selectedCategory.apiId
      );

      // Apply subcategory filter if not "all"
      if (this.selectedSubcategory !== 'all') { // Changed from 'All' to 'all'
        data = data.filter(item => this.getCategoryTitle(item) === this.selectedSubcategory);
      }

      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.trim().toLowerCase();
        
        data = data.map(item => {
          const filteredFoods = item.foods.filter(food => {
            const title = this.getTitle(food).toLowerCase();
            const description = this.getDes(food).toLowerCase();
            return title.includes(query) || description.includes(query);
          });

          return { ...item, foods: filteredFoods };
        }).filter(item => item.foods.length > 0);
      }

      return data;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetchAllCategories();
    console.log('Branch ID:', this.branchId);
    console.log('Menu ID:', this.id);
    
    // If no id is provided, use the first category
    if (!this.id && this.categories.length > 0) {
      this.selectCategory(this.categories[0]);
    }
  },

  beforeUnmount() {
    // Remove scroll event listener when component is destroyed
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
button.back-to-top {
  position: fixed;
    bottom: 84px;
    right: 10px;
    background-color: #e5c68f;
    padding: 3px;
    margin: 0;
    border: none;
    border-radius: 100%;
    width: 50px;
    height: 50px;
}
button.back-to-top img{
  width: 25px;
}
#searchInput {
  padding: 5px;
  margin: 13px;
  border-radius: 18px;
  padding-right: 20px;
  background-color: #dfb874;
  border: 2px solid #00000066;
  color: #222121;
}

.mobile-footer {
  position: fixed;
  bottom: 0;
}

/* ======== Global Container ======== */
.cafe-menu {
  font-family: sans-serif;
  direction: rtl;
  /* If you want full RTL layout */
  color: #333;
  padding: 0;
  margin: 0;
}

/* ======== HEADER ======== */
.menu-header {
  display: flex;
  padding-bottom: 0 !important;
  justify-content: flex-start;
  /* desktop: refresh icon on left */
  padding: 1rem;
  background-color: #e5c68f;
  position: relative;
}

.section-title {
  font-size: 1.6rem;
  font-weight: bold;
  margin-top: 57px;
  margin-bottom: 10px;
}

.details h3 {
  font-size: 1.2rem;
}

.menu-header .refresh-icon img {
  width: 24px;
  height: 24px;
}

/* Category icons (desktop: no scroll, mobile: horizontal scroll) */
.categories {
  flex: 1;
  /* push the refresh icon to the left in desktop */
  margin-right: 4rem;
}

.categories ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  gap: 4rem;
}

.categories li {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.categories li img {
  width: 43px;
  height: 43px;
}

.categories li span {
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
}

/* ======== SPECIAL OFFER SECTION ======== */
.special-offer {
  padding: 1rem;
  background-color: #fff7e6;
}

.special-offer h2 {
  margin: 0 0 1rem;
}

.offer-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.offer-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.offer-card .info {
  flex: 1;
}

.offer-card .price {
  font-weight: bold;
  color: #444;
}

/* ======== HOT DRINKS SECTION ======== */
.food-category {
  padding: 1rem;
  background-color: #fff;
  padding-top: 210px; /* Increase this value to account for the header + subcategories */
}

.food-category h2 {
  margin-bottom: 1rem;
}

.food-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 51px;
}

.food-item {
  display: block;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  justify-content: space-between;
  padding: 17px;
  border-bottom: 1px solid #cacaca;
  align-items: center;
}

.food-item img {
  width: 117px;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;
}

.details .price {
  font-weight: bold;
}

/* Add to Cart Button */
.add-to-cart-btn {
  background-color: #8c692c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #714a00;
}

/* ======== FOOTER (MOBILE ONLY) ======== */
.mobile-footer {
  /* hidden on desktop by default */
  background-color: #e5c68f;
  padding: 0.5rem;
  border-top: 1px solid #ddd;
}

.categories li {
  width: 110px;
}

.categories li.active {
  border-bottom: 4px solid #603d1d;
}

.mobile-footer ul {
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  list-style: none;
}

.mobile-footer li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Move refresh icon to the right in mobile */
.menu-header {
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  position: fixed;
}


.refresh-icon {
  order: 3;
}

.categories {
  margin-right: 0;
}

.title-cat {
  order: 2;
  text-align: center;
  font-size: 19px;
  font-weight: bold;
  padding-bottom: 10px;
}

/* Basket container styles */
.basket-container {
  order: 1;
}

/* ======== RESPONSIVE RULES ======== */
@media (max-width: 768px) {
  .categories li {
    min-width: 60px;
  }

  .categories ul {
    display: flex;
    flex-wrap: nowrap;
    /* Stop wrapping items */
    gap: .5rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .categories li {
    flex: 0 0 auto;
    /* Force each <li> to retain its width */
  }

  /* Use single-column grid for drinks in mobile */
  .food-list {
    grid-template-columns: 1fr;
  }

  /* Show bottom nav in mobile */
  .mobile-footer {
    display: block;
  }
}

.menu-top-top {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  height: 37px;
}

.subcategory-filter {
  overflow: hidden;
  padding: 5px 10px;
  background-color: #e5c68f;
}

.subcategories-scroll {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 5px;
  scrollbar-width: thin;
}

.subcategories-scroll::-webkit-scrollbar {
  height: 4px;
}

.subcategories-scroll::-webkit-scrollbar-thumb {
  background-color: #8c692c;
  border-radius: 4px;
}

.subcategory-filter button {
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 3px 14px;
  border-radius: 20px;
  border: 1px solid #8c692c;
  background-color: #fff;
  color: #8c692c;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.subcategory-filter button.active {
  background-color: #8c692c;
  color: #fff;
}
</style>
