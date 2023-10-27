import { WorkingTimeService } from "../../services/WorkingTimeService";
import { WorkingTime } from "../../types/WorkingTime";
import {Module} from "vuex";
import {Clock} from "../../types/Clock";

interface WorkingTimeState {
	workingTimes: WorkingTime[];
	currentWorkingTime: WorkingTime | null;
}

const initialState: WorkingTimeState = {
	workingTimes: [],
	currentWorkingTime: null,
};

const workingTimesService = new WorkingTimeService();

export const WorkingTimeModule:  Module<any, any>  = {
	state: () => initialState,

	mutations: {
		setWorkingTimes(state: any, data: any) {
			state.workingTimes = data
		},
		setWorkingTime(state: any, data: any) {
			state.currentWorkingTime = data
		},
		addWorkingTime(state: any, data: any) {
			state.workingTimes.push(data)
		}
	},
	actions: {
		 getWorkingTimeByUserId({ state, commit }: { state: WorkingTimeState, commit: any }, userId: string): void {
			 workingTimesService.getByUserId(userId).then((workingTimes) => {
				 commit("setWorkingTimes",workingTimes )
			 });
		},
		/*getByUserIdAndId({ state, commit }: { state: WorkingTimeState, commit: any }, userId: string, workingTimesId: string): void {
			workingTimesService.getByUserIdAndId(userId, workingTimesId).then((workingTime) => {
				commit("setWorkingTime",workingTime )
			})
		},
		 addByUserId({ state, commit }: { state: WorkingTimeState, commit: any }, userId: string, data: WorkingTime): void {
			 workingTimesService.addByUserId(userId, data).then((workingTime)=> {
				 commit("addWorkingTime",workingTime)
			 })
		},*/
		// updateById({ state }: { state: WorkingTimeState }, workingTimesId: string, data: WorkingTime): Promise<void> {
		// 	state.currentWorkingTime = await workingTimesService.updateById(workingTimesId, data)
		// },
		//
		// deleteById({ state }: { state: WorkingTimeState }, workingTimesId: string): Promise<void> {
		// 	state.currentWorkingTime = await workingTimesService.deleteById(workingTimesId)
		// },
	},
};