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
  data(){
    return {
      editAndDelete: null,
    }
  },
  methods: {
    handleEnterButtonEditandDelete(id) {
        this.editAndDelete = id
    },
    handleLeaveButtonEditandDelete() {
      this.editAndDelete = null
    },
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
  <div class="workingtime-container" @mouseenter="handleEnterButtonEditandDelete(workingTime.id)" @mouseleave="handleLeaveButtonEditandDelete()">
      <div>
          <p><strong>Start:</strong> {{formatDate(workingTime.start)}}</p>
          <p><strong>End:</strong> {{formatDate(workingTime.end)}}</p>
      </div>
      <div class="wk-buttons" v-show="workingTime.id === editAndDelete" >
        <button type="button" class="edit-button" @click="editWorkingTime(workingTime.id)">Edit</button>
        <button type="button" class="delete-button" @click="deleteWorkingTime(workingTime.id)">Delete</button>
      </div>
  </div>
</template>

<style scoped>

.workingtime-container {
    border: 1px solid var(--light-grey);
    padding: 15px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.wk-buttons button {
  padding: 5px;
    cursor: pointer;
    margin: 0 5px;
}

</style>
