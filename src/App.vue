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
<style>
/* Refers the whole setup */
::-webkit-scrollbar {
  width: 11px;
  border-radius: 13px;
}

/* Refers tracking path */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 13px;
  opacity: 1.0;
  /* background-color: #F5F5F5; */
}

/* Refers Draggable Bar */
::-webkit-scrollbar-thumb {
  border-radius: 13px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);

  background-color: #555;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ef8376;
}
</style>