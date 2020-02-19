<template>
  <div id="app">
    <Alert/>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/customorder">Order</router-link> |
      <!-- <router-link to="/order">Cart</router-link> | -->
      <!-- <router-link to="/checkout">Checkout</router-link> | -->
      <router-link to="/dashboard/products">Management</router-link> 
    </div>
    <router-view/>
    <Footer/>
    <Cart v-if="cartShow"/>
  </div>
</template>

<script>
import $ from 'jquery';
import Footer from './components/Footer'
import Banner from './components/home/Banner'
import Cart from './components/Cart'
import Order from './views/Order'
import Alert from './components/Alertmsg'

export default {
  name:'app',
  data(){
    return{
      cartShow:true,
    }
  },
  components:{
    Banner,
    Footer,
    Cart,
    Order,
    Alert
  },
  created(){
    this.$bus.$on('cartShow', (cartShow) => {
        this.cartShow = cartShow;
      });
  }

}
</script>

<style lang="scss">
@import './assets/helpers/var';
#app {
  font-family: 'Open Sans', sans-serif;
  color: #2c3e50;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
#nav {
  position: absolute;
  padding: 30px;
  z-index: 9999;
  top: 0;
  left: 0;
  a {
     @include font(1.3);
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@import "./assets/all";
</style>
