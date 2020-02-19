<template>
  <div>
    <!-- <Navbar/> -->
    <Alert/>
    <div class="container-fluid">
      <div class="row">
       <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
         <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
    import Sidebar from './Sidebar';
    import Navbar from './Navbar';
    import Alert from './Alertmsg';

export default {
components:{
  Sidebar,
  Navbar,
  Alert
},
  created(){
    this.$bus.$emit('cartShow',false);
  }
}
</script>

<style>
.container-fluid{
  margin-top: 80px
}
</style>