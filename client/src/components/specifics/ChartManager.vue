<script lang="ts">
import LineChart from "../generics/Chart/LineChart.vue";
import DoughnutChart from "../generics/Chart/DoughnutChart.vue"
import lineChartData from "./chart/LineChartData";
import doughnutChartData from "./chart/DoughnutChartData";

export default {
  name: "ChartManager",
  computed: {
    doughnutChartData() {
      return doughnutChartData
    },
    lineChartData() {
      return lineChartData
    }
  },
  components: {
    LineChart,
    DoughnutChart
  }
}
</script>

<template>

  <div class="card-sm">Card 1</div>
  <div class="card-sm">Card 2</div>
  <div class="card-sm">Card 3</div>
  <div class="doughnut">
    <DoughnutChart :doughnut-chart-data="doughnutChartData" :title="'Clocks & WorkingTimes'"/>
  </div>
  <div class="lines-chart">
    <LineChart :line-chart-data="lineChartData" :title="'Time works username & teams'"/>
  </div>

</template>

<style scoped>

.card-sm {
  color: #fff;
  background-color: #212b36;
  padding: 70px;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  grid-column: span 12 / span 12
}

.doughnut {
  grid-column: span 12 / span 12;
}

.lines-chart {
  grid-column: span 12 / span 12;
}


/* Media query for medium devices  */
@media screen and (min-width: 769px) and (max-width: 899px) {
  .card-sm{
    grid-column: span 12 / span 12
  }

}

/* Media query for large devices  */
@media screen and (min-width: 900px) {
  .card-sm{
    grid-column: span 4 / span 4
  }
  .doughnut {
    grid-column: span 6 / span 12;
  }

  .lines-chart {
    grid-column: span 6 / span 12;
  }
}
</style>