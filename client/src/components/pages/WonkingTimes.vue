<script>
import { mapGetters} from "vuex";

export default {
  name: "WorkingTimes",
  props: {

  },
  data() {
      return {
        data: []
      }
  },
  mounted() {
    let userId = this.$route.params.id
    this.$store.dispatch("getWorkingTimeByUserId",userId)
  },
}
</script>


<template>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(workingtime) in this.$store.state.WorkingTime.workingTimes">
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