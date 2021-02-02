<template>
  <div class="mx-auto" style="width:80%">
    <Message >
      <strong>Results:</strong> Total <strong>{{ this.total }}</strong>
      {{ this.total > 1 ? 'people' : 'person' }} detected,
      Out of them
      <strong>
        {{ this.happy }}{{'  '}} {{ this.total > 1 ? 'people' : 'person' }} {{'  ('}}{{ this.fmt(this.happy / this.total, 0)}})
      </strong>
      {{ this.happy === 1 ? 'is' : 'are' }} happy.
    </Message>
    <div>
      <v-row>
        <v-col v-for="(face,i) in faces" :key="i" cols="4" class="d-flex child-flex">
        <!-- <div class="col col-4 sm-col-3 md-col-5th px1">
          <div class="mb1 border border-silver rounded overflow-hidden"> -->
          <v-card>
            <v-img :src="face.toDataURL()" aspect-ratio="1" class="block col-12"></v-img>
            <div class="p05 fs-tiny">
              <div v-for="({ label, value },i) in emotions[i].slice(0, 2)" :key="i">
              <div class="flex justify-between ma-2">
                <div class="mr05 truncate">
                  {{ label.emoji }}

                  {{ label.name }}
                </div>
                <div class="bold">{{ fmt(value) }}</div>
              </div>
              </div>
            </div>
          </v-card>
          <!-- </div>
        </div> -->
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { format } from 'd3-format'

import Message from './Message'

export default {
  name: "Results",
  components:{
    Message
  },
  data:()=>({
    total:0.0,
    happy:0.0
  }),
  props:['faces','emotions'],
  created(){

      this.total=this.faces.length;
      console.log(this.total);
      this.happy=this.emotions.filter(r => r[0].label.emoji === '😄').length
  },
  methods:{
    fmt(x,digits=1)
    {
      return format(`.${digits}%`)(x)
    }
  }
}
</script>

<style scoped>

</style>