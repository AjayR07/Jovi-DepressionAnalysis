<template>
     <div class="px2 mx-auto container app">
       <Header></Header>
        <div class="py1">
        <input type="file" class="btn btn-small btn-primary btn-upload bg-black h5" @change="this.handleUpload" >
        </div>
        
        <div class="relative" v-show="imgUrl">
            <img ref="vueref0" @load="this.handleImgLoaded" :src="this.imgUrl" alt="" />
            <canvas ref="vueref1" class="absolute top-0 left-0" />
        </div>
       <Message v-show="!ready">Loading machine learning models...</Message>
       <Message v-show="loading">Analyzing image...</Message>
       <Message bg="red" color="white" v-show="noFaces">
         <strong>Sorry!</strong> No faces were detected. Please try another
         image.
       </Message>
       <Results :faces="this.faces" :emotions="this.emotions" v-show="this.faces.length > 0"></Results>

       <Footer />
      </div>
</template>

<script>

import debounce from "lodash.debounce";
import { FaceFinder } from "@/scripts/face";
import { EmotionNet } from "@/scripts/models";
import { readFile, nextFrame, drawBox, drawText } from "@/util";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Message from '@/components/Message';
import Results from '@/components/Results';

import sampleImg from '@/img/sample.jpg';

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
    imgUrl: sampleImg,
    detections: [],
    faces: [],
    emotions: [],
    img:'',
    canvas: '',
    publicPath: process.env.BASE_URL
  }),
  components: { 
      Header,Footer,Message,Results
  },
  computed:{
    noFaces(){
      return this.ready && !this.loading && this.imgUrl && !this.faces.length;
    }
  },
  methods:{
    initModels : async function () {
      const faceModel = new FaceFinder()
      await faceModel.load()
      const emotionModel = new EmotionNet()
      await emotionModel.load()
      this.models = { face: faceModel, emotion: emotionModel }
      this.ready=true;
      this.initPredict();
    },

    initPredict : function () {
      if (!this.img || !this.img.complete) return
      this.loading= true;
      this.analyzeFaces();
    },

    handleImgLoaded : function(){
      this.clearCanvas();
      this.analyzeFaces();
    },

    handleResize : debounce(function (){this.drawDetections()}, 100),

    handleUpload : async function (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return
      const fileData = await readFile(files[0])
      this.imgUrl= fileData.url;
      this.loading= true;
      this.detections= [];
      this.faces= [];
      this.emotions= [];
      console.log("HandleUpload");
    },

    analyzeFaces : async function ()  {
      
      await nextFrame()

      if (!this.models)
      {
        console.log("Models not loaded inside Analyze Faces")
        return
      }

      // get face bounding boxes and canvases
      const faceResults = await this.models.face.findAndExtractFaces(this.img)
      console.log("Models loaded inside Analyze Faces")
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

    clearCanvas : function ()  {

      this.canvas.width = 0
      this.canvas.height = 0
    },

    drawDetections : function ()  {

      if (!this.detections.length) return

      const { width, height } = this.img
      this.canvas.width = width
      this.canvas.height = height

      const ctx = this.canvas.getContext('2d')
      const detectionsResized = this.detections.map(d => d.forSize(width, height))

      detectionsResized.forEach((det, i) => {
        const { x, y } = det.box
        const { emoji } = this.emotions[i][0].label

        drawBox({ ctx, ...det.box })
        drawText({ ctx, x, y, text: emoji })
      })
    }
  }
 
};
</script>