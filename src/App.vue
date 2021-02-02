<template>
  <v-app>
    <AppBar>
      <router-view></router-view>
    </AppBar>
  </v-app>
</template>
<script>
// @ is an alias to /src

import AppBar from "@/views/Home";


export default {
  name: 'App',
  components: {
    AppBar,
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