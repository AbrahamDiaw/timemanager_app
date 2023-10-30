import { create } from "zustand-vue";
import {WorkingTimeService} from "../services/WorkingTimeService";
import {WorkingTime} from "../types/WorkingTime";
import {User} from "../types/User";
import workingTimes from "../components/pages/WorkingTimes.vue";


export type WorkingTimeState = {
    workingTimes: WorkingTime[];
    currentWorkingTime: WorkingTime | null;
    getWorkingTimeByUserId: (workingTime: WorkingTime) => void;
    findById: (workingTimeId: string) => void;
    updateById: (workingTimeId: string) => void;
    deleteById: (workingTimeId: string) => void;
}

const workingTimeService = new WorkingTimeService()

export const WorkingTimeStore = create<WorkingTimeState>(
    (set) => ({
    workingTimes: [],
    currentWorkingTime: {
        id: "",
        start: "",
        end: "",
    },
    getWorkingTimeByUserId: (workingTime: WorkingTime) => {
        workingTimeService.getByUserId(workingTime)
            .then((workingTimes) => {
                set({workingTimes})
            })
            .catch((err) => {
                console.error(err.message)
            })
    },
    findById(workingTimeId: string) {
        set((state: any): any => {
            const _currentWorkingTime = state.workingTimes.find((workingtime: any) => workingtime.id === workingTimeId)
            if(_currentWorkingTime) {
               return { currentWorkingTime: _currentWorkingTime };
            }

        })
    },
    updateById: (workingTimeId: string, data: WorkingTime) => {
        workingTimeService.updateById(workingTimeId, data)
            .then((newWorkingTime) => {

            })
            .catch((err) => {
                console.log(err.message)
            })

    },
    deleteById: (workingTimeId: string) => {
        workingTimeService.deleteById(workingTimeId)
            .then((res) => {
                set((state: any): any => {
                    const index = state.workingTimes.findIndex((workingTime: WorkingTime) => workingTime.id === workingTimeId)
                    if (index !== -1) {
                        const workingTimes = [...state.workingTimes];
                        workingTimes.splice(index, 1);
                        return { workingTimes };
                    }
                });
            })
            .catch((err) => {
                console.error(err.message);
            });
    }
}));
