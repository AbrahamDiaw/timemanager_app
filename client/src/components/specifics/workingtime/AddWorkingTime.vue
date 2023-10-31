<script>

import {reactive} from "vue";
import {WorkingTimeStore} from "../../../stores/WorkingTimeStore";
import {UDate} from "../../../utils/UDate";

export default {
  name: "AddWorkingTime",
  data() {
    return {
      id: 1,
      start: "",
      end: "",
    }
  },
  methods: {
    AddWorkingTimes() {
      const workingTime = {id: this.id, start: UDate.formatDateForInput(this.start), end:UDate.formatDateForInput(this.start)}
      WorkingTimeStore((state)=> state.add(workingTime))
    }
  },
  mounted() {
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="AddWorkingTimes" class="form-container">
      <label for="start">start:</label>
      <input type="datetime-local" id="start" v-model="start" >
      <label for="end">end:</label>
      <input type="datetime-local" id="end" v-model="end" >
      <input type="submit" value="Submit">
    </form>
  </div>
</template>