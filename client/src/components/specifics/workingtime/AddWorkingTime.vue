<script>

import {reactive} from "vue";
import {WorkingTimeStore} from "../../../stores/WorkingTimeStore";
import {UDate} from "../../../utils/UDate";

export default {
  name: "AddWorkingTime",
  data() {
    return {
      id: this.$route.params.id,
      start: "",
      end: "",
      error: WorkingTimeStore((state) => state.error)
    }
  },
  methods: {
    AddWorkingTimes() {
      const workingTime = {
        id: this.id,
        start: UDate.formatDateForInput(this.start)+':00Z',
        end: UDate.formatDateForInput(this.end)+':00Z'
      }
      WorkingTimeStore((state) => state.add(workingTime))
    }
  },
  mounted() {
    this.$watch(() => this.$route.params.id, (to, from) => {
      this.autoSetTitle();
    })
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="AddWorkingTimes" class="form-container">
      <label for="start">start:</label>
      <input type="datetime-local" id="start" v-model="start">
      <label for="end">end:</label>
      <input type="datetime-local" id="end" v-model="end">
      <p style="color: red;" v-if="error">{{error}}</p>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>