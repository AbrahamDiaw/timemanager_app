<script lang="ts">
import { WorkingTimeStore } from "../../../stores/WorkingTimeStore";
import { WorkingTime } from "../../../types/WorkingTime";
import { UDate } from "../../../utils/UDate";

export default {
	name: "EditWorkingTime",
	data(): any {
		let id = '';
		let start = '';
		let end = '';
		return {
			id,
			start,
			end,
			error: WorkingTimeStore((state) => state.error)
		}
	},
	methods: {
		editWorkingTimes() {
			WorkingTimeStore((state) => state.updateById(Number(this.id), { start: this.start, end: this.end }))
		}
	},
	mounted() {
		WorkingTimeStore((state) => {
			if (state.currentWorkingTime) {
				this.id = state.currentWorkingTime.id || ''

				this.start = UDate.formatDateForInput(state.currentWorkingTime.start)

				this.end = UDate.formatDateForInput(state.currentWorkingTime.end)
			}
		})
	}
}
</script>

<template>
    <form @submit.prevent="editWorkingTimes" class="form">
        <div class="form-field">
            <strong>start:</strong>
            <input class="form-input" type="datetime-local" id="start" v-model="start">
        </div>

        <div class="form-field">
            <strong>end:</strong>
            <input class="form-input" type="datetime-local" id="end" v-model="end">
        </div>

        <div class="form-error">
            <p v-if="error">{{ error }}</p>
        </div>

        <button class="form-button" type="submit">Submit</button>
    </form>
</template>

<style scoped>

</style>
