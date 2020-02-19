<template>
  <div>
    <loading :active.sync="isLoading">
    </loading>

    <table class="table mt-4">
      <thead>
        <tr>
          <th class="text-center">訂單號</th>
          <th class="text-center">是否付款</th>
          <th class="text-center">留言</th>
          <th class="text-center">付款方法</th>
          <th class="text-center">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key">
          <td class="text-center">{{ item.id }}</td>
          <td class="text-center">{{ item.is_paid }}</td>
          <td class="text-center">{{ item.message }}</td>
          <td class="text-center">{{ item.paid_date }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          
        </tr>
      </tbody>
    </table>
<Pagination @getprod="getOrder" :pagedata="pagination" />
    <!-- <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getOrder(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{ active: pagination.current_page === page }"
        >
          <a class="page-link" href="#" @click.prevent="getOrder(page)">{{
            page
          }}</a>
        </li>

        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getOrder(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav> -->

  </div>
</template>
<script>
import $ from "jquery";
import Pagination from '../Pagination';

export default {
    components:{
      Pagination
    },
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder:{},
    //   isLoading: false,
      isNew:false,
      isLoading:false,
    }
  },
  methods: {
    getOrder(page=1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
  
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      $("#couponModal").modal("show");
    },
  },
  created() {
    this.getOrder();
  }
};
</script>
<style lang="scss"></style>
