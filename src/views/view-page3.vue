<template>
  <v-col col="12">
    <v-file-input v-model="files" truncate-length="15"></v-file-input>
    <v-btn @click="inputFlie()"></v-btn>
    <v-img height="500" :src="Image"></v-img>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      Image: "",
      files: null,
    };
  },

  methods: {
    inputFlie() {
      this.$store.commit("updateloading", true);
      let formData = new FormData();
      formData.append("image", this.files);
      this.axios
        .post("http://203.151.199.181:2525/api/v1/scanfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.Image =
            "data:image/jpeg;base64," + res.data.data.data.result_img;
          this.$store.commit("updateloading", false);
        })
        .catch(() => {
          this.$store.commit("updateloading", false);
        });
    },
  },
};
</script>
