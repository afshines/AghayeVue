<template>

  <div class="black">

    <header>

      <center  v-on:click="this.$router.push({ name: 'Home' })">
        <img style="width:180px" :src="require('../assets/logo.png')" />
      </center>


    </header>
    <div class="container">

      <h5 style="color: black;"> {{ $t('please select a section') }} </h5>


      <div v-on:click="this.$router.push({ name: 'Menu', params: { lang: lang } })" class="btn">
        <img width="64" :src="require('../assets/209116.png')" />
        <span>{{ $t('restaurant') }}</span>
      </div>

      <div v-on:click="this.$router.push({ name: 'MenuCaffe', params: { lang: lang } })" class="btn">
        <img width="64" :src="require('../assets/4812080.png')" />
        <span>{{ $t('cafe') }}</span>
      </div>

      <div v-on:click="this.$router.push({ name: 'MenuDessert', params: { lang: lang } })" class="btn">
        <img width="64" :src="require('../assets/3612569.png')" />
        <span>{{ $t('gameclub') }}</span>
      </div>

      <div v-on:click="this.$router.push({ name: 'MenuDrink', params: { lang: lang } })" class="btn">
        <img width="64" :src="require('../assets/3612569.png')" />
        <span>{{ $t('gameclub') }}</span>
      </div>


      <div v-on:click="this.$router.push({ name: 'MenuHookah', params: { lang: lang } })" class="btn">
        <img width="64" :src="require('../assets/3612569.png')" />
        <span>{{ $t('gameclub') }}</span>
      </div>

    </div>

    <footer>
      <div class="box">
        <div>
          <a target="_blank" href="https://www.instagram.com/rasti.complex">
            <img width="64" :src="require('../assets/flags/Instagram.png')" />
          </a>
        </div>
        <div>
          <a target="_blank" href="https://hascoweb.com">HascoWeb.Com</a>
        </div>
        <div style="width: 115px;">

        </div>
      </div>
    </footer>
  </div>

</template>

<script>

export default {

  name: "Selection-Main",
  props: ['lang'],
  mounted() {
    this.$i18n.locale = this.lang;



  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer .box {
  display: flex;
  justify-content: space-between;
}

footer .box div {
  padding: 10px;
  text-align: center;
}

footer .box div a {
  color: white;
  font-weight: bold;
  text-decoration: none;
  position: fixed;
  bottom: 0;
}

.btn {
  background-color: black;
  cursor: pointer;
  width: 250px;
  margin: 0 auto;
  height: 64px;
  border: 2px solid #fff;
  border-radius: 12px;
  padding: 5px;
  text-align: right;
  margin-top: 10px;
}

.btn img {

  float: right;
}

.btn span {
  float: left;
  position: relative;
  top: 34%;
  width: 46%;
}

.btn.disable {
  opacity: .5;
  cursor: not-allowed;
}

.black {
  background-color: black;
  color: white;
  height: 100vh;

  overflow: hidden;
}

header {
  margin: 25px;
}

.box-container {
  text-align: center;
  margin: 25px;

}

.container {
  background-color: #dcaf2d;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
