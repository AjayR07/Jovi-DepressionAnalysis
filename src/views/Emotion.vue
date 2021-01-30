

<script>

import { FaceFinder } from "@/scripts/face";
import { EmotionNet } from "@/scripts/models";
import { readFile, nextFrame, drawBox, drawText } from "@/util";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Message from '@/components/Message';
import Results from '@/components/Results';

import sampleImg from '@/img/sample.jpg';
const App = {
  data: () => ({
    ready: false,
    loading: false,
    imgUrl: sampleImg,
    detections: [],
    faces: [],
    emotions: []
  }),

  mounted() {
    this.initModels();
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  components: {
    Header,Footer,Message,Results
  },
  render() {
    const {
      ready,
      imgUrl,
      loading,
      faces,
      emotions
    } = this.$data;
    const noFaces = ready && !loading && imgUrl && !faces.length;
    return <div class="px2 mx-auto container app">
      <Header />
      <main>
        <div class="py1">
          <Dropzone class="btn btn-small btn-primary btn-upload bg-black h5" accept="image/jpeg, image/png" multiple={false} disabled={!ready} onDrop={this.handleUpload}>
            Upload image
          </Dropzone>
        </div>
        {imgUrl && <div class="relative">
          <img ref={el => this.img = el} onLoad={this.handleImgLoaded} src={imgUrl} alt="" />
          <canvas ref={el => this.canvas = el} class="absolute top-0 left-0" />
        </div>}
        {!ready && <Message>Loading machine learning models...</Message>}
        {loading && <Message>Analyzing image...</Message>}
        {noFaces && <Message bg="red" color="white">
          <strong>Sorry!</strong> No faces were detected. Please try another
          image.
        </Message>}
        {faces.length > 0 && <Results faces={faces} emotions={emotions} />}
      </main>
      <Footer />
    </div>;
  },

  methods: {
    async initModels() {
      const faceModel = new FaceFinder();
      await faceModel.load();
      const emotionModel = new EmotionNet();
      await emotionModel.load();
      this.models = {
        face: faceModel,
        emotion: emotionModel
      };
      this.setState({
        ready: true
      }, this.initPredict);
    },

    initPredict() {
      if (!this.img || !this.img.complete) return;
      this.loading = true;
      this.analyzeFaces();
    },

    handleImgLoaded() {
      this.clearCanvas();
      this.analyzeFaces();
    },

    async handleUpload(files) {
      if (!files.length) return;
      const fileData = await readFile(files[0]);
      this.imgUrl = fileData.url, this.loading = true, this.detections = [], this.faces = [], this.emotions = [];
    },

    async analyzeFaces() {
      await nextFrame();
      if (!this.models) return; // get face bounding boxes and canvases

      const faceResults = await this.models.face.findAndExtractFaces(this.img);
      const {
        detections,
        faces
      } = faceResults; // get emotion predictions

      let emotions = await Promise.all(faces.map(async face => await this.models.emotion.classify(face)));
      this.setState({
        loading: false,
        detections,
        faces,
        emotions
      }, this.drawDetections);
    },

    clearCanvas() {
      this.canvas.width = 0;
      this.canvas.height = 0;
    },

    drawDetections() {
      const {
        detections,
        emotions
      } = this.$data;
      if (!detections.length) return;
      const {
        width,
        height
      } = this.img;
      this.canvas.width = width;
      this.canvas.height = height;
      const ctx = this.canvas.getContext('2d');
      const detectionsResized = detections.map(d => d.forSize(width, height));
      detectionsResized.forEach((det, i) => {
        const {
          x,
          y
        } = det.box;
        const {
          emoji
        } = emotions[i][0].label;
        drawBox({
          ctx,
          ...det.box
        });
        drawText({
          ctx,
          x,
          y,
          text: emoji
        });
      });
    }

  }
};
export default App;
</script>

<style scoped>

</style>