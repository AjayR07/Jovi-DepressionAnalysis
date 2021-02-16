<template>
  <v-col>
    <v-sheet elevation="10" rounded="xl">
      <v-sheet class="pa-3 primary text-center" dark rounded="t-xl">
        <v-row>
          <v-col align="left" class="pl-5" cols="12" sm="5" md="8">
            <p style="font-size: 28px">Select a Scale</p>
          </v-col>
          <v-col cols="6" md="4">
            <v-text-field
              dense
              outlined
              label="Search"
              prepend-inner-icon="mdi-file-find"
              v-model="searchvalue"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-sheet>

      <div class="pa-5">
        <v-chip-group column v-model="selected" active-class="primary--text">
          <div v-for="tag in data" :key="tag['id']">
            <v-chip
              v-if="
                tag['name'].toUpperCase().includes(searchvalue.toUpperCase())
              "
            >
              <p style="font-size: 125%">{{ tag["name"] }}</p></v-chip
            >
          </div>
        </v-chip-group>
      </div>

      <v-sheet
        class="pa-3 primary text-center"
        @click="Continue()"
        v-if="selected || selected == 0"
        dark
        rounded="b-xl"
      >
        <v-btn

            outlined
            elevation="2"
        >Continue</v-btn>
      </v-sheet>
    </v-sheet>
  </v-col>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    selected: null,
    isSelect: false,
    temp: "",
    data: "",
    searchvalue: "",
    count: 0,
  }),
  methods: {
    Continue: function () {
      console.log(this.data[this.selected]["id"]);
      this.$router.push({
        name: "Scales",
        params: { scaleid:'5' },
      });
    },
  },
  mounted() {
    axios.get(`https://node.teama3.tech/jovi/scales`).then((response) => {
      this.data = response.data;
    });
  },
};
</script>

<style scoped></style>
