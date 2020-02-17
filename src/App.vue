<template>
  <div id="app">
    <div id="nav">
      <router-link to="/hello">Hello</router-link> |
      <router-link to="/">Home</router-link> |
      <router-link to="/customorder">customorder</router-link> |
      <router-link to="/dashboard/products">dashboard</router-link>
    </div>
    <router-view/>
    <Footer/>
    <Cart/>
  </div>
</template>

<script>
import $ from 'jquery';
import Footer from './components/Footer'
import Banner from './components/home/Banner'
import Hello from './components/HelloWorld'
import Cart from './components/Cart'
export default {
  name:'app',
  components:{
    Banner,
    Footer,
    Hello,
    Cart
  }

}
</script>

<style lang="scss">
#app {
  font-family: 'Open Sans', sans-serif;
  color: #2c3e50;
  text-align: center;
  position: relative;
  // position: relative;
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
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@import "./assets/all";
</style>
