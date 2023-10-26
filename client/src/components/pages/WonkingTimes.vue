<script lang="ts">
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
  components: {

  },
  methods: {

  },
  mounted() {
    let userId=this.$route.params.id
    this.$store.dispatch("getWorkingTimeByUserId",userId)
  },
}
</script>


<template>
  <div>
    <div v-for="(workingtime) in this.$store.state.WorkingTime.workingTimes">
      <p>{{workingtime.start}}</p>
    </div>
    WorkingTimes kjhdsqkjdhqskjdh
  </div>
</template>

<style scoped>

</style>