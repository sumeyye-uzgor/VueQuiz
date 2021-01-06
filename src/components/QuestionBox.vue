<template>
  <div class="question-box-container col-6 offset-3">
    <h1>Question {{ index_question + 1 }}/20</h1>
    <b-jumbotron id="question-box">
      <template> {{ currentQuestion.question }}</template>

      <hr class="my-4" />
      <div class="col-6 offset-3">
        <b-list-group>
          <b-list-group-item
            v-for="(answer, index_answer) of answersCom"
            :key="index_answer"
            @click="selectAnswer(index_answer)"
            :class="answerClass(index_answer)"
          >
            {{ answer }}</b-list-group-item
          >
        </b-list-group>
      </div>
      <br />
      <div>
        <b-button
          id="btn1"
          class="mr-4"
          @click="submitAnswer"
          :disabled="selectedIndex === null || isAnswered"
          >Submit</b-button
        >
        <b-button id="btn2" @click="next">Next Question</b-button>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    currentQuestion: Object,
    index_question: Number,
    next: Function,
    increment: Function,
  },
  data() {
    return {
      selectedIndex: null,
      shuffledAnswers: [],
      correctIndex: null,
      isAnswered: false,
    };
  },
  watch: {
    currentQuestion() {
      this.selectedIndex = null;
      this.shuffleAnswers();
      this.isAnswered = false;
    },
  },
  computed: {
    answersCom() {
      this.shuffleAnswers();
      return this.shuffledAnswers;
      //   let ourAnswers = [...this.currentQuestion.incorrect_answers];
      //   ourAnswers.push(this.currentQuestion.correct_answer);
      //   return ourAnswers;
    },
  },
  methods: {
    selectAnswer(index_answer) {
      this.selectedIndex = index_answer;
    },
    shuffleAnswers() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ];
      this.shuffledAnswers = _.shuffle(answers);
      this.correctIndex = this.shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );
    },

    submitAnswer() {
      let isCorrect = false;
      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      }
      this.increment(isCorrect);
      this.isAnswered = true;
    },
    answerClass(index_answer) {
      let answerClass = "";
      if (!this.isAnswered && this.selectedIndex === index_answer) {
        answerClass = "mb-3 selected";
      } else if (this.isAnswered && this.correctIndex === index_answer) {
        answerClass = "mb-3 correct";
      } else if (
        this.isAnswered &&
        this.selectedIndex === index_answer &&
        this.correctIndex !== index_answer
      ) {
        answerClass = "mb-3 incorrect";
      } else {
        answerClass = "mb-3 answers";
      }
      return answerClass;
      // !this.isAnswered && selectedIndex === index_answer
      //         ? 'mb-3 selected'
      //         :
      //         ? 'mb-3 correct'
      //         :
      //         ? 'mb-3 incorrect'
      //         : 'mb-3 answers',
    },
  },
};
</script>

<style scoped>
#answers:hover {
  background: #a8dadc;
  cursor: pointer;
}
b-button {
  margin: 10px;
}
.answers {
  color: #1d3557;
  font-weight: 500;
  background: #f1faee;
}
#question-box {
  background: #e63946;
  color: #f1faee;
}

#btn2,
#btn1 {
  background-color: #1d3557;
  color: #f1faee;
}

.correct {
  color: #1d3557;
  font-weight: 500;
  background-color: #00a896;
}
.incorrect {
  color: #1d3557;
  font-weight: 500;
  background-color: #e71d36;
}
.selected {
  color: #1d3557;
  font-weight: 500;
  background-color: #a8dadc;
}
</style>