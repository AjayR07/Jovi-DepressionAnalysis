<template>
  <div>
    <Message>
      <strong>Results:</strong> Of <strong>{{ this.total }}</strong>
      {{ total > 1 ? 'people' : 'person' }} detected,
      <strong>
        {{ happy }} {{ this.fmt(happy / total, 0)}}
      </strong>{' '}
      {{ happy === 1 ? 'is' : 'are' }} happy.
    </Message>
    <div>
      <div class="flex flex-wrap mxn1 mt1">
        <div v-for="(face,i) in faces" :key="i">
        <div :key="i" class="col col-4 sm-col-3 md-col-5th px1">
          <div class="mb1 border border-silver rounded overflow-hidden">
            <img
                :src=face.toDataURL()
                alt="face {{i}}"
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
          </div>
        </div>
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
  props:['total','happy','faces','emotions'],
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