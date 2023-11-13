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
    <div class="clock-manager">
        <button class="clock-button" @click="toggleClock()" :disabled="disabled">
            {{ clockIn ? "Clock out" : "Clock in" }}
        </button>


        <div class="clocks-container">
            <p v-for="clock in data">
                <strong v-if="clock.status">Start</strong>
                <strong v-if="!clock.status">End</strong>
                : {{ clock.time }}
            </p>
        </div>

        <Loader v-if="loading" />
    </div>
</template>

<style scoped>

.clock-manager {
    padding: 30px;
}

.clocks-container {
    margin-top: 30px;
    padding: 10px;
    color: var(--white);
}

.clocks-container p {
    padding: 10px 0;
}

.clock-button {
    background: var(--dark-grey);
    color: #FFFFFF;
    padding: 15px 30px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: bold;
}

.clock-button:hover {
    background: var(--light-grey);
    color: black;
}

</style>
