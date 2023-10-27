import { create } from "zustand-vue";
import {WorkingTimeService} from "../services/WorkingTimeService";
import {WorkingTime} from "../types/WorkingTime";


export type WorkingTimeState = {
    workingTimes: WorkingTime[];
    currentWorkingTime: WorkingTime | null;
    getWorkingTimeByUserId: (workingTime: WorkingTime) => void
}

const workingTimeService = new WorkingTimeService()

export const WorkingTimeStore = create<WorkingTimeState>((set) => ({
    workingTimes: [],
    getWorkingTimeByUserId: (workingTime: WorkingTime) => {
        workingTimeService.getByUserId(workingTime)
            .then((workingTimes) => {
                set({workingTimes})
            })
            .catch((err) => {
                console.error(err.message)
            })
    }
}));
