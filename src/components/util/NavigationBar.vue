<template>
<div>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="image"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="white--text h1">Jovi App</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense rounded nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.url" exact-active-class="black text--accent-4" class="hovereffect">
        <v-list-item-avatar>
          <v-img :src="item.icon" alt="Alt"/>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
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
      {title: 'Home', icon: require('@/assets/icons/home.png'), url: '/'},
      {title: 'CNN', icon: require('@/assets/icons/cnn.png'), url: '/cnn'},
      {title: 'RNN', icon: require('@/assets/icons/rnn.png'), url: '/rnn'},
      {title: 'Scales', icon: require('@/assets/icons/scales.png'), url: '/scale'},
      {title: 'IoT', icon: require('@/assets/icons/iot.png'), url: '/iot'},
    ],
    image: require("@/assets/icons/logo.png")
  }),
}
</script>

<style scoped>
  .hovereffect:hover{
    background: #424242;
  }

</style>