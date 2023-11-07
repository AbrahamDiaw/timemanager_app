<script lang="ts">

import ChartManager from "../specifics/ChartManager.vue";

export default {
  name: "Dashboard",
  components: {
    ChartManager
  }
}
</script>

<template>
  <div class="dashboard-container">
    <div class="banner-1">
      <!--Card for Hello if it's user log or Welcome on username board if general manager and it's not is dashboard  -->
      <p>Banner 1</p>
    </div>
    <div class="banner-2">Banner 2</div>
    <ChartManager/>
  </div>
</template>

<style scoped>

.dashboard-container {
  margin-top: 5rem;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  padding-left: 14px;
  padding-right: 14px;
}

.banner-1 {
  font-size: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
  background-color: #daf1e4;
  color: #FFFFFF;
  min-height: 400px;
  border-radius: 16px;
  grid-column: span 12 / span 12
}

.banner-2 {
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  background-color: #212b36;
  padding: 60px;
  min-height: 280px;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  grid-column: span 12 / span 12
}

/* Media query for medium devices */
@media screen and (min-width: 769px) and (max-width: 899px) {
  .dashboard-container {
    padding-left: 24px;
    padding-right: 24px;
  }

  .banner-1 {
    grid-column: span 12 / span 12
  }

  .banner-2 {
    grid-column: span 12 / span 12
  }
}

/* Media query for large devices */
@media screen and (min-width: 900px) {
  .dashboard-container {
    padding-left: 54px;
    padding-right: 54px;
  }

  .banner-1 {
    grid-column: span 8 / span 12
  }

  .banner-2 {
    grid-column: span 4 / span 12
  }

}
</style>