import { create } from "zustand-vue";
import {WorkingTimeService} from "../services/WorkingTimeService";
import {WorkingTime} from "../types/WorkingTime";


export type WorkingTimeState = {
    workingTimes: WorkingTime[];
    currentWorkingTime: WorkingTime | null;
    getWorkingTimeByUserId: (workingTime: WorkingTime) => void;
    add: (workingTime: WorkingTime) => void;
    findById: (workingTimeId: number) => void;
    updateById: (workingTimeId: number, data: WorkingTime) => void;
    deleteById: (workingTimeId: string) => void;
    error: string | null;
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
    error: "",
    getWorkingTimeByUserId: (workingTime: WorkingTime) => {
        workingTimeService.getByUserId(workingTime)
            .then(async (response: any) => {
                if(!response.ok) {
                    return
                }
                const jsonResponse = await response.json();
                const data = jsonResponse.data;
                set({workingTimes: data})
            })
            .catch((err) => {
                console.error(err.message)
            })
    },
    add: (data: WorkingTime) => {
        workingTimeService.addByUserId(data)
            .then(async (response: any):Promise<void>=> {
                if(!response.ok) {
                    const jsonResponse = await response.json();
                    set(()  => {
                        return {error: jsonResponse.error }
                    })
                }
                const jsonResponse = await response.json();
                const data = jsonResponse.data;
                set((state: any) => {
                    let _workingTimes: any = [...state.workingTimes]
                    _workingTimes.push(data)
                    return {workingTimes: _workingTimes, error: ""}
                })
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
        workingTimeService.updateById(workingTimeId , data)
            .then(async (response: any) => {
                if(!response.ok) {
                    const jsonResponse = await response.json();
                    set(()  => {
                        return {error: jsonResponse.error }
                    })
                }
                const jsonResponse = await response.json();
                const data = jsonResponse.data;
                set((state: any) => {
                    let _workingTimes = [...state.workingTimes];
                    const _updateWonkingTime = _workingTimes.map((workingTime) => {
                        if(workingTime.id === data.id) {
                            return data
                        } else {
                            return workingTime
                        }
                    })
                    return {workingTimes: _updateWonkingTime, error: ""}
                })
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
