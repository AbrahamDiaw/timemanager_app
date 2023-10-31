<script>
import {WorkingTimeStore} from "../../stores/WorkingTimeStore";
import WorkingTime from "./WorkingTime.vue";
import {ModalStore} from "../../stores/ModalStore";
import {Components} from "../_components/Components";
export default {
  name: "WorkingTimes",
  components: {
    WorkingTime
  },
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
    },
    addWorkingTime() {
      ModalStore((state) => state.openModal(Components.AddWorkingTime));
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
    <div class="header-button">
      <div class="header-content">
        <button type="button" class="add-button" @click="addWorkingTime()">Add</button>
      </div>
    </div>
    <div>
      <label for="start">start:</label>
      <input type="datetime-local" id="start" v-model="dataSend.start" @change="onChange('start', $event)">
    </div>
    <div>
      <label for="end">end:</label>
      <input type="datetime-local" id="end" v-model="dataSend.end" @change="onChange('end', $event)">
    </div>
    <div>
      <div class="head-workingtimes">
      </div>
      <div class="content-workingtimes" v-for="(workingtime) in workingTimes">
        <WorkingTime :workingTime="workingtime" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.head-workingtimes {
  display: flex;

}
</style>