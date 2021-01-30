<template>
  <v-app>
    <AppBar>
<!--      <camera-shutter></camera-shutter>-->
      <Emotion></Emotion>
    </AppBar>
<!--    <EmotionDetect></EmotionDetect>-->

  </v-app>

</template>
<script>
// @ is an alias to /src

import EmotionDetect from '@/views/EmotionDetect';
import Emotion from '@/views/Emotion';
import AppBar from '@/components/util/AppBar';
import CameraShutter from "@/components/CameraShutter";

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CameraShutter,EmotionDetect,AppBar, Emotion
  },
  data: ()=>({

  })
}
</script>