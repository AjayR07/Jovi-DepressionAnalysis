<template>
  <!--  <v-flex>-->

  <v-card v-if="ques != null" class="elevation-10">
    <v-progress-linear
      color="secondary"
      height="5"
      :value="getcurrentper"
    ></v-progress-linear>
    <v-card-subtitle>
      <b>{{ this.ques["name"] }}</b>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-window v-show="!isResult" v-model="currentque">
      <v-window-item v-for="(n, i) in ques['questions']" :key="i">
        <div align="center" style="color: black">
          <h2 class="ma-auto pb-5">{{ n["question"] }}</h2>
        </div>

        <v-container>
          <v-row dense>
            <v-col
              align="center"
              class="pa-2"
              v-for="(option, i) in n['options']"
              :key="i"
              cols="12"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  rounded="xl"
                  width="80%"
                  outlined
                  :elevation="hover ? 1 : 0"
                  :class="{ 'on-hover': hover }"
                  :color="
                    selected[currentque] === option ? 'primary' : '#ededed'
                  "
                  @click="choose(option)"
                >
                  <v-card-text
                    class="pa-2 pl-5"
                    :style="
                      selected[currentque] === option
                        ? 'color:#ffffff'
                        : 'color:black'
                    "
                  >
                    <!--                    <div>{{ n }}</div>-->
                    <div>{{ getKeyByValue(n["options"], option) }}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
    <!--  Result card-->
    <div v-show="isResult">
      <v-card class="mx-auto mb-15" :color="this.resultcolor==''?'white':'resultcolor'" max-width="550" elevation="10" >
        <v-card-title>
          <h2 class="display-1">Points <b>84</b></h2>
        </v-card-title>


          <h2 class="pl-5 text-sm-h5"  v-for="(i, key) in ques['result']" :key="key">
                                <div v-if="i != null">
                                  <div v-if="points >= i['from'] && points <= i['to']">
                                    Depression Level : <b>   {{ i["status"] }}</b>
                                  </div>
                                </div>
                              </h2>


        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-btn block class="white--text" color="deep-purple accent-4" @click="Resubmit()">
            Retry
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <!--    Result card end-->
    <v-divider></v-divider>
    <v-card-actions v-show="!isResult">
      <v-row>
        <v-col>
          <v-fab-transition>
            <v-btn
              @click="isResult ? Resubmit() : prev()"
              color="primary"
              class="ma-2 white--text"
              :disabled="currentque == 0"
              depressed
              fab
            >
              <v-icon v-if="isResult">mdi-undo-variant</v-icon>
              <v-icon v-else>mdi-arrow-left</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-col>

        <v-spacer></v-spacer>

        <v-col align="right">
          <v-fab-transition>
            <v-btn
              v-if="ques['total_count'] == currentque + 1 && !isResult"
              color="green"
              class="ma-2 white--text"
              @click="submit()"
              depressed
            >
              Submit
              <v-icon>mdi-check-circle-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="!isResult"
              color="primary"
              class="ma-2 white--text"
              @click="submit()"
              depressed
              fab
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
  <!--  </v-flex>-->
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    isResult: false,
    selected: {},
    points: 0,
    currentque: 0,
    ques: {},
    resultcolor:''
  }),
  computed: {
    questionslength() {
      return this.ques["total_count"];
    },
    addcurrentques() {
      return this.currentque + 1;
    },
    getcurrentper() {
      return (this.addcurrentques / this.questionslength) * 100;
    },
  },

  methods: {
    getKeyByValue: function (object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    },
    choose: function (index) {
      this.selected[this.currentque] = index;
      this.points += index;
      console.log(index);
      console.log(this.points);
    },
    next: function () {
      if (this.currentque < this.questionslength - 1) {
        this.currentque++;
      }
    },
    prev: function () {
      if (this.currentque >= 1) {
        this.currentque--;
      }
    },

    submit: function () {
      this.isResult = true;
    },
    Resubmit: function () {
      this.isResult = false;
      this.currentque = 0;
      this.selected = {};
      this.points = 0;
    },
  },
  beforeMount() {
    if (this.$route.params.scaleid == undefined) {
      this.$router.push({
        name: "ScaleMaster",
      });
    } else {
      axios
        .get(
          `https://node.teama3.tech/jovi/questions/` +
            this.$route.params.scaleid
        )
        .then((response) => {
          this.ques = response.data[0];
        });
    }
  },
};
</script>

<style scoped></style>
