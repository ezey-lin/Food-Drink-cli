<template>
  <div class="order">
      <loading :active.sync="isLoading" ></loading>
      <h2>CheckOut</h2>
    <div class="col-md-6 mx-auto">
      <table class="table">
        <thead>
          <th></th>
          <th class="text-center">Product title</th>
          <th class="text-center">Quantity</th>
          <th class="text-center">Price</th>
        </thead>
        <tbody>
          <tr v-for="item in cart.data.carts" :key="item.id">
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="text-center">
              {{ item.product.title }}
            </td>
            <td class="text-center">{{ item.qty }}</td>
            <td class="text-center">{{ item.final_total | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">Total</td>
            <td class="text-right">{{ cart.data.total | currency }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="creatOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            :class="{'is-invalid':errors.has('email')}"
            v-model="form.user.email"
            placeholder="Please enter your E-mail"
            v-validate="'required|email'"
          />
          <span class="text-danger">{{errors.first('email')}}</span>
        </div>

        <div class="form-group">
          <label for="username">Recipient</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            :class="{'is-invalid':errors.has('name')}"
            v-model="form.user.name"
            placeholder="Please enter your Name"
            v-validate="'required'"
          />
          <span class="text-danger" v-if="errors.has('name')">Please enter your Name</span>
        </div>

        <div class="form-group">
          <label for="usertel">Recipient Tel</label>
          <input
            type="tel"
            name="tel"
            class="form-control"
            :class="{'is-invalid':errors.has('tel')}"
            id="usertel"
            v-model="form.user.tel"
            placeholder="Please enter your Phone"
            v-validate="'required'"
          />
          <span class="text-danger" v-if="errors.has('tel')">Please enter your Phone</span>
        </div>

        <div class="form-group">
          <label for="useraddress">Address</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid':errors.has('address')}"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="Please enter your Address"
            v-validate="'required'"
          />
          <span class="text-danger" v-if="errors.has('address')">Please enter your Address</span>
        </div>

        <div class="form-group">
          <label for="comment">Leave your Message</label>
          <textarea
            name
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">Send Order</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
        data(){
          return {
            cart:{
              data:{}
            },
            form: {
              user: {
                name: "",
                email:"",
                tel: "",
                address: ""
              },
              message: ""
            },
            isLoading: false,
        }
        },
        methods:{
        getCart(){
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
            // console.log(response.data)
            // vm.isLoading = false;
            setTimeout(() => {
            this.isLoading = false
            },800)
            vm.cart = response.data;
            // console.log(vm.cart)
        })
        },
        removeCartItem(id){
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.delete(api).then((response) => {
            // console.log(response.data)
            vm.isLoading = false;
            vm.getCart()
        })
        },
        creatOrder() {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.    VUE_APP_CUSTOMPATH}/order`;
          const vm = this;
          const order = vm.form;
          // vm.isLoading = true;
          this.$validator.validate().then(result => {
            if (result) {
              // 當驗證成功時執行 AJAX 的行為
              this.$http.post(api, { data: order }).then(response => {
                console.log("訂單已建立", response);
                if (response.data.success) {
                  vm.$router.push(`/customcheck/${response.data.orderId}`);
                }
                vm.isLoading = false;
              });
            } else {
              // 驗證失敗產生的行為
              console.log("欄位不完整");
            }
          });
        }
    },
    created(){
    this.$bus.$emit('cartShow',false)
    this.getCart();
    }
}
</script>

<style lang="scss" scoped>
.order{
    width: 80%;
    min-height: 100vh;
    height: auto;
    margin: 0 auto;
    margin-top: 100px;
}
</style>