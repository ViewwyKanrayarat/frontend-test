<template>
  <!-- card -->
  <div class="d-flex justify-center align-center bgcolor">
    <!-- dialog add anime  -->
    <v-dialog v-model="dialogAddAnime" max-width="500px">
      <v-card color="var(--v-bg-base)">
        <v-card-title class="text-h5 d-flex justify-center align-center" color="#3d3838"
          >Are you sure you want to add anime?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogAddAnime = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="createAnime()">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container class="classcenter">
      <v-row>
        <!-- add anime bottom -->
        <v-col cols="12">
          <v-btn
            @click="dialogAddForm = true"
            color="primary"
            style="color: var(--v-textbtn-base)"
            class="animate__animated animate__fadeInLeft"
            ><v-icon small class="mr-1">mdi-plus-circle-outline</v-icon> Add
            Anime</v-btn
          >
          <v-btn
            class="mx-2 animate__animated animate__fadeInLeft"
            color="primary"
            style="color: var(--v-textbtn-base)"
            @click="deleteSelected = true"
            v-if="!deleteSelected"
            ><v-icon small>mdi-delete</v-icon>Delete Anime</v-btn
          >
          <!-- v-if show == true -->
          <v-btn
            class="mx-2"
            color="red"
            style="color: var(--v-textbtn-base)"
            @click="deleteSelected = false"
            v-if="deleteSelected && selected.length == 0"
            ><v-icon>mdi-arrow-left-thin</v-icon>back</v-btn
          >
          <v-btn
            class="mx-2"
            color="red"
            style="color: var(--v-textbtn-base)"
            v-if="selected.length"
            @click="deleteSure()"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </v-col>
        <!-- การ์ดอนิเมะทั้งหมด -->
        <v-col
          :cols="$vuetify.breakpoint.width < 840 ? '12' : '6'"
          v-for="(item, i) in items1.slice(value * (page - 1), value * page)"

          :key="i"
          :class="[ChangePage ? 'animate__animated animate__fadeInLeft' : 'animate__animated animate__fadeOutRight']"
        >
          <!-- check box -->
          <v-checkbox
            v-if="deleteSelected"
            v-model="selected"
            :value="item.anime_ID"
          ></v-checkbox>
          <v-card color="CardPage2" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                No:{{i}}
                <v-card-title
                  class="d-inline-block text-h5 mb-3"
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.title_th"></v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    @click="video1(item.trailer)"
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    Click for Trailer
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <!-- pagination -->
        <v-col cols="12" class="d-flex justify-center" >
          <v-pagination
            color="var(--v-TextCardData-base)"
            light
            v-model="page"
            :length="Math.ceil(items1.length / value)"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </v-col>
        <!-- การ์ดอนิเมะทั้งหมด -->
      </v-row>
    </v-container>
    <!-- dialog กรอกข้อมูล -->
    <v-dialog v-model="dialogAddForm" max-width="500px">
      <v-card color="var(--v-bg-base)">
        <v-card-title>
          <span class="text-h5" style="color: var(--v-TextCard-base)">
            Add Data</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <!-- form -->
                <v-col cols="6">
                  <v-text-field
                    class="TextCardTable classline"
                    label="img"
                    v-model="formAddData.src"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    class="TextCardTable classline"
                    label="Anime name"
                    v-model="formAddData.title"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    class="TextCardTable classline"
                    label="title_th"
                    v-model="formAddData.title_th"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    class="TextCardTable classline"
                    label="link trailer"
                    v-model="formAddData.trailer"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="colsedialogAnime()">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="openDialogSave">
            Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    ChangePage: true,
    deleteSelected: false,
    selected: [],
    value: 10,
    page: 1,
    dialog: false,
    nameRules: [(v) => !!v || "Data is required"],
    items1: [],
    dialogAddAnime: false,
    dialogAddForm: false,
    formAddData: {
      color: "CardPage2",
      src: "",
      title: "",
      title_th: "",
      trailer: "",
    },
  }),
  created() {
    this.getanime();
  },
  methods: {
    video1(val) {
      window.open(val);
    },
    // ตอนม็อค
    // createAnime() {
    //   let val = { ...this.formAddData };
    //   this.items1.push(val);
    //   this.dialogAddAnime = false;
    //   this.dialogAddForm = false;
    //   this.$refs.form.reset();
    // },
    colsedialogAnime() {
      this.$refs.form.reset();
      this.dialogAddForm = false;
    },
    openDialogSave() {
      if (!this.$refs.form.validate()) return;
      this.dialogAddAnime = true;
    },
    // // ตอนม็อค
    // deleteSure() {
    //   this.items1 = this.items1.filter(
    //     (val) => !this.selected.includes(val.anime_id)
    //     // val.anime_id in selected
    //   );
    //   this.selected=[];
    // },
    getanime() {
      this.$store.commit("updateloading", true);
      this.axios
        // frontส่งข้อมูลไปback
        .get(
          `http://203.151.199.181:2525/api/v1/anime`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$cookies.get("token"),
            },
          }
        )
        // backส่งข้อมูลกลับมา status code 200
        .then((res) => {
          this.items1 = res.data.data.data;
          this.$store.commit("updateloading", false);
        })
        // status code 400,500 error
        .catch(() => {
          this.$store.commit("updateloading", false);
        });
    },
    createAnime() {
      let payload = {
        src: this.formAddData.src,
        title: this.formAddData.title,
        title_th: this.formAddData.title_th,
        trailer: this.formAddData.trailer,
      };
      // create data
      this.$store.commit("updateloading", true);
      this.axios
        // frontส่งข้อมูลไปback
        .post(
          `http://203.151.199.181:2525/api/v1/anime`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$cookies.get("token"),
            },
          }
        )
        // backส่งข้อมูลกลับมา status code 200
        .then(() => {
          this.getanime();
          this.dialogAddAnime = false;
          this.dialogAddForm = false;
          this.$refs.form.reset();
        })
        // status code 400,500 error
        .catch(() => {
          this.$store.commit("updateloading", false);
        });
    },
    async deleteSure() {
      this.$store.commit("updateloading", true);
      let deleteVal = this.selected.map(async(anime_ID) => {
        await this.axios
        // frontส่งข้อมูลไปback
        .delete(
          `http://203.151.199.181:2525/api/v1/anime/${anime_ID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$cookies.get("token"),
            },
          }
        )
        // status code 400,500 error
        .catch(() => {
          this.$store.commit("updateloading", false);
        });
      })
      // ใส่ await เพื่อรอวนลูป
      await Promise.all(deleteVal)
      this.getanime();
      this.selected = []
      this.deleteSelected = false
    },
  },
  watch: {
    selected() {
    },
    page() {
      this.ChangePage = false;
      this.selected = [];
      this.ChangePage = true;
    },
  },
};
</script>

<style>
.classcenter {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bgcolor .v-card {
  background-color: var(--v-bg-base);
}

.TextCardTable .v-label {
  color: #3d3838;
}

/* เจาะเส้นช่องกรอกข้อมูล */
.classline.v-text-field .v-input__control .v-input__slot:before {
  border-color: #252b67 !important;
}


</style>
