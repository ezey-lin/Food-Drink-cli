<template>
    <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{'disabled':!pagedata.has_pre}"
            @click.prevent="getProducts(pagedata.current_page-1)">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for='page in pagedata.total_pages' :key='page'
            :class="{'active':pagedata.current_page === page}" @click.prevent="getProducts(page)"
            ><a class="page-link" href="#"> {{page}} </a></li>
            <li class="page-item" :class="{'disabled':!pagedata.has_next}" 
            @click.prevent="getProducts(pagedata.current_page+1)">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name:'Pagination',
    props:['pagedata'],
    data(){
        return {
            isLoading:false,
        }
    },
    methods:{
        getProducts(page){
            this.$emit('getprod',page)
        }
    }
}
</script>