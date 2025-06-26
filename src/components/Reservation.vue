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
            <img :src="require('../assets/images/logo.png')" alt="" width="150">

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
                        {{ $t('text1') }}
                         <br>
                         {{ $t('add') }}
                         <br>
                         <a href="tel:09016239009" class="text-phone">  09016239009 </a>
                         <br>
                         <a href="tel:01155260055" class="text-phone">  01155260055 </a>
                         <br>    
                         <br>
                         {{ $t('add2') }}
                         <br>
                         <a href="tel:01155226999" class="text-phone">  01155226999 </a>
                         <br>
                         <a href="tel:01155228777" class="text-phone">  01155228777 </a>
                    </div>
            
                   
                </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Post Your Comment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="commentForm">
                  <!-- Mobile input -->
                  <div class="form-outline mb-4">
                    <input type="text" id="mobile" name="mobile" class="form-control" />
                    <label class="form-label" for="mobile">Mobile</label>
                  </div>

                  <!-- Message input -->
                  <div class="form-outline mb-4">
                    <textarea class="form-control" id="message" name="message" rows="4" required></textarea>
                    <label class="form-label" for="message">Message</label>
                  </div>

                  <!-- Submit button -->
                  <button type="submit" class="btn btn-primary btn-block mb-4" id="myBtn">Send</button>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
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
  </div> -->
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
  name: "Home-Main",

  mounted() {
    this.$i18n.locale = this.lang;
  },  
}
</script>

