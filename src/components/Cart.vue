<template>
    <div class="cart">
        <div class="innerbox">
            <transition name="scale">
            <div class="cartList" v-if="show">
                <div class="table">
                    <div class="thead">
                        <th></th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </div>
                    <div class="tb">
                        <div v-for="item in cart.data.carts" :key="item.id" class="tr">
                        <div class="rmvBtn">
                            <button type="button" class="btn btn-outline-danger btn-sm"
                            @click="removeCartItem(item.id)">
                            <i class="far fa-trash-alt" v-if="status.rmvLoading != item.id"></i>
                            <i class="fas fa-spinner fa-spin" v-if="status.rmvLoading === item.id"></i>
                            </button>
                        </div>
                        <td class="align-middle">
                            {{item.product.title }}
                        </td>
                        <td class="align-middle">{{ item.qty }}</td>
                        <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                        </div>
                    </div>
                    <div class="tfoot">
                        <tr>
                        <td colspan="3" class="text-right">Total</td>
                        <td class="text-right">{{ cart.data.total | currency }}</td>
                        </tr>
                        <div class="checkOut" @click="goCheckOut"><button>checkout</button></div>
                    </div>
                </div>
            </div>
            </transition>
            <div class="btnBox">
            <button class="switch" @click="showCart">
                <i class="fas fa-shopping-cart"></i>
                <span> {{cartLen}} </span>
            </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            show:false,
            cart:{
                data:{}
            },
             status:{
              fileUpLoading:false,
              rmvLoading:false,
            },
            cartLen:0,
        }
    },
    methods:{
        showCart(){
            this.getCart();
            this.show = !this.show;
        },
        getCart(){
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm = this;
            this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.cart = response.data;
            console.log(vm.cart)
        })
        },
        removeCartItem(id){
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.status.rmvLoading = id;
            this.$http.delete(api).then((response) => {
            console.log(response.data)
            vm.cartLen --;
            vm.getCart()
        })
        },
        goCheckOut(){
            this.showCart();
            this.$router.push('/order')
        }
    },
    created(){
        this.getCart();
        this.$bus.$on('cartLeng', (cartInfo) => {
        this.cartLen = cartInfo.data.carts.length;
        });
    }
}
</script>
<style lang="scss" scoped>
@import '.././assets/helpers/var';
.cart{
    position: fixed;
    right: 20px;
    bottom: 5%;
    min-height: 500px;
    height: 65%;
    z-index: 99;
    // overflow: hidden;
    .innerbox{
        height: 100%;
        .btnBox{
            position: absolute;
            bottom: 0;
            right: 0;
            .switch{
            transition: .4s;
            @include btnReset;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            box-shadow: 3px 3px 5px rgba(0,0,0,.2);
            color: #666;
            background: #d6e8fa;
            padding: 15px;
            position: relative;
            span{
                display: inline-block;
                width: 23px;
                height: 23px;
                border-radius: 50%;
                position: absolute;
                right: 5px;
                top: 5px;
                background: red;
                color: white;
            }
        &:hover{
            box-shadow: 1px 1px 3px rgba(0,0,0,.2);
            background: lightblue;
        }
        }
        }
        .cartList{
            box-shadow: 3px 3px 5px rgba(0,0,0,.2);
            min-width: 330px;
            height: 85%;
            min-height: 510px;
            border-radius: 0 0 10px 10px;
            background: white;
            .thead{
                width: 100%;
                display: flex;
               justify-content: center;
            }
            .tb{
                width: 100% ;
                height: 350px;
                overflow-y: scroll !important;
                // border: 1px solid red;
                .tr{
                    // border: 1px solid red;
                    display: flex;
                    justify-content: center;
                    position: relative;
                    .rmvBtn{
                        position: absolute;
                        left: 15px;
                        top: 20%;
                    }
                }
            }
            .checkOut{
                position: absolute;
                left: 10px;
                width: 120px;
                height: 50px;
                button{
                    @include btnReset;
                    border-radius: 10px;
                    background: #666;
                    width: 100%;
                    height: 100%;
                    transition: .3s;
                    @include font(1);
                    color: white;
                    &:hover{
                        background: lightblue;
                    }
                }
            }
        }
    }
}
.scale-enter-active{
  animation: comin .3s;
}
.scale-leave-active {
  animation: goin .3s;
}
@keyframes goin {
  from{
    transform: scale(1) ;
    opacity: 1;
  }
  to{
    transform: scale(0) ;
    opacity: 0;
  }
}
@keyframes comin {
  from{
    transform: scale(0) ;
    opacity: 0;
  }
  to{
    transform: scale(1);
    opacity: 1;
  }
}
</style>