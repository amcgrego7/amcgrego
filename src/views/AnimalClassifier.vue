<template>
  <v-container grid-list-lg>
    <v-layout justify-center wrap>
      <v-flex xs12>
        <h1>Object Detection with Tensorflow.js</h1>
      </v-flex>

      <v-flex>
        <p
          class="subheading"
        >Both machine learning and web-development have taken significant strides over the past few years. It's incredible when the two subjects converge, because that's where data science can reach the widest audience! When Tensorflow.js was released, I was stoked because it meant machine learning could now be performed in the browser for both training and inference. Web-developers wouldn't need to set up an API and ping a server to perform inference on data. Getting up and running wasn't too difficult because Tensorflow.org does a great job sharing examples of what's possible with the JavaScript version. The examples cover training a new model in the browser and loading an existing model that was trained in Python.</p>
      </v-flex>

      <v-flex xs12>
        <a href="https://www.tensorflow.org/js/demos/" target="_blank">
          <v-img
            class="elevation-2 mx-auto"
            max-width="800"
            pa-5
            :src="require('@/assets/tensorflowjs-demos.png')"
            href="https://www.tensorflow.org/js/demos/"
            target="_blank"
          ></v-img>
        </a>
      </v-flex>

      <v-flex xs12 pt-4 pb-0>
        <h2>Detecting Animals in the Woods</h2>
      </v-flex>

      <v-flex>
        <p
          class="subheading"
        >My wife's parents have a camera that is set up in the woods behind their house to see what animals are sniffing around. I thought it would be a great opportunity to apply one of Tensorflow's pre-trained models to their video archives and use object detection to identify the animals. The difficulty with this project wasn't Tensorflow and the object detection model, but rather, making the videos available to the model in this vue.js based single page web app. After a weekend of expermentiation, the solution I landed on was to use Amazon's S3 to store the media files, then configure CORS settings to allow access to the videos. I referenced the media file URL using the HTML video tag. With all of that in place, I then did a bit of work to improve the UI on mobile devices</p>
        <p
          class="subheading"
        >When you visited this page, the model began downloading. I'd love to move this downloading process over to a web worker eventually so it doesn't freeze the DOM. On a strong internet connection, the model download takes about 10 seconds, but after that, the video displayed below will show bounding boxes and the animal being identified. I have a few videos that you can cycle through by clicking the "next video" button.</p>
      </v-flex>

      <v-flex xs12 align-center row text-xs-center>
        <v-btn v-on:click="nextVideo()" :loading="loading" :disabled="loading">Next Video</v-btn>

        <div class="canvas-container">
          <video
            crossorigin="anonymous"
            :src="`https://animal-classifier.s3.amazonaws.com/${currentVideo}.mp4`"
            loop
            playsinline
            autoplay
            muted
            controls
            ref="video"
            :width="screenWidth > 600 ? 600 : screenWidth -100"
            height="340"
          />
          <canvas
            class="size"
            ref="canvas"
            :width="screenWidth > 600 ? 600 : screenWidth - 100"
            height="340"
          />
        </div>
      </v-flex>

      <v-flex>
        <p>
          As you can see, this pre-trained
          <a
            href="https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd"
            target="_blank"
          >COCO SSD model</a> is capable of identify many (~90) classes. In my videos, you see bears and birds being detected. With a more robust model, we'd be able to do more examples to identify the coyotes, deer, and other animals captured on camera.
        </p>
        <p>Nice, there you have it! I have another Tensorflow project that I'll be posting soon.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export default {
  name: "AnimalClassifier",
  components: {},
  data() {
    return {
      model: null,
      loading: true,
      currentVideo: "turkey",
      videos: ["turkey", "bear", "bears"]
    };
  },
  mounted() {
    this.loadModel();
  },
  methods: {
    nextVideo() {
      const videos = this.videos;
      const currentIndex = videos.indexOf(this.currentVideo);

      if (currentIndex + 1 === videos.length) {
        this.currentVideo = videos[0];
      } else {
        this.currentVideo = videos[currentIndex + 1];
      }
    },
    async loadModel() {
      const vm = this;
      const modelPromise = await cocoSsd.load();
      Promise.all([modelPromise]).then(values => {
        vm.model = values[0];
        vm.loading = false;
        vm.detectFrame(vm.$refs.video, vm.model);
      });
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
  },
  computed: {
    screenWidth() {
      return this.$vuetify.clientWidth;
    }
  }
};
</script>

<style scoped>
.canvas-container {
  margin: 0 auto;
  position: relative;
  height: 350px; /* based on height of video player; */
  width: 100%;
}
.img-border {
  border: 1px solid #fff;
  border-radius: 2px;
}

canvas {
  padding: 0;
  margin: auto;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
