import { create } from "zustand-vue";
import {WorkingTimeService} from "../services/WorkingTimeService";
import {WorkingTime} from "../types/WorkingTime";
import {User} from "../types/User";
import workingTimes from "../components/pages/WorkingTimes.vue";


export type WorkingTimeState = {
    workingTimes: WorkingTime[];
    currentWorkingTime: WorkingTime | null;
    getWorkingTimeByUserId: (workingTime: WorkingTime) => void;
    findById: (workingTimeId: number) => void;
    updateById: (workingTimeId: number, data: WorkingTime) => void;
    deleteById: (workingTimeId: number) => void;
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
    findById(workingTimeId: number) {
        set((state: any): any => {
            const _currentWorkingTime = state.workingTimes.find((workingtime: any) => workingtime.id === workingTimeId)
            if(_currentWorkingTime) {
               return { currentWorkingTime: _currentWorkingTime };
            }

        })
    },
    updateById: (workingTimeId: number, data: WorkingTime) => {
        console.log(workingTimeId)
        workingTimeService.updateById(workingTimeId, data)
            .then((newWorkingTime): any => {
                set((state: any) => {
                    let _workingTimes = [...state.workingTimes];
                    const _updateWonkingTime = _workingTimes.map((workingTime) => {
                        if(workingTime.id === newWorkingTime.id) {
                            return newWorkingTime
                        } else {
                            return workingTime
                        }
                    })
                    return {workingTimes: _updateWonkingTime}
                })
            })
            .catch((err) => {
                console.log(err.message)
            })

    },
    deleteById: (workingTimeId: number) => {
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
