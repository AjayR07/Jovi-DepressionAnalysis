<template>
  <div>
<!--    <v-app-bar absolute color="#43a047" dark shrink-on-scroll prominent src="https://picsum.photos/1920/1080?random" fade-img-on-scroll scroll-target="#scrolling-techniques" scroll-threshold="500">-->
    <v-app-bar color="#43a047" dark   src="https://picsum.photos/1920/1080?random" dense>
<!--      Prominent will make it bigger-->
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Depression Analysis</v-app-bar-title>
<!--      <v-toolbar-title>Emotion Detection</v-toolbar-title>-->
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <NavigationBar :drawer="this.drawer"/>

  </div>
</template>
<script>
import NavigationBar from "@/components/util/NavigationBar";
export default {
  name: "AppBar",
  components: {NavigationBar},
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
      bg: require("@/assets/images/background.jpg"),
    }
  },
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
body{
  font-family: 'Open Sans', sans-serif;
}
</style>