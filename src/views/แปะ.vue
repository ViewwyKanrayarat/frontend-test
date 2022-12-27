<template>
  <body class="cardlogin"
    style="background: linear-gradient(90deg, #dae7f1 50%, #2c3374 50%)">
    <!--loading -->
    <Loading :loading="loader" />
    <div class="d-flex justify-center align-center" style="height: 100vh">
      <div>
         <!-- จัดหน้า log in -->
        <h1 class="text-center" style="color: #626567">Log in</h1>
        <!-- จัดบรรทัดให้ห่างจากคำว่า login -->
        <v-row justify="center" class="mt-6">
          <v-card width="1200px" height="710" class="classcenter" flat elevation="0">
            <div>

              <div class="text-center">{{ TextTitle }}</div>
              <!-- username -->
              <v-text-field
                v-model="username"
                :elevation="24"
                solo
                label="User"
                prepend-inner-icon="mdi-account"
              ></v-text-field>
              <!-- password -->
              <v-text-field
                v-model="password"
                :type="show ? 'text' : 'password'"
                solo
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
              ></v-text-field>
              <div class="text-center">
                <v-btn @click="login" elevation="2">Log in</v-btn>
              </div>
            </div>
          </v-card>
        </v-row>
      </div>
    </div>
  </body>
</template>
<script>
import { sha256 } from 'js-sha256'
import { title } from 'process'
import Loading from '../components/ComLoad.vue'
export default {
  components: {
    Loading
  },
  data () {
    return {
      number: 90,
      username: '',
      password: '',
      loader: false,
      show: false,
      TextTitle: 'Login เข้าระบบ'
    }
  },
  methods: {
    count () {
      this.number = this.number + 1
    },
    login () {
      this.loader = true
      this.axios
        .get(
          `https://manageai.co.th/api/v1/admin/auth?username=${
            this.username
          }&password=${sha256(this.password)}`
        )
        .then((res) => {
          console.log(res.data)
          setTimeout(() => {
            this.loader = false
          }, 1000)
          this.$router.push({ name: 'home' })
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  }
}
</script>
<style scoped>
.view {
  color: aqua;
  text-align: center;
}
.classcenter {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 90px;
}
.cardlogin {
  position: relative;
  text-align: center; */
  font-weight: bold;
  font-family: Arial, sans-serif;
  height: 100vh;
}
</style>
