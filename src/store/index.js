import Vue from "vue";
import Vuex from "vuex";
import { sha256 } from "js-sha256";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    username: "",
    password: "",
  },
  // ดึงข้อมูลจาก state
  getters: {
    getusps(state) {
      let payload = {
        username: state.username,
        password: sha256(state.password),
      };
      return payload;
    },
  },
  // สร้างฟังชันอัพเดตค่า username เพราะเปลี่ยนตรงๆใน state ไม่ได้
  mutations: {
    updateuser(state, val) {
      state.username = val;
    },
    updatepass(state , val) {
      state.password = val;
    },
    updateloading(state , val) {
      state.loading = val;
    }
  },
  actions: {},
  modules: {},
});
