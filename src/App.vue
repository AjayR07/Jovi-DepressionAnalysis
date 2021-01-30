<template>
  <div id="app">
    <EmotionDetect></EmotionDetect>
  </div>

</template>
<script>
// @ is an alias to /src
import EmotionDetect from '@/views/EmotionDetect';

export default {
  name: 'App',
  components: {
    EmotionDetect
  },
  data: ()=>({

  })
}
</script>