<template>
<div>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="image"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title><b>Jovi App</b></v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link @click="$router.push({name: item.url})">
        <v-list-item-avatar>
          <v-img :src="item.icon" alt="Alt"/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
</div>
</template>

<script>
export default {
  name: "NavigationBar",
  data: () => ({
    items: [
      {title: 'Home', icon: require('@/assets/icons/home.png'), url: 'Home'},
      {title: 'CNN', icon: require('@/assets/icons/cnn.png'), url: 'CNN'},
      {title: 'RNN', icon: require('@/assets/icons/rnn.png'), url: 'RNN'},
      {title: 'Scales', icon: require('@/assets/icons/scales.png'), url: 'Scales'},
      {title: 'IoT', icon: require('@/assets/icons/iot.png'), url: 'IoT'},
    ],
    image: require("@/assets/icons/logo.png")
  }),
}
</script>

<style scoped>

</style>