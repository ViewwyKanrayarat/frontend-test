<template>
  <div>
    <v-row class="LoginCenter" >
      <!-- rounded-0 ทำให้ช่องเป็นสี่เหลี่ยม -->
      <!-- USER -->
      <v-text-field
      class="UserAc rounded-0 Textbox"
      placeholder="Users"
      v-model="username"
      outlined
      dense
      prepend-inner-icon="mdi-account"
    ></v-text-field>
    <!-- PASSWORD -->
    <v-text-field
      class="rounded-0 Textbox"
      placeholder="Password"
      v-model="password"
      :type="show ? 'text' : 'password'"
      outlined
      dense
      prepend-inner-icon="mdi-lock"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show = !show"
    ></v-text-field>
    </v-row>
  </div>
</template>
<script>
export default{
  data() {
    return {
      username: '',
      password: '',
      show: false,
    }
  },
  watch: {
    username(val) {
    this.$store.commit('updateuser', val)
    },
    password(val) {
    this.$store.commit('updatepass', val)
    }
  },
}
</script>
<style scoped>
.Btn {
  color: #002762;
}
/* เจาะคลาสแบบสร้างชื่อคลาส */
.UserAc >>> .mdi-account::before {
  color: #3d3838;
}
/* เจาะคลาส */
.v-text-field--outlined >>> fieldset {
  border-color: #002762 ;
}
::v-deep .mdi-lock::before {
  color: #3d3838;
}
.LoginCenter {
  width: 300px;
  margin: auto;
}

/* /* การเจาะคลาสถ้าอยู่ใน element เดียวกัน ต้องติดกัน ห้ามเว้นวรรค */
>>> .Textbox.v-input input {
    color: #3d3838;
}


</style>
