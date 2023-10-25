import { WorkingTimeService } from "../services/WorkingTimeService.ts";
import { WorkingTime } from "../types/WorkingTime.ts";

interface WorkingTimeState {
	workingTimeByUserId: WorkingTime[];
	workingTimeByUserIdAndId: WorkingTime | null;
}

const initialState: WorkingTimeState = {
	workingTimeByUserId: [],
	workingTimeByUserIdAndId: null,
};

const workingTimesService = new WorkingTimeService();

export const WorkingTimeStore = {
	state: initialState,
	
	getters: {
		getWorkingTime(state: WorkingTimeState): WorkingTimeState {
			return state;
		},
	},
	
	actions: {
		async getByUserId({ state }: { state: WorkingTimeState }, userId: string): Promise<void> {
			state.workingTimeByUserId = await workingTimesService.getByUserId(userId)
		},
		
		async getByUserIdAndId({ state }: { state: WorkingTimeState }, userId: string, workingTimesId: string): Promise<void> {
			state.workingTimeByUserIdAndId = await workingTimesService.getByUserIdAndId(userId, workingTimesId)
		},
		
		async addByUserId({ state }: { state: WorkingTimeState }, userId: string, data: WorkingTime): Promise<void> {
			const _workingTime = await workingTimesService.addByUserId(userId, data)
			state.workingTimeByUserId.push(_workingTime)
		},
		async updateById({ state }: { state: WorkingTimeState }, workingTimesId: string, data: WorkingTime): Promise<void> {
			state.workingTimeByUserIdAndId = await workingTimesService.updateById(workingTimesId, data)
		},
		
		async deleteById({ state }: { state: WorkingTimeState }, workingTimesId: string): Promise<void> {
			state.workingTimeByUserIdAndId = await workingTimesService.deleteById(workingTimesId)
		},
	},
};