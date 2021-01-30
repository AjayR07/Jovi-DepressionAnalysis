<template>
  <div>
    <Message>
      <strong>Results:</strong> Total <strong>{{ this.total }}</strong>
      {{ this.total > 1 ? 'people' : 'person' }} detected,
      <strong>
        {{ this.happy }}{{'  '}} {{ this.fmt(this.happy / this.total, 0)}}
      </strong>
      {{ this.happy === 1 ? 'is' : 'are' }} happy.
    </Message>
    <div>
      <div class="flex flex-wrap mxn1 mt1">
        <div v-for="(face,i) in faces" :key="i">
        <!-- <div class="col col-4 sm-col-3 md-col-5th px1">
          <div class="mb1 border border-silver rounded overflow-hidden"> -->
            <img
                :src="face.toDataURL()"
    
                class="block col-12"
            />
            <div class="p05 fs-tiny">
              <div v-for="({ label, value },i) in emotions[i].slice(0, 2)" :key="i">
              <div class="flex justify-between">
                <div class="mr05 truncate">
                  {{ label.emoji }}
                  {{ label.name }}
                </div>
                <div class="bold">{{ fmt(value) }}</div>
              </div>
              </div>
            </div>
          <!-- </div>
        </div> -->
        </div>
      </div>
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
  mounted(){

      console.log(this.faces);
      console.log(this.emotions);

      this.total=this.faces.length;
      this.happy=this.emotions.filter(r => r[0].label.emoji === '😄').length

      console.log(this.total);
      console.log(this.happy);
    
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