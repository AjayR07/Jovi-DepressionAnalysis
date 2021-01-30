<template>
  <div class="my2">
  <h2 class="m0 h3">
    <Emoji label="grin" value="😄" />
    <Emoji label="neutral" value="😐" />
    <Emoji label="sad" value="🙁" />
  </h2>
  <h1 class="my1 h2">Emotion Extractor</h1>
  <p class="m0">
    Upload a photo and see who’s happy to be there. This demo uses{' '}
    <a href="https://js.tensorflow.org/">Tensorflow.js</a> and neural networks
    to detect faces and classify emotions. More details{' '}
    <a href="https://brendansudol.com/writing/tfjs-emotions">here</a>.
  </p>
  </div>
</template>

<script>
import Emoji from '@/components/Emoji';
export default {
  name: "Header.vue",
  components: {
    Emoji
  }
}
</script>

<style scoped>

</style>