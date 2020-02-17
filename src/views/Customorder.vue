<template>
  <div>
    <!-- <Navbar></Navbar>
    <slide></slide> -->
    <div class="banner"></div>
    <div class="products">
      <div class="productList"></div>
      <div class="productMap">
        <div class="productItem" :id='product.id' 
        v-for="product in products" :key='product.id'>
          <div class="productImg" :style="{backgroundImage:`url(${product.imageUrl})`}"  @click="getSingle(product.id)"></div>
          <div class="productInfo">
            <div class="text">
              <span> {{product.title}} </span>
              <span>{{product.price | currency}}</span>
            </div>
            <div class="addCart" @click="addToCart(product.id)">
              <i class="fas fa-shopping-cart"></i>
            </div>
          </div>
        </div>
        <transition name="fade">
        <Productdetail v-if="popup" :singleData="productSingle" @closebox="closebox" @add="add"/>
        </transition>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import $ from 'jquery';
import Pagination from '../components/Pagination'
import Productdetail from '../components/customoder/Productdetail'
export default {
    components:{
      Pagination,
      Productdetail
    },
    data(){
        return {
            products:[],
            pagination:{},
            tempProduct:{},
            popup:false,
            isNew:false,
            isLoading:false,
            edit:'新增產品',
            status:{
              fileUpLoading:false
            },
            productSingle:{},
        }
    },
    methods: {
        getProducts(page = 1){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/?page=${page}`;
            const vm = this;
            vm.isLoading = true
            this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.products = response.data.products
            vm.isLoading = false
            vm.pagination = response.data.pagination;
            // console.log()
        })
        },
        getSingle(id){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            const vm = this;
            vm.isLoading = true
            this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.isLoading = false
            vm.productSingle = response.data.product;
            vm.popup = true;
            // vm.pagination = response.data.pagination;
            // console.log()
        })
        },
        closebox(){
          this.popup = false;
        },
        addToCart(id,qty = 1){
          console.log('123')
          console.log(id)
           const vm = this;
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            vm.isLoading = true;
            const cart = {
              product_id:id,
              qty
            }
            this.$http.post(api,{data : cart}).then((response) => {
            vm.closebox();
            vm.getCart();
            console.log(response.data)
            vm.isLoading = false;})
        },
        add(obj){
          this.tempProduct = obj;
          // console.log(this.tempProduct)
          const id = this.tempProduct.id
          const num = this.tempProduct.num
          this.addToCart(id,num)
        },
        getCart(){
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm = this;
            vm.isLoading = true
            this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.isLoading = false
            // console.log()
        })
        }
    },
    created(){
        this.getProducts();
        this.getCart();
    }
}
</script>
<style lang="scss">
@import '.././assets/helpers/var';
*{
  font-family:"Open Sans", sans-serif;
}
.banner{
  width: 100%;
  height: 60vh;
}
.fade-enter-active {
  animation: coming .3s;
}
.fade-leave-active {
  animation: going .3s;
}
@keyframes going {
  from{
    transform: translate(-50%, -50%) scale(1) ;
    opacity: 1;
  }
  to{
    transform: translate(-50%, -50%) scale(0) ;
    opacity: 0;
  }
}
@keyframes coming {
  from{
    transform: translate(-50%, -50%) scale(0) ;
    opacity: 0;
  }
  to{
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}
.products{
  border: 1px solid green;
  // width: 100%;
  height: auto;
  display: flex;
  padding: 30px;
  position: relative;
}
.productList{
  width: 20%;
  height: 100%;
  border: 1px solid green;
  background: red;
}
.productMap{
  width: 80%;
  height: 100%;
  border: 1px solid green;
  // background: #000;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .productItem{
    width: 30%;
    max-width: 350px;
    min-width: 230px;
    height: 400px;
    border-radius: 20px;
    transition: .5s;
    box-shadow: 1px 1px 3px rgba(85,85,85,.5);
    margin: 10px;
    margin-right: 20px;
    cursor: pointer;
    z-index: 9;
    &:hover{
      transform: scale(1.05)!important;
      box-shadow: 4px 4px 12px rgba(85,85,85,.5);
    }
    .productImg{
      background: url('../img/blue.png') no-repeat center;
      background-size:cover;
      width: 100%;
      height: 85%;
    }
    .productInfo{
      width: 100%;
      height: 15%;
      display: flex;
      position: relative;
      border-radius:0 0 20px 20px;
      .text{
        @include font(1.2);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 20px;
        border-radius:0 0 20px 20px;
        span{
        font-family:"Open Sans", sans-serif;
        font-weight:500;
        }
      }
    }
    .addCart{
      width: 80px;
      height: 100%;
      padding: 15px;
      z-index: 99;
      background: #666;
      transition: all .4s;
      position: absolute;
      cursor: pointer;
      bottom: 0;
      right: 0;
      border-radius: 0 0 20px 0;
      i{
        color: white;
        font-size: 25px;
      }
      &:hover{
        width: 100%;
        background:lightblue;
        border-radius: 0 0 20px 20px;
      }
    }
  }
}
.categories{
  border: 1px solid red;
  margin: 0;
  padding:0;
}
.col-md-4{
  border: 1px solid red;
}

</style>