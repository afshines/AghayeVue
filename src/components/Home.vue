<template>
  <section class="main_body">
    <div id="avliSlider" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
        </div>

      </div>
    </div>
    <div class="content">


      <div class="container">

        <div style="height: 20px;">

        </div>


        <div class="header-menu">
          <div class="language-selector" @click="toggleLanguageDropdown" ref="languageSelector">
            <!-- Current Language Flag -->
            <img :src="currentFlag" alt="Current Language" class="current-flag">

            <!-- Language Dropdown -->
            <div v-if="showLanguages" class="language-dropdown">
              <img v-for="[code, language] in filteredLanguages" :key="code" :src="language.flag" :alt="language.name"
                @click="changeLanguage(code)">
            </div>
          </div>

          <!-- Menu Toggle -->
          <div class="menu-toggle">
            <img :src="require('../assets/kazheno/menu.png')" alt="" width="40" @click="toggleMenu" />
          </div>
        </div>



        <!-- Menu Drawer -->
        <div v-if="menuOpen" class="drawer-menu">
          <div class="close-menu-zone" @click="toggleMenu">

          </div>

          <div class="drawer-content">
            <ul>
              <li><a href="#" v-on:click="this.$router.push({ name: 'AboutUs', params: { branchId: this.branchId || 'lahijan', lang: this.currentLang } })">{{ $t('aboutus') }}</a></li>
              <li><a href="#" v-on:click="this.$router.push({ name: 'ContactUs', params: { branchId: this.branchId || 'lahijan', lang: this.currentLang } })">{{ $t('contactus') }}</a></li>
              <li><a href="#" v-on:click="this.$router.push({ name: 'WorkingHours', params: { branchId: this.branchId || 'lahijan', lang: this.currentLang } })">{{ $t('working hours') }}</a></li>
            </ul>
          </div>

        </div>


        <div style="height: 5px; clear: both;;">

        </div>

        <div class="row logoImg" style="">
          <div class="col-1g-12" style="    text-align: center;   ">
            <div class="Topspace">

            </div>
            <img style="    margin-top: -8px;" :src="require('../assets/kazheno/logo.png')" alt="" width="100">

          </div>
        </div>



        <div class="row">
          <div style="height: 25px;">

          </div>


          <img style="         width: 194px;
    margin: -11px auto;" :src="require('../assets/kazheno/text.png')" alt="" width="300">

          <div style="height: 25px;">

          </div>

        </div>


        <div class="row">





          <a class=" link_menu " href="#"
            :class="{ 'en': this.currentLang == 'en', 'fa': this.currentLang == 'fa', 'ar': this.currentLang == 'ar' }"
            v-on:click="this.$router.push({ name: 'Menu', params: { branchId: this.branchId || 'lahijan', lang: this.currentLang, id: 'Dishes' } })"><img
              :src="require('../assets/kazheno/newBtns/cafe.png')" alt="" width="260">
          </a>


          <a  class=" link_menu " href="#"
            :class="{ 'en': this.currentLang == 'en', 'fa': this.currentLang == 'fa', 'ar': this.currentLang == 'ar' }"
            v-on:click="this.$router.push({ name: 'Menu', params: { branchId: this.branchId || 'lahijan', lang: this.currentLang, id: 'Kabab' } })"><img style="height: 34px;"
              :src="require('../assets/kazheno/lunch.png')" alt="" width="260">
          </a>


          <a class=" link_menu " href="#"
            :class="{ 'en': this.currentLang == 'en', 'fa': this.currentLang == 'fa', 'ar': this.currentLang == 'ar' }"
            v-on:click="this.$router.push({ name: 'Menu', params: { branchId: this.branchId || 'lahijan', lang: this.currentLang, id: 'Drinks' } })"><img
              :src="require('../assets/kazheno/newBtns/drink.png')" alt="" width="260">
          </a>

