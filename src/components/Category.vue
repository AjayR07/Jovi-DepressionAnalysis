<template>
  <div>
    <v-container class="pa-4">
      <v-row  class="justify-center">
        <v-col v-for="card in cards" :key="card.id" cols="12" md="4">
          <v-card class="mx-auto" elevation="10" @click="(card.active)?$router.push(card.link):null" rounded>
            <div>
              <div v-show="!card.active" class="ribbon ribbon-top-right"><span>DEV</span></div>
              <v-img :src="card.imgurl" height="250" ></v-img>
              <v-card-text>
                <div class="text--secondary">{{card.header}}</div>
                <p class="display-2 text--primary">
                  {{card.title}}
                </p>
                <p class="text--secondary">{{card.desc}}</p>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Category",
  data: () => ({
    cards: [
      { id:0,header: 'Computer Vision', title: 'Analysis using CNN', desc:'By Processing Image in CNN Model',imgurl:require("@/assets/images/Face.jpg"), link:'/cnn', flex: 6,active:true },
      { id:1,header: 'Questionnaire', title: 'Analysis using Scales', desc:'By calculating the results of questions answered',imgurl:require("@/assets/images/Scales.png"),link:'/scale',flex: 6,active:true },
      { id:2,header: 'Natural Language Processing', title: 'Analysis using RNN', desc:'By computing emotion from Speech',imgurl:require("@/assets/images/NLP.png"),link:'/rnn',flex: 6,active:false },
      { id:3,header: 'IoT', title: 'Analysis using Sensors', desc:'By reading the sensor results ',imgurl:require("@/assets/images/IoT.jpg"),link:'/iot',flex: 6,active:false },
    ],
  }),
}
</script>

<style scoped>

  /* common */
.ribbon {
  width: 130px;
  height: 130px;
  overflow: hidden;
  position: absolute;
  z-index: 2;
}
.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: '';
  display: block;
  border: 5px solid #FF4500;
}
.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 15px 0;
  background-color: #EA4335;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #fff;
  font: 700 18px/1 'Lato', sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: uppercase;
  text-align: center;
}
.ribbon-top-left span {
  right: -25px;
  top: 30px;
  transform: rotate(-45deg);
}
/* top right*/
.ribbon-top-right {
  top: -10px;
  right: -10px;
}
.ribbon-top-right::before,
.ribbon-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
.ribbon-top-right::before {
  top: 0;
  left: 0;
}
.ribbon-top-right::after {
  bottom: 0;
  right: 0;
}
.ribbon-top-right span {
  left: -25px;
  top: 30px;
  transform: rotate(45deg);
}

</style>