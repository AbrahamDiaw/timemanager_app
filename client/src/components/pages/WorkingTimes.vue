<script lang="ts">
import { WorkingTimeStore } from "../../stores/WorkingTimeStore";
import WorkingTime from "./WorkingTime.vue";
import { ModalStore } from "../../stores/ModalStore";
import { Components } from "../_components/Components";
import Users from "../specifics/user/Users.vue";
import { AuthUser, ROLES } from "../../types/User";
import { UserStore } from "../../stores/UserStore";

import "../../styles/forms.css";

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
			workingTimes: WorkingTimeStore(state => state.workingTimes) as WorkingTime[],
			dataSend: {
				id: "",
				start: "",
				end: ""
			},
			authUser: UserStore(state => state.authUser) as AuthUser
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

		this.$watch(() => this.$route.params.id, () => {
			this.dataSend.id = this.$route.params.id as string
			WorkingTimeStore(state => state.getWorkingTimeByUserId(this.dataSend))
		})
	},
}
</script>


<template>
    <div class="working-times">
        <div class="working-times-user">
            <p><strong>Email:</strong> {{ authUser?.email }}</p>
            <p><strong>Username:</strong> {{ authUser?.username }}</p>
        </div>

        <div class="working-times-header">
            <button type="button" class="working-times-button" @click="addWorkingTime()">Add</button>
        </div>

        <div class="working-times-forms">
            <div>
                <label for="start"><strong>Start</strong></label>
                <input class="form-input" type="datetime-local" v-model="dataSend.start"
                       @change="onChange('start', $event)">
            </div>
            <div>
                <label for="end"><strong>End</strong></label>
                <input class="form-input" type="datetime-local" id="end" v-model="dataSend.end"
                       @change="onChange('end', $event)">
            </div>
        </div>

        <div class="workingtimes-content">
            <div class="working-times-nb">
                <h3><strong>Working times:</strong>&nbsp;{{ workingTimes.length }}</h3>
            </div>

            <div class="workingtimes-all" v-for="(workingtime) in workingTimes">
                <WorkingTime :workingTime="workingtime"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

.working-times {
    padding: 30px;
    color: var(--white);
}

.working-times-user {
    font-size: 1rem;
}

.working-times-header {
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: end;
}

.working-times-button {
    font-size: 1rem;
    padding: 5px 15px;
    border-radius: 10px;
    cursor: pointer;
}

.working-times-button:hover {
    background: var(--white-hover);
}

.working-times-forms {
    margin-bottom: 30px;
}

.working-times-nb {
    margin: 30px 0;
}

.workingtimes-all {

}

</style>