<!--v-on:click="this.$router.push({ name: 'Menu', params: { lang: this.currentLang, id: 'Breakfast' } })"-->


 <a class=" link_menu " href="#"
            :class="{ 'en': this.currentLang == 'en', 'fa': this.currentLang == 'fa', 'ar': this.currentLang == 'ar' }"
            v-on:click="this.$router.push({ name: 'Menu', params: { branchId: this.branchId || 'lahijan', lang: this.currentLang, id: 'Side' } })"><img
              :src="require('../assets/kazheno/newBtns/hooka.png')" alt="" width="260">
          </a>

          
          <a class=" link_menu " href="#"
            :class="{ 'en': this.currentLang == 'en', 'fa': this.currentLang == 'fa', 'ar': this.currentLang == 'ar' }"
            v-on:click="this.$router.push({ name: 'Menu', params: { branchId: this.branchId || 'lahijan', lang: this.currentLang, id: 'Sea' } })"><img
              :src="require('../assets/kazheno/newBtns/breakfast.png')" alt="" width="260">
          </a>




         
        </div>

        <div class="row">


          <div style="height: 50px;">

          </div>

        </div>

      </div>

      <footer>

        <div class="social-icons">

          <a href="https://wa.me/+989127668969" rel="noopener noreferrer" class="socialBtn whatsapp">

          </a>

          <a href="https://www.instagram.com/kazheno_restaurant" rel="noopener noreferrer" class="socialBtn instagram">

          </a>

          <a href="https://t.me/+989127668969" rel="noopener noreferrer" class="socialBtn facebook">

          </a>

          <a href="tel:+989127668969" rel="noopener noreferrer" class="socialBtn telephone">

          </a>

        </div>

        <div class="copyright">
          <a href="https://hascoweb.com" rel="noopener noreferrer nofollow" target="_blank"><img :src="require('../assets/kazheno/hascoweb.png')"
              alt="" width="170"></a>

        </div>


      </footer>


    </div>
  </section>





  <!-- <div class="black">

    <header>

      <center>
        <img style="width:180px" :src="require('../assets/logo.png')" />
      </center>


    </header>
    <div class="container">

      <h5 style="color: black;">لطفا یک زبان را انتخاب کنید</h5>
      <h6 style="color: black;">Please select a language</h6>

      <div v-on:click="this.$router.push({ name: 'Selection', params: { lang: 'fa' } })" class="btn">
        <img width="64" :src="require('../assets/flags/iran.png')" />
        <span>فارسی</span>
      </div>

      <div v-on:click="this.$router.push({ name: 'Selection', params: { lang: 'en' } })" class="btn ">
        <img width="64" :src="require('../assets/flags/eng.png')" />
        <span>English</span>
      </div>



    </div>
</div> -->
</template>

<script>
import axios from 'axios';

export default {
  props: ['lang', 'branchId'],
  name: "Home-Main",
  data() {
    return {
      currentLang: this.lang || 'fa',

      showLanguages: false,
      languages: {
        fa: { name: 'Persian', flag: require('@/assets/images/ir.png') },
        en: { name: 'English', flag: require('@/assets/images/en.png') },
        // ar: { name: 'Arabic', flag: require('@/assets/images/ar.png') },
      },
      menuOpen: false,
      mobile: '',
      message: '',
      showModal: false,
    };
  },
  computed: {
    currentFlag() {
      return this.languages[this.currentLang]?.flag || require('@/assets/images/ir.png');
    },
    filteredLanguages() {
      // Return all languages except the current one
      return Object.entries(this.languages).filter(([code]) => code !== this.currentLang);
    },
  },
  watch: {
    lang(newLang) {
      this.currentLang = newLang || 'fa'; // Update currentLang when lang changes
      this.$i18n.locale = newLang;
    }
  },
  mounted() {
    this.$i18n.locale = this.lang;
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeLanguageDropdown);
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },

    closeLanguageDropdown(event) {
      if (this.$refs.languageSelector && !this.$refs.languageSelector.contains(event.target)) {
        this.showLanguages = false;
        document.removeEventListener('click', this.closeLanguageDropdown);
      }
    },

    toggleLanguageDropdown() {
      this.showLanguages = !this.showLanguages;


      if (this.showLanguages) {
        document.addEventListener('click', this.closeLanguageDropdown);
      } else {
        document.removeEventListener('click', this.closeLanguageDropdown);
      }
    },
    changeLanguage(lang) {
      this.currentLang = lang; // Update the language
      this.showLanguages = false; // Close the dropdown
      // Emit an event
      this.$emit('language-changed', lang); 
      // Update route with new lang and include branchId
      this.$router.push({ name: 'Home', params: { branchId: this.branchId || 'lahijan', lang } }); 
      this.$forceUpdate();
    },



    submitForm() {
      // Get form data
      const formData = new FormData();
      formData.append('mobile', this.mobile);
      formData.append('message', this.message);
      // Add more form fields as needed
      this.showModal = !this.showModal;
      // Make the POST request
      axios.post('https://aghayekabab.com/online_menu/api/commentForm.php', formData)
        .then(response => {
          // Handle the response
          console.log(response.data);

          this.mobile = '';
          this.message = '';

        })
        .catch(error => {
          // Handle errors
          console.error(error);
        });
    }
  }
}
</script>

<style>
.headerBtns span {
  display: block;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  margin-right: 4px;
}

.languages img {
  width: 50px;
  cursor: pointer;
  margin: 5px;
}

.menu-toggle {
  position: relative;
  z-index: 999;
}

.menu-toggle img {
  width: 40px;
  cursor: pointer;
}

.close-menu-zone {
  width: 100%;
  height: 100%;
}

