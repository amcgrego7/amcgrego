<template>
  <v-timeline>
    <v-timeline-item v-for="(story, i) in stories" :key="i" :color="story.color" small>
      <span
        slot="opposite"
        :class="`headline font-weight-bold ${story.color}--text`"
      >
      <v-img
          :src="getPic(story.img)"
          style="border-radius:3px;"
          v-bind:style="{ float: i % 2 === 1 ? 'right' : 'left' }"
          height="125"
          width="125"
        ></v-img>
      </span>
      <div class="py-3">
        <h2 :class="`headline font-weight-light mb-3 ${story.color}--text`">
          <div>{{ story.title }}</div>
        </h2>
        <div>{{ story.description }}</div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  data: () => ({
    stories: [
      {
        color: "cyan",
        year: "2013",
        title: "Hello, REAL world!",
        img: "graduation.jpg",
        description:
          "The college ride came to an end. After a summer of fun and exploring career options, I landed a role at a boutique defense contracting firm. I would spend my days helping the firm transition to a new ERP system and my nights loving life as an assistant coach for the Christopher Newport University lacrosse team."
      },
      {
        color: "green",
        year: "2014",
        title: "Launching a career with Booz Allen",
        img: "bah-logo.png",
        description: "For a guy with a serious case of FOMO (fear of missing out), I was seeking a role that would allow me flexibility to learn new skills and tackle unique challenges. After exploring the world of consulting, I became enthusiastic about the opportunity to rotate across client engagements. What better place to do that than by working for Booz Allen Hamilton!"
      },
      {
        color: "pink",
        year: "2015",
        title: "A Love for the game",
        img: "commentating.jpg",
        description: "After years of playing and coaching lacrosse at the collegiate level, I was passionate about staying involved with the team. I reached out to the CNU athletic director about providing live commentary for the home game contests. Five years later, my co-commentator and I remain the voices of CNU lacrosse... and I love every minute of it!"
      },
      {
        color: "amber",
        year: "2015",
        title: "#HappilyMcGregorAfter",
        img: "happy-wife-happy-life.jpg",
        description: "Believe it or not, I actually laid eyes on my bride to be when we were in the fourth grade. She was a superstar playing on my sisters' soccer team, coached by my father. Rachel and I really got to know each other in high school during snowboarding adventures and ping-pong rallies. I couldn't be happier to have married my high school sweetheart!"
      },
      {
        color: "cyan",
        year: "2017",
        title: "Values in Practice",
        img: "vip-award.jpg",
        description: "Booz Allen presented me with the highest honor as an employee, the Values in Practice Award. It's handed out to a select few people across the firm every year who display Booz Allen's purpose and values in their client work and who have had a postive influence on others within the company. The award was an will always be one of my proudest accomplishments. A validation of my contributions to date, but also motivation to keep pressing forward."
      },
      {
        color: "orange",
        year: "2018",
        title: "The student becomes the professor",
        img: "cnu-logo.jpg",
        description: "After finishing my Masters in Business Analytics at Indiana University, I realized I wanted to stay engaged with higher education. I had maintained a solid relationship with an analytics professor from my undergrad years at CNU and he asked me to take the reins on teaching a Business Applications course. Since then, I've enjoyed mentoring students and helping them make the transition from student to a impact player in the workforce."
      }
    ]
  }),
  methods: {
  getPic(path) {
    return require('../assets/' + path);
  }
}
};
</script>
