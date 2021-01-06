<template>
  <div>
    <b-nav tabs>
      <b-nav-item class="large"><b>Fancy Quiz App</b></b-nav-item>
      <b-nav-item>Score: {{ numCorrect }}/{{ numTotal }}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  props: {
    numCorrect: Number,
    numTotal: Number,
  },
};
</script>

<style scoped>
div {
  background: #a8dadc;
  color: #1d3557;
}
</style>