<template>
  <div>
     <loading :active.sync="isLoading" ></loading>
    <div class="banner"></div>
    <div class="products">
      <div class="productList">
        <ul>
          <li :class="{active : categories == 'all'}" @click="categories = 'all'"><span>all</span></li>
          <li :class="{active : categories == 'food'}" @click="categories = 'food'"><span>food</span></li>
          <li :class="{active : categories == 'drink'}" @click="categories = 'drink'"><span>drink</span></li>
        </ul>
      </div>
      <div class="productMap">
        <div class="productItem" :id='product.id' 
        v-for="product in filterData" :key='product.id'>
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
        <Pagination class="pag" @getprod="getProducts" :pagedata="pagination" />
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
            cart:{},
            categories: "all",
        }
    },
    computed:{
      filterData() {
      const vm = this;
      if (vm.categories === "all") {
        return vm.products;
      } else {
        return vm.products.filter(
          product => product.category === vm.categories
        );
      }
    },
    },
    methods: {
        getProducts(page = 1){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/?page=${page}`;
            const vm = this;
            // vm.isLoading = true
            this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.products = response.data.products.filter(function(item){
              return item.is_enabled == 1
            });
            vm.isLoading = false
            vm.pagination = response.data.pagination;
            // console.log()
        })
        },
        getSingle(id){
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
            const vm = this;
            this.$http.get(api).then((response) => {
            console.log(response.data)
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
            const cart = {
              product_id:id,
              qty
            }
            this.$http.post(api,{data : cart}).then((response) => {
            vm.$swal({
            title: "",
            type:'success',
            text: "已加入購物車",
            timer: 1500,
            showConfirmButton: false
          });
            vm.closebox();
            vm.getCart();
            console.log(response.data)
            })
             
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
            this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.cart = response.data;
            this.$bus.$emit('cartInfo',response.data)
            console.log(vm.cart)
        })
        }
    },
    created(){
      this.$bus.$emit('cartShow',true)
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
  background: url(".././img/banner3.png") center;
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
  // border: 1px solid green;
  // width: 100%;
  height: auto;
  min-height: 900px;
  display: flex;
  // padding: 30px;
  position: relative;
  // justify-content: space-around;
  @include media(769px){
    flex-direction: column;
  }

}
.productList{
  min-width: 250px;
  max-width: 80%;
  height: 100%;
  // border: 1px solid green;
  // background: red;
  ul{
    height: auto;
    display: flex;
    flex-direction: column;
    li{
      cursor: pointer;
      height: 50px;
      width: 100%;
      // border: 1px solid #666;
      position: relative;
      span{
        @include font(1.3);
        position: absolute;
        left: 10px;
        bottom: 5px;
      }
      &:after{
        position: absolute;
        content: '';
        bottom: 10%;
        left: 0;
        width: 0;
        height: 1px;
        background-image: linear-gradient(to right, transparent,aquamarine);
        transition: width .3s;
      }
      &:hover{
        color: aquamarine;
      }
      &:hover::after{
        width: 100%;
      }
      &.active {
          span{
            color: aquamarine;
          }
          &::after {
              width: 100%;
          }
      }
    }
  }
}
.productMap{
  min-width: 50%;
  max-width: 100%;
  height: 100%;
  // border: 1px solid green;
  padding: 20px;
  padding-bottom: 80px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .productItem{
    // width: 20%;
    max-width: 350px;
    min-width: 220px;
    height: 360px;
    border-radius: 20px;
    transition: .5s;
    box-shadow: 1px 1px 3px rgba(85,85,85,.5);
    margin: 10px;
    @include media(769px){
      width: 90%;
      margin: 10px auto;
    }
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
        @include font(1.1);
        line-height: 1.5;
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
    .pag{
    // width: 100px;
    // height: 50px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    // border: 1px solid red;
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