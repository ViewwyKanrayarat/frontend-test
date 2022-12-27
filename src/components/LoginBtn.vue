<template>
  <div class="BtnLogin">
    <v-btn
      class="rounded-0 right"
      small
      block
      color="#252B67"
      style="color: #ffffff"
      @click="$emit('login')"
    >
      <div style="position: absolute; right: 50%">login</div>
      <v-icon small style="position: absolute; right: 0%"
        >mdi-arrow-right-thin</v-icon
      >
    </v-btn>
  </div>
</template>

<style>
.BtnLogin {
  margin: auto;
  width: 300px;
}
</style>
