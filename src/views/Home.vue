<template>
  <div class="home">
    <header>
      <Banner/>
      <div class="logo"></div>
    </header>
    <HomeIntro/>
    <Newproduct/>
    <Location/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import $ from 'jquery';
import HelloWorld from '@/components/HelloWorld'
import Banner from '../components/home/Banner'
import HomeIntro from '../components/home/HomeIntro'
import Newproduct from '../components/home/Newproduct'
import Location from '../components/home/Location'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Banner,
    HomeIntro,
    Newproduct,
    Location
  },
    mounted(){

  },
}
</script>

<style lang="scss">
header{
  width: 100%;
  height: 90vh;
  // border: 1px solid blue;
  overflow: hidden;
}

</style>
