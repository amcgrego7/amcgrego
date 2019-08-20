<template>
  <v-container grid-list-lg>
    <v-layout justify-center wrap>
      <div class="container">
        <video
          crossorigin="anonymous"
          src="https://animal-classifier.s3.amazonaws.com/Bear+1+7-1-19+(1).mp4"
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
      model : null
    };
  },
  mounted() {
    const videoRef = this.$refs.video;
    const canvasRef = this.$refs.canvas;
    const vm = this;

    const modelPromise = cocoSsd.load();
    Promise.all([modelPromise])
      // Promise.all([modelPromise, webCamPromise])
      .then(values => {
        alert('okay')
        this.detectFrame(videoRef, values[0]);
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {

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
      const shiftUp = 50;
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
