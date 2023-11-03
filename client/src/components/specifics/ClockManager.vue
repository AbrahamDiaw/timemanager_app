<script lang="ts">

import { ClockStore } from "../../stores/ClockStore";
import { UserStore } from "../../stores/UserStore";

export default {
	  name: "ClockManager",

    data() {
		  return {
        data: ClockStore(state => state.data),
        clockIn: ClockStore(state => state.clockIn),
      }
    },

    methods: {
      toggleClock() {
		    ClockStore(state => {
            UserStore(store => {
                if (store.authUser?.id) {
                    state.clock(store.authUser.id);
                }
            });
        });
      }
    },

    mounted() {
		  ClockStore(state =>  {
          UserStore(userStore => {
              if (userStore.authUser?.id) {
                  state.autoSetData(userStore.authUser.id);
              }
          });
      });
	  }
}

</script>

<template>
    <div v-for="clock in data">
        <p>
            <span v-if="clock.status">Start</span>
            <span v-if="!clock.status">End</span>
            : {{ clock.time }}
        </p>
    </div>


    <button class="clock-button" @click="toggleClock()">
        {{ clockIn ? "Clock out" : "Clock in" }}
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