<template>
    <div>
         <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <div class="nav-link active" href="#">
                  <span data-feather="home"></span>
                  Management <span class="sr-only">(current)</span>
                </div>
              </li>
               <li class="nav-item">
               <router-link
                  to="/dashboard/products"
                  class="nav-link p-3"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                 <i class="fas fa-box-open"></i>
                  Productli
                </router-link>
              </li>
              <li class="nav-item">
               <router-link
                  to="/dashboard/orderlist"
                  class="nav-link p-3"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                >
                <i class="fas fa-cart-arrow-down"></i>
                Orderlist
                </router-link>
              </li>
              <li class="nav-item logout">
                <a href="" @click.prevent='logOut'>Sign out</a>
              </li>
            </ul>
          </div>
        </nav>
    </div>
</template>
<script>
export default {
    methods:{
    logOut(){
        const api = `${process.env.VUE_APP_APIPATH}/logout`;
        const vm = this;
        this.$http.post(api).then((response) => {
        console.log(response.data)
        if(response.data.success){
             vm.$router.push('/login');
        }
      })
    },
  }
}
</script>
<style lang="scss">
.nav-item{
  width: 180px;
  height: 50px;
  // border: 1px solid red;
}
.logout{
  margin-top: 50px;
}
</style>