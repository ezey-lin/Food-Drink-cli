<template>
    <div class="cart">
        <div class="innerbox">
            <transition name="scale">
            <div class="cartList" v-if="show">
                <div class="table">
                    <div class="thead">
                        <th></th>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                    </div>
                    <div class="tb">
                        <tr v-for="item in cart.data.carts" :key="item.id">
                        <td class="align-middle">
                            <button type="button" class="btn btn-outline-danger btn-sm"
                            @click="removeCartItem(item.id)">
                            <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                        <td class="align-middle">
                            {{item.product.title }}
                            <!-- <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                            </div> -->
                        </td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.uni }}</td>
                        <td class="align-middle text-right">{{ item.final_total }}</td>
                        </tr>
                    </div>
                    <div class="tfoot">
                        <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right">{{ cart.data.total }}</td>
                        </tr>
                        <tr>
                        <td colspan="3" class="text-right text-success">折扣價</td>
                        <td class="text-right text-success">{{ cart.data.final_total }}</td>
                        </tr>
                    </div>
                </div>
                <!-- <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" placeholder="請輸入優惠碼">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">
                    套用優惠碼
                    </button>
                </div>
                </div> -->
            </div>
            </transition>
            <div class="btnBox">
            <button class="switch" @click="showCart">
                <i class="fas fa-shopping-cart"></i>
                <span> {{ this.cart.data.carts.length }} </span>
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
            cart:Array,
        }
    },
    computed:{
        len(){
            let leng = this.cart.data.carts.length
            return leng
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
            vm.isLoading = true
            this.$http.get(api).then((response) => {
            console.log(response.data)
            vm.isLoading = false;
            vm.cart = response.data;
            console.log(vm.cart)
        })
        },
        removeCartItem(id){
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.isLoading = true
            this.$http.delete(api).then((response) => {
            console.log(response.data)
            vm.isLoading = false;
            vm.getCart()
            // vm.cart = response.data;
            // console.log(vm.cart)
        })
        },
    },
    created(){
        this.getCart();
    }
}
</script>
<style lang="scss">
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
            color: white;
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
            }
        &:hover{
            box-shadow: 1px 1px 3px rgba(0,0,0,.2);
            background: #c1defa;
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