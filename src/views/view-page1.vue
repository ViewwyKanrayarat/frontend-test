<template>
  <v-container>
    <v-card flat style="background-color: var(--v-backgroundColor-base)">
      <!-- title table -->
      <v-card-title class="py-16">
        <span class="textTablee animate__animated animate__fadeInRight"
          >รายชื่อพนักงานทั้งหมด</span
        >
        <v-spacer></v-spacer>
        <!-- ช่องค้นหา -->
        <v-text-field
          style="background-color: var(--v-primary-base)"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
          dense
          single-line
          hide-details
          class="text-white BtnLeft animate__animated animate__fadeInRight"
        ></v-text-field>
        <!-- bottom add data -->
        <div class="mb-4">
          <v-btn
            color="primary"
            style="color: var(--v-textbtn-base)"
            dark
            class="text-capitalize BtnLeft mt-13 animate__animated animate__fadeInRight"
            width="10%"
            @click="dialog = true"
          >
            <v-icon small class="mr-1">mdi-plus-circle-outline</v-icon>Add Data
          </v-btn>
        </div>
      </v-card-title>

      <!-- ตาราง -->
      <v-data-table
        :headers="headersTable"
        :items="username"
        :search="search"
        sort-by="username"
        class="DataTable RowPerPage mt-5 animate__animated animate__fadeInRight"
      >
        <!-- headerของตาราง -->
        <template v-slot:top>
          <v-container style="background-color: var(--v-backgroundColor-base)">
            <!-- create update data -->
            <v-dialog v-model="dialog" max-width="500px">
              <v-card color="var(--v-bg-base)">
                <v-card-title>
                  <span class="text-h5" style="color: var(--v-TextCard-base)">{{
                    formTitle
                  }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form ref="form">
                      <v-row>
                        <!-- form -->

                        <v-col
                          v-if="editedIndex === -1"
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            class="TextCardTable classline"
                            v-model="editedItem.username"
                            label="Username"
                            color="TextCardData"
                            :rules="nameRules"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          v-if="editedIndex === -1"
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            class="TextCardTable classline"
                            v-model="editedItem.password"
                            label="Password"
                            color="TextCardData"
                            :rules="nameRules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            class="TextCardTable classline"
                            v-model="editedItem.firstname"
                            label="Firstname"
                            color="TextCardData"
                            :rules="nameRules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            class="TextCardTable classline"
                            v-model="editedItem.lastname"
                            label="Lastname"
                            color="TextCardData"
                            :rules="nameRules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            class="TextCardTable classline"
                            v-model="editedItem.birthdate"
                            label="Birthdate"
                            color="TextCardData"
                            :rules="nameRules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            class="TextCardTable classline"
                            :items="states"
                            single-line
                            multiple
                            v-model="editedItem.programing_skill"
                            label="Programing_skill"
                            color="TextCardData"
                            :rules="rules"
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-container fluid>
                            <v-combobox
                              v-model="model"
                              :items="items"
                              :search-input.sync="searching"
                              hide-selected
                              hint="Maximum of 5 tags"
                              label="Add some tags"
                              multiple
                              persistent-hint
                              small-chips
                              color="primary"
                              :rules="rules"
                              class="TextClass TextCardTable classline"
                            >
                              <template v-slot:no-data>
                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      No results matching "<strong>{{
                                        search
                                      }}</strong
                                      >". Press <kbd>enter</kbd> to create a new
                                      one
                                    </v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-combobox>
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- delete data -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card color="var(--v-bg-base)">
                <v-card-title class="text-h5" color="#3d3838"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </template>
        <!-- headerของตาราง -->

        <!-- ปุ่มactions ของตาราง -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="textTable" small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="textTable" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <!-- ปุ่มactions ของตาราง -->
      </v-data-table>
      <!-- ตาราง -->
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    Image: "",
    files: null,
    items: ["Gaming", "Programming", "Vue", "Vuetify"],
    model: ["Vuetify"],
    searching: null,
    // ดักเมื่อข้อมูลเป็น null หรือ ""
    nameRules: [(v) => !!v || "Data is required"],
    // ดัก array
    rules: [(v) => v.length > 0 || "Data is required"],
    states: ["Python", "C++", "C#", "Java", "Html", "Php"],
    dialog: false,
    dialogDelete: false,
    search: "",
    headersTable: [
      {
        text: "Username",
        align: "start",
        sortable: false,
        value: "username",
      },
      { text: "Firstname", value: "firstname" },
      { text: "Lastname", value: "lastname" },
      { text: "Birthdate", value: "birthdate" },
      { text: "Programing_skill", value: "programing_skill" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    username: [],
    editedIndex: -1,
    editedItem: {
      userID: null,
      username: null,
      password: null,
      firstname: null,
      lastname: null,
      birthdate: null,
      programing_skill: [],
    },
    defaultItem: {
      userID: null,
      username: null,
      password: null,
      firstname: null,
      lastname: null,
      birthdate: null,
      programing_skill: [],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Data" : "Edit Data";
    },
  },

  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    },
    dialog(val) {
      if (!val) this.$refs.form.resetValidation();
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    // "editedItem.firstname"(val) {
    //   console.log(val);
    // }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      // ส่งข้อมูลในตาราง
      this.$store.commit("updateloading", true);
      setTimeout(() => {
        this.axios
          // frontส่งข้อมูลไปback
          .get(`http://localhost:3000/api/v1/data`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$cookies.get("token"),
            },
          })
          // backส่งข้อมูลกลับมา status code 200
          .then((res) => {
            this.username = res.data.data.data;
            this.$store.commit("updateloading", false);
          })
          // status code 400,500 error
          .catch((error) => {
            this.$store.commit("updateloading", false);
            if (
              error.response.data.data.data ==
              "Username token must be of admin "
            ) {
              alert("คุณไม่ใช่แอดมิน");
            } else {
              alert("error initialize");
            }
          });
      }, 200);
    },
    created() {
      let payload = {
        username: this.editedItem.username,
        password: this.editedItem.password,
        firstname: this.editedItem.firstname,
        lastname: this.editedItem.lastname,
        birthdate: this.editedItem.birthdate,
        programing_skill: this.editedItem.programing_skill,
      };
      // create data
      this.$store.commit("updateloading", true);
      this.axios
        // frontส่งข้อมูลไปback
        .post(`http://localhost:3000/api/v1/data`, payload, {
          headers: {
            "Content-Type": "application/json",
            // ดึงค่าจากคุกกี้ในเว็บ ใช้ get
            Authorization: this.$cookies.get("token"),
          },
        })
        // backส่งข้อมูลกลับมา status code 200
        .then(() => {
          this.initialize();
        })
        // status code 400,500 error
        .catch((error) => {
          this.$store.commit("updateloading", false);
          if (error.response.data.data.data == "username not ready") {
            alert("username นี้ถูกใช้ไปแล้ว");
          } else {
            alert("error create");
          }
        });
    },
    updatedata() {
      let payload = {
        firstname: this.editedItem.firstname,
        lastname: this.editedItem.lastname,
        birthdate: this.editedItem.birthdate,
        programing_skill: this.editedItem.programing_skill,
      };
      this.$store.commit("updateloading", true);
      this.axios
        .put(
          `http://localhost:3000/api/v1/data/${this.editedItem.userID}`,
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
          this.initialize();
        })
        .catch(() => {
          this.$store.commit("updateloading", false);
          alert("error updatedata");
        });
    },
    delete() {
      // ส่งข้อมูลในตาราง
      this.$store.commit("updateloading", true);
      this.axios
        // frontส่งข้อมูลไปback
        .delete(
          `http://localhost:3000/api/v1/data/${this.editedItem.userID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: this.$cookies.get("token"),
            },
          }
        )
        // backส่งข้อมูลกลับมา status code 200
        .then(() => {
          this.initialize();
        })
        // status code 400,500 error
        .catch(() => {
          this.$store.commit("updateloading", false);
          alert("error delete");
        });
    },
    editItem(item) {
      this.editedIndex = this.username.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // กดปุ่มdelete
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    // กดconfirm delete
    deleteItemConfirm() {
      this.closeDelete();
      this.delete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (!this.$refs.form.validate()) return;
      if (this.editedIndex > -1) {
        Object.assign(this.username[this.editedIndex], this.editedItem);
        this.updatedata();
      } else {
        this.username.push(this.editedItem);
        this.created();
      }
      this.close();
    },
  },
};
</script>

<style>
/* เจาะข้อความ */
.textTablee {
  color: #868080;
  position: absolute;
  left: 0;
}
/* ช่องค้นหา */
.text-white input {
  color: var(--v-textbtn-base) !important;
}
/* ช่องค้นหา */
.text-white .v-input__slot {
  color: var(--v-border-base);
}
/* ช่องค้นหา */
.text-white label {
  color: var(--v-textbtn-base) !important;
}
/* ช่องค้นหา */
.text-white .mdi-magnify::before {
  color: var(--v-textbtn-base) !important;
}
/* เจาะในtable */
.DataTable td {
  color: #868080;
  background: var(--v-backgroundColor-base);
}
/* เจาะในtable */
.DataTable th {
  color: #868080 !important;
  background: var(--v-backgroundColor-base);
}
/* เจาะในtable */
.DataTable .v-data-footer {
  color: #868080;
  background: var(--v-backgroundColor-base);
}
/* row per page */
.RowPerPage .v-select__selection {
  color: #868080;
}

/* เจาะข้อความที่โชว์ในการ์ดAdd Data ก่อนกรอก */
.TextCardTable .v-label {
  color: #3d3838;
}

/* เจาะเส้นช่องกรอกข้อมูล */
.classline.v-text-field .v-input__control .v-input__slot:before {
  border-color: #252b67 !important;
}

/* เจาะข้อความ checkbox */
.TextCardTable,
.v-list-item .v-list-item__title {
  color: #3d3838;
}
/* เจาะcheckbox */
.mdi-checkbox-marked::before {
  color: #252b67;
}
.mdi-checkbox-blank-outline::before {
  color: #252b67;
}
/* drop down */
.mdi-menu-down::before {
  color: #252b67;
}

.BtnLeft {
  position: absolute;
  right: 0;
  width: 35%;
}

.v-application--is-ltr .v-text-field .v-label {
  color: #3d3838;
}

.v-messages__message {
  color: #3d3838;
}
</style>

<style scoped>
/* เจาะbackground checkbox */
.v-sheet.v-list:not(.v-sheet--outlined) {
  background-color: var(--v-bg-base);
}
</style>
