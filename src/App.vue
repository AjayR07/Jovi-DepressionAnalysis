<template>
  <v-app>
    <v-app-bar color="#43a047" dark   src="https://picsum.photos/1920/1080?random" dense>
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Depression Analysis</v-app-bar-title>
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

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <NavigationBar/>
    </v-navigation-drawer>

    <v-parallax dark :src="bg" height="100%">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-parallax>

    <Footer/>

  </v-app>
</template>
<script>
// @ is an alias to /src

import AppBar from "@/views/Home";
import Footer from "@/components/util/Footer";
import NavigationBar from "@/components/util/NavigationBar";

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AppBar,Footer,NavigationBar
  },
  data: ()=>({
    drawer: false,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard' },
      { title: 'About', icon: 'mdi-forum' },
    ],
    bg: require("@/assets/images/background.jpg"),
    methods:{

    }
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