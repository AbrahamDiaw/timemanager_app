<script lang="ts">

import { ClockStore } from "../../../stores/ClockStore";
import { UserStore } from "../../../stores/UserStore";
import { AuthUser } from "../../../types/User";
import Loader from "../../generics/Loader/Loader.vue";
import { Clock } from "../../../types/Clock";

export default {
	  name: "ClockManager",
    components: { Loader },

    data() {
		  return {
          authUser:  UserStore(state => state.authUser) as AuthUser,
        data: ClockStore(state => state.data) as Clock[],
        clockIn: ClockStore(state => state.clockIn),
          disabled: false,
          loading: false
      }
    },

    methods: {
      toggleClock() {
		    ClockStore(state => {
            this.disabled = true;
            state.clock(this.authUser.id).finally(() => {
                this.disabled = false;
            });
        });
      }
    },

    mounted() {
        ClockStore(state =>  {
            this.loading = this.data?.length == 0;
            state.autoSetData(this.authUser.id).finally(() => {
                this.loading = false;
            });
        });
    }
}

</script>

<template>
    <button class="clock-button" @click="toggleClock()" :disabled="disabled">
        {{ clockIn ? "Clock out" : "Clock in" }}
    </button>


    <div class="clocks-container" v-for="clock in data">
        <p>
            <span v-if="clock.status">Start</span>
            <span v-if="!clock.status">End</span>
            : {{ clock.time }}
        </p>
    </div>

    <Loader v-if="loading" />
</template>

<style scoped>

.clocks-container {
    color: #FFFFFF;
}

.clock-button {
    background: #1b1e21;
    color: #FFFFFF;
    padding: 15px 30px;
    margin: 50px;
    border-radius: 30px;
}

</style>
