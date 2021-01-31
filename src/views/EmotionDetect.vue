<template>
     <div class="px2 mx-auto container app">

       <h1 id="msg">Please allow this page to access your camera.</h1>
       <div id="wrapper">
         <video></video>
         <canvas></canvas>
         <br />
         <button id="newphoto">Take A Photo</button>
         <button id="download" disabled="disabled" @click="this.CamUpload">Analyse</button>
       </div>

        <div class="py1">
        <input type="file" class="btn btn-small btn-primary btn-upload bg-black h5" @change="this.handleUpload"  >
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
       <Results :faces=this.faces :emotions=this.emotions v-show="faces.length > 0"></Results>

      </div>
</template>

<script>

import debounce from "lodash.debounce";
import { FaceFinder } from "@/scripts/face";
import { EmotionNet } from "@/scripts/models";
import {  readFile, nextFrame, drawBox, drawText } from "@/util";

import Message from '@/components/Message';
import Results from '@/components/Results';

// import sampleImg from '@/img/sample.jpg';

// export component
let link1
export default {
  name: "EmotionDetect",
  data: () => ({
    ready: false,
    loading: false,
    imgUrl: '',
    detections: [],
    faces: [],
    emotions: [],
    img:'',
    canvas: '',
    link1,
    publicPath: process.env.BASE_URL
  }),
  mounted() {

    this.canvas = this.$refs.vueref1;
    this.img = this.$refs.vueref0;
    this.initModels();
    window.addEventListener("resize", this.handleResize);


    var messageArea = null,
        wrapperArea = null,
        btnNewPhoto = null,
        btnDownload = null,
        videoCamera = null,
        canvasPhoto = null;

    function init() {
      messageArea = document.querySelector("#msg");
      wrapperArea = document.querySelector("#wrapper");
      btnNewPhoto = document.querySelector("#newphoto");
      btnDownload = document.querySelector("#download");
      videoCamera = document.querySelector("video");
      canvasPhoto = document.querySelector("canvas");

      if (window.location.protocol != 'http:' && window.location.protocol != "file:") {
        window.location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
        return;
      }

      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {

          var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }

          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }

      navigator.mediaDevices.getUserMedia({
        video: true
      })
          .then(function (stream) {
            if ("srcObject" in videoCamera) {
              videoCamera.srcObject = stream;
            } else {
              videoCamera.src = window.URL.createObjectURL(stream);
            }

            messageArea.style.display = "none";
            wrapperArea.style.display = "block";
            btnNewPhoto.onclick = takeAPhoto;
            // btnDownload.onclick = downloadPhoto;

            videoCamera.onloadedmetadata = function () {
              videoCamera.setAttribute("width", this.videoWidth);
              videoCamera.setAttribute("height", this.videoHeight);
              canvasPhoto.setAttribute("width", this.videoWidth);
              canvasPhoto.setAttribute("height", this.videoHeight);
              videoCamera.play();
            };
          })
          .catch(function (err) {
            messageArea.innerHTML = err.name + ": " + err.message;
          });
    }

    function takeAPhoto() {
      canvasPhoto.getContext("2d").drawImage(videoCamera, 0, 0, videoCamera.width, videoCamera.height);
      btnDownload.removeAttribute("disabled");
      //convert into blob
      canvasPhoto.toBlob(function (blob) {
          var link= URL.createObjectURL(blob);
          link1=link
          console.log("Here the link "+link)

      }, "image/jpeg", 1);

    }
    window.onload = init;
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  components: { 
      Message,Results
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
     
    },
    CamUpload : async function () {
    
      this.loading= true;
      this.imgUrl=link1
      this.detections= [];
      this.faces= [];
      this.emotions= [];
     
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