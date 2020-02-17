<template>
  <div class="hello">
    <a href="" @click.prevent='logOut'>登出</a>
    <router-link to="/login">登入</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  border: 1px solid blue
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
