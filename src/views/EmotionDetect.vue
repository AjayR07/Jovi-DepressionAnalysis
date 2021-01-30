<template>
     <div class="px2 mx-auto container app">
        <div class="py1">
        <input type="file" class="btn btn-small btn-primary btn-upload bg-black h5" @change="this.handleUpload" >

        </div>
        
        <div class="relative">
            <img ref="vueref0" @load="this.handleImgLoaded" :src="this.imgUrl" alt="" />
            <canvas ref="vueref1" class="absolute top-0 left-0" />
        </div>   
      </div>
</template>

<script>

import debounce from "lodash.debounce";
import { FaceFinder } from "@/scripts/face";
import { EmotionNet } from "@/scripts/models";
import { readFile, nextFrame, drawBox, drawText } from "@/util";

// export component
export default {
  name: "EmotionDetect",
  mounted() {
    this.canvas = this.$refs.vueref1;
    this.img = this.$refs.vueref0;
    this.initModels();
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  data: () => ({
    ready: false,
    loading: false,
    imgUrl: '',
    detections: [],
    faces: [],
    emotions: [],
  }),
  components: { 

  },
  methods:{
    initModels : async () => {
      const faceModel = new FaceFinder()
      await faceModel.load()

      const emotionModel = new EmotionNet()
      await emotionModel.load()

      this.models = { face: faceModel, emotion: emotionModel }
      this.ready=true;
      this.initPredict();
    },

    initPredict : () => {
      if (!this.img || !this.img.complete) return
      this.loading= true;
      this.analyzeFaces();
    },

    handleImgLoaded : () => {
      this.clearCanvas();
      this.analyzeFaces();
    },

    handleResize : debounce(() => this.drawDetections(), 100),

    handleUpload : async files => {
      if (!files.length) return
      const fileData = await readFile(files[0])
        this.imgUrl= fileData.url;
        this.loading= true;
        this.detections= [];
        this.faces= [];
        this.emotions= [];
    },

    analyzeFaces : async () => {
      await nextFrame()

      if (!this.models) return

      // get face bounding boxes and canvases
      const faceResults = await this.models.face.findAndExtractFaces(this.img)
      const { detections, faces } = faceResults

      // get emotion predictions
      let emotions = await Promise.all(
          faces.map(async face => await this.models.emotion.classify(face))
      );
      this.loading=false;
      this.detections=detections;
      this.faces=faces;
      this.emotions=emotions;
      this.drawDetections();
    },

    clearCanvas : () => {
      this.canvas.width = 0
      this.canvas.height = 0
    },

    drawDetections : () => {
      const { detections, emotions } = this.state
      if (!detections.length) return

      const { width, height } = this.img
      this.canvas.width = width
      this.canvas.height = height

      const ctx = this.canvas.getContext('2d')
      const detectionsResized = detections.map(d => d.forSize(width, height))

      detectionsResized.forEach((det, i) => {
        const { x, y } = det.box
        const { emoji } = emotions[i][0].label

        drawBox({ ctx, ...det.box })
        drawText({ ctx, x, y, text: emoji })
      })
    }
  }
 
};
</script>