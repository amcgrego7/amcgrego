<template>
  <v-container grid-list-lg>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <h1>Object Detection with Tensorflow.js</h1>
      </v-flex>
      
      <v-flex>

      </v-flex>

      <v-flex xs12>
        <v-btn v-on:click="loadModel()">Load Model</v-btn>
        <v-btn v-on:click="detectFrame($refs.video, model)">Begin Detection</v-btn>
        <v-btn v-on:click="nextVideo()">Next Video</v-btn>
        <div class="container">
          <video
            crossorigin="anonymous"
            :src="`https://animal-classifier.s3.amazonaws.com/${currentVideo}.mp4`"
            class="size"
            autoplay
            loop
            playsinline
            muted
            ref="video"
            width="600"
            height="500"
          />
          <canvas class="size" ref="canvas" width="600" height="500" />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export default {
  name: "AnimalClassifier",
  computed: {},
  components: {},
  data() {
    return {
      model : null,
      currentVideo : 'bear',
      videos : ['bear', 'bears', 'turkey']
    };
  },

  methods: {
    nextVideo() {
      const videos = this.videos;
      const currentIndex = videos.indexOf(this.currentVideo);

      if ((currentIndex + 1) === videos.length) {
        this.currentVideo = videos[0]
      } else {
        this.currentVideo = videos[currentIndex + 1]
      }
    },
    loadModel() {
    const vm = this;
    const modelPromise = cocoSsd.load();
    Promise.all([modelPromise])
      .then(values => {
        vm.model = values[0]
        alert('okay')
      })
      .catch(error => {
        console.error(error);
      });
    },
    beginDetection() {
        this.detectFrame(this.$refs.video, this.model);
    },
    detectFrame(video, model) {
      model.detect(video).then(predictions => {
        this.renderPredictions(predictions);
        requestAnimationFrame(() => {
          this.detectFrame(video, model);
        });
      });
    },

    renderPredictions(predictions) {
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Font options.
      const font = "16px sans-serif";
      const shiftUp = 10;
      ctx.font = font;
      ctx.textBaseline = "top";
      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1] - shiftUp;
        const width = prediction.bbox[2];
        const height = prediction.bbox[3];
        // Draw the bounding box.
        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);
        // Draw the label background.
        ctx.fillStyle = "#00FFFF";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      });

      predictions.forEach(prediction => {
        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        // Draw the text last to ensure it's on top.
        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y - shiftUp);
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  position:relative;
}
.size {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
