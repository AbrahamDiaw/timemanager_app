<script lang="ts">
import {WorkingTimeStore} from "../../../stores/WorkingTimeStore";
import {WorkingTime} from "../../../types/WorkingTime";
import {UDate} from "../../../utils/UDate";

export default {
  name: "EditWorkingTime",
  data(): any {
    let id: number | null = null;
    let start: string | null = null;
    let end: string | null = null;
    return {
      id,
      start,
      end
    }
  },
  methods:{
    editeurWorkingTimes() {
      WorkingTimeStore((state)=> state.updateById(this.id, {start: this.start, end: this.end}))
    }
  },
  mounted(){
    WorkingTimeStore((state) => {
      this.id = state.currentWorkingTime.id
      this.start = UDate.formatDateForInput(state.currentWorkingTime.start)
      this.end = UDate.formatDateForInput(state.currentWorkingTime.end)
    })
  }
}
</script>

<template>
  <form @submit.prevent="editeurWorkingTimes" class="form-container">
    <label for="start">start:</label>
    <input type="datetime-local" id="start" v-model="start" >
    <label for="end">end:</label>
    <input type="datetime-local" id="end" v-model="end" >
    <input type="submit" value="Submit">
  </form>
</template>

<style scoped>

</style>