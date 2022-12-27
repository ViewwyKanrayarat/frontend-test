<template>
  <div>
    <div class="FontTextTitle TextCenter animate__animated animate__fadeInDown">{{ TextTitle }}</div>
    <v-img class="ImgCenter mt-1 animate__animated animate__fadeInDown" src="../assets/manageAi.svg" />
    <UserPs class="mt-15"/>
    <LoginBtn @login="$emit('login')" />
  </div>
</template>

<script>
import UserPs from "./UserPs.vue";
import LoginBtn from "./LoginBtn.vue";

export default {
  components: {
    UserPs,
    LoginBtn,
  },
  data() {
    return {
      TextTitle: "Login เข้าระบบ",
    };
  },
};
</script>

<style scoped>
.imgcard1 {
  height: 100%;
  display: flex;
  justify-content: center;
}
.FontTextTitle {
  font-weight: 400;
  font-size: 25px;
  color: #002762;
}
.TextCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ImgCenter {
  width: 20%;
  margin: auto;
}
</style>
