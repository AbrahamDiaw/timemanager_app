import { WorkingTimeService } from "../services/WorkingTimeService";
import { WorkingTime } from "../types/WorkingTime";

interface WorkingTimeState {
	workingTimes: WorkingTime[];
	workingTimeByUserIdAndId: WorkingTime | null;
}

const initialState: WorkingTimeState = {
	workingTimes: [],
	workingTimeByUserIdAndId: null,
};

const workingTimesService = new WorkingTimeService();

export const WorkingTimeStore = {
	state: initialState,

	mutations: {
		setByUserIdAndId(state: any, data: any) {
			state.workingTimes = data
		}
	},
	actions: {
		 getWorkingTimeByUserId({ state, commit }: { state: WorkingTimeState }, userId: string): void {
			 workingTimesService.getByUserId(userId).then((workingTimes) => {
				 console.log("erere", workingTimes)
				 commit("setByUserIdAndId",workingTimes )
			 });
		},
		
		async getByUserIdAndId({ state }: { state: WorkingTimeState }, userId: string, workingTimesId: string): Promise<void> {
			state.workingTimeByUserIdAndId = await workingTimesService.getByUserIdAndId(userId, workingTimesId)
		},
		
		async addByUserId({ state }: { state: WorkingTimeState }, userId: string, data: WorkingTime): Promise<void> {
			const _workingTime = await workingTimesService.addByUserId(userId, data)
			state.workingTimes.push(_workingTime)
		},
		async updateById({ state }: { state: WorkingTimeState }, workingTimesId: string, data: WorkingTime): Promise<void> {
			state.workingTimeByUserIdAndId = await workingTimesService.updateById(workingTimesId, data)
		},
		
		async deleteById({ state }: { state: WorkingTimeState }, workingTimesId: string): Promise<void> {
			state.workingTimeByUserIdAndId = await workingTimesService.deleteById(workingTimesId)
		},
	},
};