<template>
  <div>
    <v-overlay :value="$store.state.loading">
      <v-progress-circular
        :size="90"
        :width="7"
        color="white"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>



<style scoped></style>
