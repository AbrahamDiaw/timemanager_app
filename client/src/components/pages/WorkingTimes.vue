<script>
import {WorkingTimeStore} from "../../stores/WorkingTimeStore";

export default {
  name: "WorkingTimes",
  data() {
      return {
        workingTimes: WorkingTimeStore(state => state.workingTimes),
        dataSend: {
          id: null,
          start: null,
          end: null
        },

      }
  },
  methods: {
    onChange(field, event) {
      if (field === 'start') {
        this.dataSend.start = event.target.value.replace("T", " ") + ":00";
        WorkingTimeStore(state => state.getWorkingTimeByUserId(this.dataSend))
      } else if (field === 'end') {
        this.dataSend.end = event.target.value.replace("T", " ") + ":00";
        WorkingTimeStore(state => state.getWorkingTimeByUserId(this.dataSend))
      }
    }
  },
  mounted() {
    const today = new Date();
    today.setHours(2, 0, 0, 0)
    const isoDateToday = today.toISOString().split('.')[0];
    let firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1, 2,0,0);
    let isoDateFirstDay = firstDayOfCurrentMonth.toISOString().split('.')[0];
    this.dataSend.id = this.$route.params.id
    this.dataSend.start = isoDateFirstDay.replace("T", " ");
    this.dataSend.end= isoDateToday.replace("T", " ");
    WorkingTimeStore(state => state.getWorkingTimeByUserId(this.dataSend))
  },
}
</script>


<template>
  <div>
    <div>
      <label for="start">start:</label>
      <input type="datetime-local" id="start" v-model="dataSend.start" @change="onChange('start', $event)">
    </div>
    <div>
      <label for="end">end:</label>
      <input type="datetime-local" id="end" v-model="dataSend.end" @change="onChange('end', $event)">
    </div>

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