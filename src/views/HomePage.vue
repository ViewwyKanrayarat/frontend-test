<template>
  <div>
    <!-- toolbar  -->
    <v-app-bar app clipped-left color="secondary" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="color: var(--v-HeadersText-base)">
        Welcome to I Love Anime
      </v-toolbar-title>
      <!-- theme bottom  -->
      <v-col class="mb-6">
        <v-switch
          color="var(--v-HeadersText-base)"
          class="themebtn"
          inset
          v-model="$vuetify.theme.dark"
          :label="$vuetify.theme.dark ? 'dark' : 'light'"
        ></v-switch>
      </v-col>
      <!-- logout bottom -->
      <div class="logout" v-if="$vuetify.breakpoint.width > 950">
        <v-btn
          color="primary"
          style="color: var(--v-textbtn-base)"
          small
          @click="logout"
        >
          Logout<v-icon x-small class="ml-1">mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <!-- nav bar -->
    <v-navigation-drawer clipped v-model="drawer" app color="secondary">
      <v-list nav dense>
        <!-- รายชื่อพนักงาน -->
        <v-list-item to="/home/page1">
          <v-list-item-icon>
            <v-icon color="var(--v-IconHeaders-base)">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color: var(--v-HeadersText-base)"
            >รายชื่อพนักงาน</v-list-item-title
          >
        </v-list-item>
        <!-- รายชื่ออนิเมะ -->
        <v-list-item to="/home/page2">
          <v-list-item-icon>
            <v-icon color="var(--v-IconHeaders-base)">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color: var(--v-HeadersText-base)"
            >รายชื่ออนิเมะ</v-list-item-title
          >
        </v-list-item>
        <!-- flie pic -->
        <v-list-item to="/home/page3">
          <v-list-item-icon>
            <v-icon color="var(--v-IconHeaders-base)">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title style="color: var(--v-HeadersText-base)"
            >flie pic</v-list-item-title
          >
        </v-list-item>
        <!-- ปุ่ม logout when dispaly < 950 -->
        <v-list v-if="$vuetify.breakpoint.width < 950">
          <v-btn
            color="primary"
            style="color: var(--v-textbtn-base)"
            small
            @click="logout"
          >
            Logout
          </v-btn>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view> </router-view>
    </v-main>
    <!-- footer -->
    <v-footer color="primary" app absolute padless inset>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          @click="footer(link)"
          color="textbtn"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col class="secondary py-4 text-center primary--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Manage Ai</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    };
  },
  methods: {
    logout() {
      this.$cookies.remove("token");
      this.$router.push({ name: "login" });

    },
    footer(link) {
      if (link == "Home") {
        if (this.$route.path !== "/home/page1") this.$router.push({ name: "page1" } );
      }
    },
  },
};
</script>

<style>
.logout {
  position: absolute;
  right: 0;
  width: 9%;
  align-items: right;
}

.themebtn {
  position: absolute;
  right: 0;
  width: 20%;
}
</style>
