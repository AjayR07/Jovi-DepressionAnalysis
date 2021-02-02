<template>
  <div>
  <v-dialog v-model="dialog"  max-width="500" style="overflow-x: hidden;">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on" rounded>
        <v-icon left dark>mdi-camera-plus</v-icon>
        Camera
      </v-btn>
    </template>
  <v-card v-click-outside="stopCameraStream" style="overflow-x: hidden;">
    <v-card-title class="headline">
      Camera Capture
    </v-card-title>
    <div id="app" class="text-center">
      <v-btn type="button" v-if="!isCameraOpen" @click="toggleCamera" >
       Open Camera
      </v-btn>
      <v-btn v-if="isCameraOpen" @click="toggleCamera" color="pink" ><v-icon left>mdi-close-circle-outline </v-icon> Close</v-btn>
      <div v-show="isCameraOpen && isLoading" >
        <v-progress-circular :width="5" color="red" indeterminate></v-progress-circular>
      </div>

      <div class="pa-5" v-if="isCameraOpen" >
      <v-card elevation="5"   v-show="!isLoading"  :class="{ 'flash' : isShotPhoto }" >
          <div  :class="{'flash' : isShotPhoto}"></div>
          <video v-show="!isPhotoTaken" ref="camera" width="100%" height="100%" autoplay></video>
          <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" width="350" height="310"></canvas>
      </v-card>
      </div>
      <v-row class="justify-between">
        <v-col v-if="isPhotoTaken && isCameraOpen">
          <v-btn elevation="5" fab raised rounded color="red" @click="toggleCamera">
            <v-icon>
              mdi-close
            </v-icon></v-btn>
        </v-col>
        <v-col v-if="isCameraOpen && !isLoading">
          <v-btn elevation="5" fab raised rounded color="blue" @click="takePhoto">
            <v-icon dark>
            mdi-camera-iris
          </v-icon></v-btn>
        </v-col>
        <v-col v-if="isPhotoTaken && isCameraOpen" >
          <v-btn elevation="5" fab raised rounded color="green"  @click="SendLink(); dialog = false;">
            <v-icon>
              mdi-check
            </v-icon></v-btn>
        </v-col>
      </v-row>
      <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
      </div>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red darken-1" text @click="stopCameraStream(); dialog = false;">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
  </div>
</template>

<script>

export default {
  name: "CameraShutter",
  data() {
    return {
      dialog:false,
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: '',
      find:true,
    }
  },

  methods: {


    SendLink:async function async() {
      await this.downloadImage();
      await this.stopCameraStream();
      this.$emit("GetLinkFromCam",this.link);

    },
    toggleCamera() {
      if(this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();

      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: true
      });


      navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => {
            this.isLoading = false;
            this.$refs.camera.srcObject = stream;
          })
          .catch(error => {
            this.isLoading = false;
            alert("May the browser didn't support or there is some "+error);
          });
    },

    stopCameraStream() {
      console.log("Closed");
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    },

    takePhoto() {
      if(!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }

      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
    },

    downloadImage() {
      const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg");
      this.link=canvas;


    },

  }
}
</script>

<style scoped>


</style>