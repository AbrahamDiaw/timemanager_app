<script>
import {ModalStore} from "../../stores/ModalStore";
import {Components} from "../_components/Components";
import {WorkingTimeStore} from "../../stores/WorkingTimeStore";
import {UDate} from "../../utils/UDate";
export default {
name: "WorkingTime",
  props: {
    workingTime: Object,
  },
  methods: {
    formatDate(date) {
      return UDate.formatDate(date)
    },
    editWorkingTime(workingTimeId) {
      ModalStore(state => state.openModal(Components.EditWorkingTime))
      WorkingTimeStore(state => state.findById(workingTimeId))
    },
    deleteWorkingTime(workingTimeId) {
      WorkingTimeStore(state => state.deleteById(workingTimeId))
    }
  }
}
</script>

<template>
<div class="workingtime-container">
  <div class="workingtime-content">
    <p>{{formatDate(workingTime.start)}}</p>
    <p>{{formatDate(workingTime.end)}}</p>
    <button type="button" class="edit-button" @click="editWorkingTime(workingTime.id)">Edit</button>
    <button type="button" class="delete-button" @click="deleteWorkingTime(workingTime.id)">Delete</button>
  </div>
</div>
</template>

<style scoped>
.workingtime-container {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 65px;
  cursor: pointer;
  border: #000 solid 2px;
  margin: 10px 0;
  padding: 0 3rem;
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