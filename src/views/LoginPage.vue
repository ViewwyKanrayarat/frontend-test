<template>
  <!-- backgrounlogin -->
  <div class="cardlogin">
    <!-- card -->
    <div class="d-flex justify-center align-center" style="height: 100%">
      <v-card width="1100px" height="600px" :class="[$vuetify.breakpoint.width > 670 ? 'classcenter': 'classcenter1', 'mx-10']">
          <!-- login -->
          <v-col >
            <LoginSet @login='Loginpage'/>
          </v-col>
          <!-- pic -->
          <v-col cols="6" v-if="($vuetify.breakpoint.width > 670)">
            <v-img class="imgcard2 animate__animated animate__fadeInDown" src="../assets/people.svg" />
          </v-col>
      </v-card>
    </div>
  </div>
</template>
<script>
import LoginSet from "@/components/LoginSet.vue";

export default {
  components: {
    LoginSet,
  },
  methods: {
    Loginpage() {
      let payload= this.$store.getters.getusps
      this.$store.commit('updateloading', true)
      setTimeout(() => {
        this.axios
        // frontส่งข้อมูลไปback
        .post(
          `http://localhost:3000/api/v1/authenticate`,payload,{headers: {
            "Content-Type": "application/json",
          }}
        )
        // backส่งข้อมูลกลับมา status code 200
        .then((res) => {
          this.$store.commit('updateloading', false)
          this.$cookies.set('token', res.data.data.token)
          this.$router.push({ name: "page1" });
        })
        // status code 400,500 error
        .catch(() => {
          this.$store.commit('updateloading', false)
          alert('login fail');
        });
      }, 300);

    },
  },
};
</script>
<style scoped>
.classcenter {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 90px;
  background: linear-gradient(
    to right,
    #ffff 0%,
    #ffff 50%,
    #dae7f1 50%,
    #dae7f1 100%
  );
}
.classcenter1 {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 90px;
  background: linear-gradient(
    to right,
    #ffff 0%,
    #ffff 100%,
  );
}
.cardlogin {
  height: 100vh;
  background: linear-gradient(90deg, #dae7f1 50%, #2c3374 50%);
}
.imgcard2 {
  margin: auto;
  width: 80%;
}
</style>
