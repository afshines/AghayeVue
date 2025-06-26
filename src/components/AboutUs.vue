<template>
  <section class="main_body">
    <div id="avliSlider" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
        </div>
        <!--<div class="carousel-item">
            </div>-->
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-1g-12">
            <div style="height: 30px;"></div>
            <img :src="require('../assets/kazheno/logo.png')" alt="" width="150">

            <a class="reserve_button" href="#" v-on:click="this.$router.push({ name: 'Home' , params: { lang: this.lang } })"><button type="button"
                class="btn button-2 button-3">{{ $t('back') }}</button> </a>
          </div>
        </div>
        <div class="row">
                    <div class="col-lg-12 col-12" style="    color: white;
                    font-size: 14px;
                  line-height: 50px;
                    direction: rtl;
                    font-weight: bold;">
                    <p v-html="$t('textAbout')" style="    color: black; 
    font-size: 19px;">
                     
                    </p>
                      
                      
                    </div>
            
                   
                </div>

      </div>
    </div>
  </section>

</template>

<style scoped>
.button-3 {
  background-color: #613e1d;
  border: 4px solid #918783;
    color: #fff;
    padding: 7px 29px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 17px;
    margin-bottom: 39px;
    margin-top: 20px;
    border-radius: 10px;
}
</style>

<script>

export default {
  props: ['lang'],
  name: "AboutUs-Main",

  mounted() {
    this.$i18n.locale = this.lang;
  },  


}
</script>

