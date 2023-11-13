<script lang="ts">
import Chart from 'chart.js/auto';

export default {
  name: "LineChart",
  props: {
    lineChartData: Object,
    title: String
  },
  mounted() {
    const ctx: any = document.getElementById('line-chart');
    new Chart(ctx, this.lineChartData);
  }
}
</script>

<template>
  <div class="line-chart-container ">
    <p class="title-chart-line">{{ title }}</p>
    <canvas id="line-chart" width="auto" height="350"></canvas>
  </div>
</template>

<style scoped>
.title-chart-line {
  margin-bottom: 25px;
}

.line-chart-container {
  color: #FFFFFF;
  width: 100%;
  height: 100%;
  background-color: #212b36;
  border-radius: 20px;
  padding: 30px;
  box-shadow: rgba(145, 158, 171, 0.2) 0 0 2px 0, rgba(145, 158, 171, 0.12) 0 12px 24px -4px;
}
</style>