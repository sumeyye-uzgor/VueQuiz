<template>
  <div id="app">
    <Header :numTotal="numTotal" :numCorrect="numCorrect"></Header>
    <question-box
      v-if="questions.length"
      :currentQuestion="questions[index_question]"
      :index_question="index_question"
      :next="next"
      :increment="increment"
    />
  </div>
</template>

<script>
import Header from "./components/Header";
import QuestionBox from "./components/QuestionBox";

export default {
  name: "App",
  components: {
    Header,
    QuestionBox,
  },
  data() {
    return {
      // questions: [{ question: "" }],
      questions: [],
      index_question: 0,
      numCorrect: 0,
      numTotal: 0,
    };
  },
  methods: {
    next() {
      this.index_question += 1;
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect++;
      }
      this.numTotal++;
    },
  },
  mounted() {
    fetch(
      "https://opentdb.com/api.php?amount=20&category=23&difficulty=easy&type=multiple",
      {
        method: "get",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        this.questions = jsonData.results;
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: #1d3557;
  font-weight: 500;
  /* background: #264653; */
  margin-top: 60px;
}
/* body {
  background: #264653;
} */
</style>
