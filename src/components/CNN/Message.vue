<template>
  <v-alert
      border="top"
      colored-border
      type="info"
      elevation="2"
  >
    <slot></slot>
  </v-alert>
</template>

<script>
export default {
  name: "Message",
}
</script>

<style scoped>

</style>