<template>
  <v-app>


    <v-app-bar color="#6A76AB" dark shrink-on-scroll  src="https://source.unsplash.com/random/?nature,water" dense>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
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

    <offline @detected-condition="handleConnectivityChange"></offline>
    <v-banner single-line v-show="!online" class="text-center" :app="true" color="white">
      <v-icon slot="icon" color="warning" size="36" class="mx-auto">mdi-wifi-strength-alert-outline</v-icon>
      <span class="h3">Unable to verify your Internet connection</span>
    </v-banner>

    <v-navigation-drawer v-model="drawer" absolute temporary class="deep-purple accent-4">
      <NavigationBar/>
    </v-navigation-drawer>


    <v-container>
      <transition name="zoom">
      <router-view></router-view>
      </transition>
    </v-container>
    <Footer/>

  </v-app>
</template>
<script>
// @ is an alias to /src

import AppBar from "@/views/Home";
import Footer from "@/components/util/Footer";
import NavigationBar from "@/components/util/NavigationBar";
import offline from 'v-offline';

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AppBar,Footer,NavigationBar, offline
  },
  data: ()=>({
    drawer: false,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard' },
      { title: 'About', icon: 'mdi-forum' },
    ],

    online: true,
  }),
  methods:{
    updateOnlineStatus: function(){
        this.online = navigator.onLine;
        console.log(navigator.onLine)
    },
    handleConnectivityChange: function(status){
      this.online=status;
    }
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }
}
</script>
<style>

.slither-enter-active, .slither-leave-active {
  transition: transform 1s;
}

.slither-enter, .slither-leave-to {
  transform: translateY(-100%);
}

.slither-enter-to, .slither-leave {
  transform: translateY(0);
}


.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}

/* Refers the whole setup */
::-webkit-scrollbar
{
  width: 10px;
  background-color: #F5F5F5;
}

/* Refers tracking path */
::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}

/* Refers Draggable Bar */
::-webkit-scrollbar-thumb
{
  background-color: #555555;
  border: 2px solid #555555;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #434A54;
}
</style>