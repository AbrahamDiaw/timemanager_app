<script>
import {WorkingTimeStore} from "../../stores/WorkingTimeStore";

export default {
  name: "WorkingTimes",
  data() {
      return {
        workingTimes: WorkingTimeStore(state => state.workingTimes),
        start: null,
        end: null
      }
  },
  mounted() {
    const today = new Date();
    today.setHours(2, 0, 0, 0)
    const isoDateToday = today.toISOString().split('.')[0];

    let firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1, 2,0,0);
    let isoDateFirstDay = firstDayOfCurrentMonth.toISOString().split('.')[0];

    this.start = isoDateFirstDay.replace("T", " ");
    this.end = isoDateToday.replace("T", " ");



    let dataSend = {
      id: this.$route.params.id,
      start: this.start,
      end: this.end
    }
    WorkingTimeStore(state => state.getWorkingTimeByUserId(dataSend))
  },
}
</script>


<template>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(workingtime) in workingTimes">
            <td>{{workingtime.start}}</td>
            <td>{{workingtime.end}}</td> 
          </tr>
        </tbody>

      </table>
    </div>

  </div>
</template>

<style scoped>

</style>