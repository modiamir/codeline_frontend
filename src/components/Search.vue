<template>
  <div>
    <div class="row text-center my-5 pt-5">

      <form class="form-inline mx-auto my-2 my-lg-0">
        <input v-model="keyword" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
        <button @click.prevent="navigate('Search', { keyword: keyword })" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
    <div class="row mb-2">
      <div v-for="w in result" class="col-6"><Weather :woeid="w.woeid"></Weather></div>
    </div>
  </div>
</template>

<script>
  import http from '../Http';
  import Weather from "./Weather";
  export default {
    name: "Search",
    components: {Weather},
    data: function () {
      return {
        keyword: '',
        result: [],
      }
    },
    mounted() {
      this.keyword = this.$route.params.keyword;
      this.doSearch()
    },
    methods: {
      doSearch() {
        http.get('/weather.php?command=search&keyword=' + this.keyword)
          .then(response => {
            this.result = response.data;
          })
      },
      navigate(name, params) {
        this.$router.push({ name: name, params: params})
      }
    }
  }
</script>

<style scoped>

</style>