.drawer-menu {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.drawer-content {
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: #fff;
  padding: 20px;
  padding-top: 100px;
  transition: transform 0.3s ease;

}

.link_menu {
  margin: 0 auto;
  text-align: center;
}

.drawer-content ul {
  list-style: none;
  padding: 0;
}

.drawer-content li {
  margin: 10px 0;
  margin-bottom: 24px
}

.drawer-content a {
  color: #fff;
  text-decoration: none;
}

.titleRes {
  margin-top: 7px;
}

.header-menu {
  display: flex
;
    justify-content: space-between;
    text-align: right;
    align-items: center;
}

.language-selector {
  margin-right: 15px;
}

.header-menu div {
  width: 50%;
}

.menu-container {
  display: flex;
  justify-content: start;
}

.social-icons {

  text-align: center;
  margin: 0 auto;
  color: white;
  text-decoration: none;

  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 167px;


}

.socialBtn {
  background-size: 35px;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
  margin: 2px;
  cursor: pointer;
  background-position: center;
}

.facebook {
  background-image: url(~@/assets/kazheno/tel.png);

}

.instagram {
  background-image: url(~@/assets/kazheno/ins.png);

}

.whatsapp {
  background-image: url(~@/assets/kazheno/whatsapp.png);

}

.telephone {
  background-image: url(~@/assets/kazheno/phone.png);
}


.divider {
  height: 66px;
  margin-top: 10px;
}

.current-flag,
.language-dropdown img {
  width: 50px;
}

.flags-container {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: start;
  flex-direction: column;
  direction: rtl;
}

.language-dropdown img {
  margin: 5px;
  ;
}

.language-dropdown {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  max-width: 64px;
  margin: 0 auto;
  text-align: center;
  border-radius: 15px;
  padding: 2px;
  height: 81px;
}

.avli_links {

  background-size: contain;

  border-radius: 0;
  font-weight: bold;
  color: black;
  font-size: 2em;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  padding: 52px;
  padding-left: 100px;


}

.flag {
  width: 57px;
  margin: 4px;
  background-color: white;
  border-radius: 18px;
  padding: 6px;
  padding-top: 10px;
  line-height: 8px;
  font-weight: bold;
}

.headerBtns {
  display: flex;
  justify-content: center;
}

.headerBtns a {}




@media screen and (max-width: 970px) {
  .avli_links {
    width: 267px;
  }
}

.foodBtn {
  margin-top: 4rem;
}

.logoImg {
  margin-top: 4rem;
}

@media screen and (max-width: 740px) {
  .logoImg {
    margin-top: 2rem;
  }

  .foodBtn {
    margin-top: 1rem;
  }

  .avli_links {
    height: 62px;
    background-size: contain;
    width: 100%;

    font-size: 9px;
    padding: 20px;
    padding-left: 60px;
  }

  .btnSteak {
    font-size: 9px;
  }

  .btnSalad {
    font-size: 10px;
  }


}

/* Modal Content Styling */
.modal-content {
  border-radius: 12px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
  /* Soft shadow for better focus */
  padding: 20px;
  background: linear-gradient(135deg, #ffffff, #f3f3f3);
  /* Subtle gradient for a clean look */
}

/* Modal Header */
.modal-header {
  border-bottom: 2px solid #34643d;
  /* Gold border to separate the header */
  text-align: center;
  padding-bottom: 15px;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  /* Darker text for contrast */
}

/* Close Button */
.btn-close {
  background-color: transparent;
  border: none;
  color: #888;
  /* Neutral color */
  transition: color 0.3s ease;
}

.btn-close:hover {
  color: #d4af37;
  /* Gold hover effect */
}

/* Form Inputs */
.form-outline input,
.form-outline textarea {
  border: 1px solid #ccc;
  /* Subtle border */
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-outline input:focus,
.form-outline textarea:focus {
  border-color: #d4af37;
  /* Highlight border on focus */
  outline: none;
  box-shadow: 0 0 5px rgba(212, 175, 55, 0.4);
  /* Glow effect */
}

/* Labels */
.form-label {
  font-size: 14px;
  color: #666;
  /* Softer text color */
  margin-bottom: 5px;
}

/* Submit Button */
#myBtn {
  background: linear-gradient(45deg, #396b41, #17331f);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

#myBtn:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  /* Enhanced hover effect */
}

/* Margins and Padding */
.form-outline {
  margin-bottom: 20px;
}

.modal-body {
  padding: 20px;
}

/* Animation on Modal Load */
.modal.fade .modal-dialog {
  transform: translateY(-50px);
  opacity: 0;
  transition: all 0.5s ease;
}

.modal.show .modal-dialog {
  transform: translateY(0);
  opacity: 1;
}

footer {
  text-align: center;
  margin: 0 auto;
  width: 100%;
  margin-top: -54px;
}
</style>

<style scoped>
.button-2 {
  margin: 8px 2px;
  border: none;
}

footer .copyright {

  text-align: center;
  margin: 0 auto;

  color: white;
  text-decoration: none;
  font-size: 10px !important;
  width: 100%;
}

footer .copyright a {
  color: white;
}


@media only screen and (max-width: 740px) {
  .avli_links {
    width: 89%;
    padding: 18px;
    padding-right: 40%;
    padding-left: 83px;
    display: flex !important;
    justify-content: center !important;
  }

}

.language-selector{
  text-align: left;
}
</style>
