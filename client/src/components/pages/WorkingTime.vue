<script>
import {ModalStore} from "../../stores/ModalStore";
import {Components} from "../_components/Components";
import {WorkingTimeStore} from "../../stores/WorkingTimeStore";
export default {
name: "WorkingTime",
  props: {
    workingTime: Object
  },
  methods: {
    editWorkingTime(workingTimeId) {
      ModalStore(state => state.openModal(Components.EditWorkingTime))
      WorkingTimeStore(state => state.findById(workingTimeId))
    },
    deleteWorkingTime(workingTimeId) {
      WorkingTimeStore(state => state.deleteById(workingTimeId))
      console.log(workingTimeId)
    }
  }
}
</script>

<template>
<div class="workingtime-container">
  <div class="workingtime-content">
    <p>{{workingTime.start.replace("T", " ").replace("Z", "")}}</p>
    <p>{{workingTime.end.replace("T", " ").replace("Z", "")}}</p>
    <button type="button" class="edit-button" @click="editWorkingTime(workingTime.id)">Edit</button>
    <button type="button" class="delete-button" @click="deleteWorkingTime(workingTime.id)">Delete</button>
  </div>
</div>
</template>

<style scoped>
.workingtime-container {

}
.workingtime-content {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
p {
  margin-right: 20px;
}
</style>