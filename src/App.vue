<template>
  <div id="app">
    <nav class="nav">
      <router-link class="link" to="/">Home</router-link> |
      <router-link class="link" to="/quote">Quote</router-link>|
      <router-link class="link" to="/autor">Autor</router-link>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
};
</script>

<style scoped>
.nav {
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 500;
  gap: 30px;
  color: #fff;
}
.link {
  color: #fff;
}
.container {
  margin: 100px auto;
  max-width: 1400px;
}
</style>
