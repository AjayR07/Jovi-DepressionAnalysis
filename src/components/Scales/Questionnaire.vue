<template>

<!--  <v-flex>-->
    <v-card round class="elevation-10" >

      <v-card-title >
        <v-col align="center"> Hamilton Depression Rating Scale (HDRS) </v-col>
        </v-card-title>
      <v-divider class="xl"></v-divider>
      <v-progress-linear
          v-model="getcurrentper"
          height="25"
      >
        <strong>{{ Math.ceil(getcurrentper) }}%</strong>
      </v-progress-linear>

      <v-window

          v-model="currentque"
         >
        <v-window-item   v-for="(n,i) in ques"
                         :key="i">

     <div align="center"> <h2 style="">{{n.question}}</h2></div>
      <v-container>
        <v-row dense>

          <v-col
              v-for="(option,i) in ques[currentque].options"
              :key="i"
              cols="12"
          >

            <v-hover v-slot="{ hover }">
              <v-card rounded="xl" height="50px"
                  :elevation="hover ? 7 : 2"
                  :class="{ 'on-hover': hover }"
                  :color="ques[currentque].selected == i ? '#7eb5fc':'white'"
                  @click="choose(i)"

              >
              <v-card-title :style="ques[currentque].selected == i ? 'color:#ffffff':'color:black'">
                {{option["opt"]}}
              </v-card-title>

               </v-card>
              </v-hover>
           </v-col>
          </v-row>
         </v-container>

        </v-window-item>
        </v-window>

      <v-card-actions>
        <v-row>
          <v-col >
            <v-btn
                @click="prev()"
                color="green"
                class="ma-2 white--text"
                :disabled="currentque==0"
            >
              <v-icon>
                mdi-arrow-left
              </v-icon>
              Previous

            </v-btn>
          </v-col>

          <v-spacer></v-spacer>

          <v-col align="right">
            <v-btn
                color="green"
                class="ma-2 white--text"
                @click="next()" :disabled="ques[currentque].selected=='null'"
            >

              Next
              <v-icon>
                mdi-arrow-right
              </v-icon>

            </v-btn>
          </v-col>
        </v-row>


      </v-card-actions>
    </v-card>
<!--  </v-flex>-->
</template>

<script>
export default {
  data: () => ({
    ques:[
      {
        question:"Depressed mood Gloomy attitude, pessimism about the future, feeling of sadness, tendency to weep",
        options:[

          {opt:"absence"},
          {opt: "Sadness"},
          {opt: "Occasional weeping"},
          {opt: "Extreme symptoms"},
          {opt: "Frequent weeping"},

        ],
        selected:"null",
      },
      {
        question:"i  mood Gloomy attitude, pessimism about the future, feeling of sadness, tendency to weep",
        options:[

          {opt:"e"},
          {opt: "e"},
          {opt: "e weeping"},
          {opt: "Extreme symptoms"},
          {opt: "Frequent weeping"},

        ],
        selected:"null",
      }
    ],
    currentque:0,


  }),
  computed: {

    questionslength(){
      return this.ques.length;
    },
    getcurrentper()
    {
      return (this.currentque/this.questionslength)*100;
    }

  },

  methods: {

      choose:function (index)
      {
            this.ques[this.currentque].selected=index;
            // console.log(index);
            console.log(this.ques[this.currentque].selected)
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
      }
  }
}

</script>

<style scoped>

.optionscss
{
 border-radius: 15px;
}
</style>
