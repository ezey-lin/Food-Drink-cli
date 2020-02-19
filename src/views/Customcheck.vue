<template>
  <div class="checkOut">
    <div class="container my-5 row mx-auto">
      <form @submit.prevent="payOrder()">
        <table class="table">
          <thead>
            <th>Product title</th>
            <th>Quantity</th>
            <th>Price</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">
                {{ item.qty }}
              </td>
              <td class="align-middle text-right">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">total</td>
              <td class="text-right">{{ order.total | currency }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>Recipient</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>Telephone</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th width="200">Payment status</th>
              <td>
                <span v-if="!order.is_paid">Haven't Received Your Payment</span>
                <span v-else class="text-success"
                  >Your Payment have been Received</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      order: {
        user: {}
      },
      orderId: ""
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;

      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.order = response.data.order;
        console.log(response);
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;

      vm.isLoading = true;
      this.$http.post(api).then(response => {
        console.log(response);
        if (response.data.success) {
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.$bus.$emit('cartShow',false)
    this.getOrder();
  },

};
</script>
<style lang="scss" scoped>
.checkOut{
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    margin-top: 100px;
    form{
        width: 100%;
        // border: 1px solid red;
        margin: 0 auto;
    }
}
</style>