<template>
  <div class="px2 mx-auto container app">
    <div style="visibility:hidden; opacity:0" id="dropzone">
      <div id="textnode">Drop anywhere!</div>
    </div>
    <v-sheet rounded="lg" elevation="5">
      <br>
      <v-card-title class="text-center display-1">Emotion Detection using CNN</v-card-title>
      <br>

        <v-row class="mb-6" justify="center" no-gutters dense style="background:#000000;">
            <v-col cols="3" class="pa-2 text-center"><CameraShutter @GetLinkFromCam="LinkFromCam"></CameraShutter></v-col>
            <v-col cols="3" class="pa-2">
              <div class="text-center">
                <v-btn color="#E91E63" class="white--text"  @click="$refs.inputUpload.click()" rounded><v-icon left dark>mdi-cloud-upload</v-icon>Upload</v-btn>
                <input v-show="false" ref="inputUpload" type="file" @change="this.handleUpload" >
              </div>
            </v-col>
        </v-row>


      <v-card class="mx-auto my-8  pa-4 " max-width="600" max-height="400" raised elevation="10" >
        <div class="relative pb-4 justify-center" v-show="imgUrl">
          <img ref="vueref0" @load="this.handleImgLoaded" :src="this.imgUrl"  alt="Cannot Load Image"/>
          <canvas ref="vueref1" class="absolute top-0 left-0" />
        </div>
        <br>
      </v-card>
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="#385F73" dark elevation="5">
          <v-card-text color="white">
            <span v-if="!ready">Loading machine learning models...</span>
            <span v-else>Analyzing Image....Please wait...</span>

            <br>
            <v-progress-linear indeterminate rounded color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
<!--    <Message v-show="loading">Analyzing image...</Message>-->
      <br>
    <Message bg="red" color="white" v-show="noFaces"  class="mx-auto" style="width:80%">
      <strong>Sorry!</strong> No faces were detected. Please try another
      image.
    </Message>
      <br>
    <Results v-if="!loading" :faces=this.faces :emotions=this.emotions v-show="faces.length > 0"></Results>
        <v-snackbar v-model="snackbar">
          Process Completed
          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
          </template>
        </v-snackbar>
    </v-sheet>
  </div>

</template>

<script>

import debounce from "lodash.debounce";
import { FaceFinder } from "@/scripts/face";
import { EmotionNet } from "@/scripts/models";
import {  readFile, nextFrame, drawBox, drawText } from "@/util";
import CameraShutter from "@/components/CNN/CameraShutter";
import Message from '@/components/CNN/Message';
import Results from '@/components/CNN/Results';


import sampleImg from '@/img/sample2.jpg';

// export component
let link1,dragdrop;
export default {
  name: "Emotion",
  data: () => ({
    ready: false,
    loading: false,
    imgUrl: sampleImg,
    detections: [],
    faces: [],
    emotions: [],
    img:'',
    canvas: '',
    snackbar: false,
    dragdrop,
    link1,
  }),
  mounted: function () {
    this.canvas = this.$refs.vueref1;
    this.img = this.$refs.vueref0;
    this.initModels();
    window.addEventListener("resize", this.handleResize);
    let lastTarget = null;

    function isFile(evt) {
      let dt = evt.dataTransfer;

      for (let i = 0; i < dt.types.length; i++) {
        if (dt.types[i] === "Files") {
          return true;
        }
      }
      return false;
    }

    window.addEventListener("dragenter", function (e) {
      if (isFile(e)) {
        lastTarget = e.target;
        document.querySelector("#dropzone").style.visibility = "";
        document.querySelector("#dropzone").style.opacity = 1;
        document.querySelector("#textnode").style.fontSize = "48px";
      }
    });

    window.addEventListener("dragleave", function (e) {
      e.preventDefault();
      if (e.target === document || e.target === lastTarget) {
        document.querySelector("#dropzone").style.visibility = "hidden";
        document.querySelector("#dropzone").style.opacity = 0;
        document.querySelector("#textnode").style.fontSize = "42px";
      }
    });

    window.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    let instance=this;
    window.addEventListener("drop", function (e) {
      e.preventDefault();
      document.querySelector("#dropzone").style.visibility = "hidden";
      document.querySelector("#dropzone").style.opacity = 0;
      document.querySelector("#textnode").style.fontSize = "42px";
      if (e.dataTransfer.files.length === 1) {
        // eslint-disable-next-line no-undef
        instance.dragdrop=e;
      }
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    dragdrop: function (e) {
      // when the hash prop changes, this function will be fired.
      this.handleUpload(e);
    }
  },

  components: {
      Message,Results,CameraShutter
  },
  computed:{
    noFaces(){
      return this.ready && !this.loading && this.imgUrl && !this.faces.length;
    },

  },
  methods:{

    LinkFromCam: function(link) {
      // alert(link);
      this.imgUrl=link;
    },

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

    },
    CamUpload : async function () {

      this.loading= false;
      this.imgUrl=link1
      this.detections= [];
      this.faces= [];
      this.emotions= [];

    },


    analyzeFaces : async function ()  {

      this.loading=true;
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
      this.snackbar=true;
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
<style scoped>
div#text {
  margin-top:48px;
  text-align:center;
}
div#dropzone {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: visibility 175ms, opacity 175ms;
  display: table;
  text-shadow: 1px 1px 2px #000;
  color: #fff;
  background: rgba(0, 0, 0, 0.45);
  font: bold 42px Oswald, DejaVu Sans, Tahoma, sans-serif;
}
div#textnode {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  transition: font-size 175ms;
}
</style>