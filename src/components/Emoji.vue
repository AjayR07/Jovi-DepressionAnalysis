<template>
  <span role="img" :aria-label=this.label>
      {{this.value}}
    </span>
</template>

<script>
export default {
  name: "Emoji.vue",
  props:['label','value']
}
</script>

<style scoped>

</style>