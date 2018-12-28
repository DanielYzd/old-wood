<template>
  <div>
    <div class="container">
      <div class="row pad-top text-center">
        <div class="col-md-6 col-md-offset-3 text-center">
          <h1>What have you done?</h1>
          <h5>Now Go Back Using Below LInk</h5>
          <span id="error-link">404?</span>
          <h2>! ERROR DECETED !</h2>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-md-8 col-md-offset-2">
          <h3>
            <i class="fa fa-lightbulb-o fa-5x"></i>
          </h3>
          <router-link :to="{ name:'Login'}">返回登录页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
/*=======================================
    GENERAL STYLES
==================================================*/
body {
  /* font-family: 'Nova Flat', cursive;
    background-color: #B396FF;
color: #fff; */
}
.pad-top {
  padding-top: 60px;
}
.text-center {
  text-align: center;
}
#error-link {
  font-size: 150px;
  padding: 10px;
}
</style>
