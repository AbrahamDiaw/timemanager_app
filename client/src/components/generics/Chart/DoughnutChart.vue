<script lang="ts">

import Chart from "chart.js/auto";

export default {
  name: "DoughnutChart",
  props: {
    doughnutChartData: Object,
    title: String,
  },
  mounted() {
    const ctx: any = document.getElementById('doughnut-chart');
    new Chart(ctx, this.doughnutChartData);
  }
}
</script>

<template>
  <div class="doughnut-chart-container" >
    <p class="title-chart-doughnut">{{ title }}</p>
    <div class="doughnut-chart">
      <canvas id="doughnut-chart"></canvas>
    </div>
  </div>
</template>

<style scoped>
.title-chart-doughnut {
  margin-bottom: 55px;
}

.doughnut-chart-container {
  color: #FFFFFF;
  width: 100%;
  height: 450px;
  background-color: #212b36;
  border-radius: 20px;
  padding: 30px;
  box-shadow: rgba(145, 158, 171, 0.2) 0 0 2px 0, rgba(145, 158, 171, 0.12) 0 12px 24px -4px;
}
.doughnut-chart{
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>