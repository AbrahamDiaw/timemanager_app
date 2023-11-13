<script>

import {reactive} from "vue";
import {WorkingTimeStore} from "../../../stores/WorkingTimeStore";
import {UDate} from "../../../utils/UDate";

export default {
    name: "AddWorkingTime",
    data() {
        return {
            id: this.$route.params.id,
            start: "",
            end: "",
            error: WorkingTimeStore((state) => state.error)
        }
    },
    methods: {
        AddWorkingTimes() {
            const workingTime = {
                id: this.id,
                start: UDate.formatDateForInput(this.start) + ':00Z',
                end: UDate.formatDateForInput(this.end) + ':00Z'
            }
            WorkingTimeStore((state) => state.add(workingTime))
        }
    },
    mounted() {
        this.$watch(() => this.$route.params.id, (to, from) => {
            this.autoSetTitle();
        })
    }
}
</script>
<template>
    <form @submit.prevent="AddWorkingTimes" class="form">
        <div class="form-field-container">
            <div class="form-field">
                <strong>start:</strong>
                <input class="form-input" type="datetime-local" id="start" v-model="start">
            </div>

            <div class="form-field">
                <strong>end:</strong>
                <input class="form-input" type="datetime-local" id="end" v-model="end">
            </div>
        </div>

        <div class="form-error">
            <p v-if="error">{{ error }}</p>
        </div>

        <button class="form-button" type="submit">Submit</button>
    </form>
</template>
