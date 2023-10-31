<script lang="ts">
import {WorkingTimeStore} from "../../../stores/WorkingTimeStore";
import {WorkingTime} from "../../../types/WorkingTime";
import {UDate} from "../../../utils/UDate";

export default {
  name: "EditWorkingTime",
  data(): any {
    return {
      start: null,
      end: null
    }
  },
  methods:{
    editeurWorkingTimes() {
      console.log(this.currentWorkingTime)
    }
  },
  mounted(){
    WorkingTimeStore((state) => {
      this.start = UDate.replaceLetter(state.currentWorkingTime.start)
      this.end = UDate.replaceLetter(state.currentWorkingTime.end)
    })
  }
}
</script>

<template>
  <form @submit.prevent="editeurWorkingTimes">
    <label for="start">start:</label>
    <input type="datetime-local" id="start" v-model="start" >
    <label for="end">end:</label>
    <input type="datetime-local" id="end" v-model="end" >
    <input type="submit" value="Submit">
  </form>
</template>

<style scoped>

</style>