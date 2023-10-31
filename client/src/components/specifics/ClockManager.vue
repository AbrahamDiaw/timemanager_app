<script lang="ts">

import { ClockStore } from "../../stores/ClockStore";
import { UserStore } from "../../stores/UserStore";

export default {
	  name: "ClockManager",

    data() {
		  return {

        startDatetime: undefined,
        clockIn: false
      }
    },

    methods: {
      clock() {
		    ClockStore(state => {
            UserStore(store => {
                if (store.currentUser) {
                    state.clock(store.currentUser.id);
                }
            });
        });
      },

      refresh() {
		    ClockStore(state => state.refresh());
      }
    },

    mounted() {
		  ClockStore(state =>  {
			  this.startDatetime = state.startDatetime;
			  this.clockIn = state.clockIn;
      });
	  }
}

</script>

<template>
    <p>{{ startDatetime }}</p>
    <button class="clock-button" @click="clockIn ? refresh() : clock()">
        {{ clockIn ? "Refresh" : "ClockIn" }}
    </button>
</template>

<style scoped>

.clock-button {
    background: #1b1e21;
    color: #FFFFFF;
    padding: 15px 30px;
    margin: 50px;
    border-radius: 30px;
}

</style>