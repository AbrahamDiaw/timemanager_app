<script lang="ts">
import { WorkingTimeStore } from "../../stores/WorkingTimeStore";
import WorkingTime from "./WorkingTime.vue";
import { ModalStore } from "../../stores/ModalStore";
import { Components } from "../_components/Components";
import Users from "../specifics/user/Users.vue";
import { ROLES } from "../../types/User";
import { UserStore } from "../../stores/UserStore";
import addUser from "../specifics/user/AddUser.vue";
import workingTime from "./WorkingTime.vue";

export default {
  name: "WorkingTimes",
  computed: {
    ROLES() {
      return ROLES
    }
  },
  components: {
    Users,
    WorkingTime
  },
  data() {
    return {
      workingTimes: WorkingTimeStore(state => state.workingTimes),
      dataSend: {
        id: "",
        start: "",
        end: ""
      },
      authUser: {}
    }
  },
  methods: {
    onChange(field: string, event: any) {
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
    const isoDateToday = new Date(today.getFullYear(), today.getMonth() + 1, 1, 1).toISOString().split('.')[0];
    let firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1, 1, 0, 0);
    let isoDateFirstDay = firstDayOfCurrentMonth.toISOString().split('.')[0];
    this.dataSend.id = this.$route.params.id as string
    this.dataSend.start = isoDateFirstDay.replace("T", " ");
    this.dataSend.end = isoDateToday.replace("T", " ");
    WorkingTimeStore(state => state.getWorkingTimeByUserId(this.dataSend))

    UserStore(state => {
      // @ts-ignore
      this.authUser = state.authUser
    })


    this.$watch(() => this.$route.params.id, () => {
      this.dataSend.id = this.$route.params.id as string
      WorkingTimeStore(state => state.getWorkingTimeByUserId(this.dataSend))
    })
  },
}
</script>


<template>
  <div class="global-content">
    <p>{{ authUser?.username }}</p>
    <div class="users-container" v-if="authUser && authUser.role !== ROLES.EMPLOYEE">
      <Users/>
    </div>
    <div
      :class="authUser && authUser.role === ROLES.EMPLOYEE ? ' workingtimes-container-full' : ' workingtimes-container'">
      <div class="header-button">
        <div class="header-content">
          <button type="button" class="add-button" @click="addWorkingTime()">Add</button>
          <div class="filter">
            <div>
              <label for="start">start:</label>
              <input type="datetime-local" id="start" v-model="dataSend.start" @change="onChange('start', $event)">
            </div>
            <div>
              <label for="end">end:</label>
              <input type="datetime-local" id="end" v-model="dataSend.end" @change="onChange('end', $event)">
            </div>
          </div>
          <div class="number-of-workingtimes">
            <p>Nombre de working time</p>
            <span>{{ workingTimes.length }}</span>
          </div>
        </div>
      </div>

      <div class="workingtimes-content">
        <div class="head-workingtimes">
        </div>
        <div class="content-workingtimes" v-for="(workingtime) in workingTimes">
          <WorkingTime :workingTime="workingtime"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-container {
  height: 100vh;
  width: 55%;
  overflow: scroll;
}

.global-content {
  display: flex;
}

.workingtimes-container {
  width: 45%;
}

.workingtimes-container-full {
  width: 100% !important;
  padding: 10px;
}

.header-content {
  display: flex;
  position: fixed;
}

.head-workingtimes {
  display: flex;
}

.filter {
  padding-left: 2rem;
}

.workingtimes-content {
  padding-top: 5rem;
  width: 100%;
  overflow: scroll;
  height: 100vh;
}

.number-of-workingtimes {
  display: flex;
}

.number-of-workingtimes p {
  padding: 0 15px;
  margin-right: 10px;
}
</style>