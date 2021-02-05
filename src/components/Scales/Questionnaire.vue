<template>

<!--  <v-flex>-->

    <v-card round class="elevation-10">
      <v-progress-linear
          color="blue"
          height="10"
          :value=getcurrentper

      ></v-progress-linear>
      <v-card-title >
        <v-col align="center"><h1 class="pa-auto" >Hamilton Depression Rating Scale (HDRS) </h1></v-col>
        </v-card-title>
      <v-divider class="xl"></v-divider>

      <v-window v-show="!isResult"

          v-model="currentque"
         >
        <v-window-item   v-for="(n,i) in ques"
                    :key="i">

     <div align="center"> <h2 class="ma-auto pb-5" >{{n['question']}}</h2></div>
      <v-container>
        <v-row dense>

          <v-col align="center"
              v-for="(option,i) in n['options']"
              :key="i"
              cols="12"
          >

            <v-hover v-slot="{ hover }">
              <v-card rounded="xl"  width="90%"
                  :elevation="hover ? 5 : 2"
                  :class="{ 'on-hover': hover }"
                  :color="selected[currentque] == option ? '#7eb5fc':'#ededed'"
                  @click="choose(option)"
              >
              <v-card-title  class="pa-2 pl-5"  :style="selected[currentque] == option? 'color:#ffffff':'color:black'">
               <div > {{getKeyByValue(n['options'],option)}}</div>
              </v-card-title>

               </v-card>
              </v-hover>
           </v-col>
          </v-row>
         </v-container>

        </v-window-item>
        </v-window>

        <div v-show="isResult" >

            <v-card color="blue" class="pa-10 ma-10" >
              <v-row >

                <v-col
                    cols="6"
                    md="4"
                >
                  <v-card>

                    <v-card-title>
                     <v-col align="center"> <h2>Points Scored : {{this.points}}</h2></v-col>
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="8"
                >

                    <v-card>

                      <v-card-title>
                        <v-col align="center"><h2>Drepression Level : Moderate</h2></v-col>
                      </v-card-title>
                    </v-card>

                </v-col>

              </v-row>

            </v-card>

        </div>

      <v-card-actions>
        <v-row>
          <v-col >


            <v-fab-transition>
              <v-btn
                  @click="isResult?Resubmit():prev()"
                  color="green"
                  class="ma-2 white--text"
                  :disabled="currentque==0"
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
              <v-btn v-if="ques[currentque+2]==null"
                  color="green"
                  class="ma-2 white--text"
                  @click="submit()"
                  depressed

              >
                Submit
                <v-icon>mdi-check-circle-outline</v-icon>

              </v-btn>
              <v-btn v-else
                     color="green"
                     class="ma-2 white--text"
                     @click="next()"
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
export default {
  data: () => ({
    isResult: false,
    selected:{},
    points:0,
    currentque:0,
    ques: {
      "1": {
        "qno": 1,
        "question": "Depressed Mood [Sadness, hopeless, helpless, worthless]",
        "options": {
          "Absent": 0,
          "These feeling states indicated only on questioning": 1,
          "These feeling states spontaneously reported verbally": 2,
          "Communicates feeling states nonverbally-ie, through facial expression, posture, voice, and tendency": 3,
          "Patient reports VIRTUALLY ONLY these feeling states in his spontaneous verbal and nonverbal communi": 4
        }
      },
      "2": {
        "qno": 2,
        "question": "Feeling of Guilt",
        "options": {
          "Absent": 0,
          "Self-reproach, feels he has let people down": 1,
          "Ideas of guilt or rumination over past errors or sinful deeds": 2,
          "Present illness is a punishment/u002e Delusions of guilt": 3,
          "Hears accusatory or denunciatory voices and/or experiences threatening visual hallucinations": 4
        }
      },
  },




  }),
  computed: {

    questionslength(){
      return Object.keys(this.ques).length;
    },
    getcurrentper()
    {
      return (this.currentque+1/this.questionslength)*100;
    }

  },

  methods: {

      getKeyByValue:function(object, value){
        return Object.keys(object).find(key => object[key] === value);
      },
      choose:function (index)
      {
            // this.ques[this.currentque].selected=index;
            // console.log(this.ques[index]['options'][index1])
            this.selected[this.currentque]=index;
            this.points+=index;
            // console.log(this.selected);
            // console.log(this.selected)
      },
      next:function ()
      {

        if(this.currentque < this.questionslength-1)
        {

          this.currentque++;
        }

      },
      prev:function ()
      {

        if(this.currentque >= 1 )
        {

          this.currentque--;
        }
      },

    submit:function ()
    {
      this.isResult=true;
    },
    Resubmit:function ()
    {
      this.isResult=false;
      this.currentque=0;
      this.selected={};
      this.points=0;
    }

  }
}

</script>

<style scoped>

</style>
