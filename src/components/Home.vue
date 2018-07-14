<template>
  <div>
    <div class="row text-center my-5 pt-5">

      <form class="form-inline mx-auto my-2 my-lg-0">
        <input v-model="search" class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
        <button @click.prevent="navigate('Search', { keyword: search })" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
    <div class="row mb-2">
      <div class="col-6"><Weather :woeid="2344116"></Weather></div>
      <div class="col-6"><Weather :woeid="638242"></Weather></div>
    </div>
    <div class="row mb-2">
      <div class="col-6"><Weather :woeid="44418"></Weather></div>
      <div class="col-6"><Weather :woeid="565346"></Weather></div>
    </div>
    <div class="row mb-2">
      <div class="col-6"><Weather :woeid="560743"></Weather></div>
      <div class="col-6"><Weather :woeid="9807"></Weather></div>
    </div>

  </div>
</template>

<script>
    import Weather from "./Weather";
    export default {
        name: "Home",
      data: function() {
          return {
            search: ''
          }
      },
      components: {Weather},
      methods: {
          navigate(name, params) {
            this.$router.push({ name: name, params: params})
          }
      }
    }
</script>

<style scoped>

</style>
