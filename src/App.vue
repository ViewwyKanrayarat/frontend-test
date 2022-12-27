<template>
  <v-app style="background-color: var(--v-backgroundColor-base)">
      <router-view />
      <ComLoad></ComLoad>
  </v-app>
</template>

<script>
import ComLoad from './components/ComLoad.vue';
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    ComLoad,
  },
}
</script>

<style>
.v-application{
  font-family: 'Sarabun', serif !important;
}
</style>
