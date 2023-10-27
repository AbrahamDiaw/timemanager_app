import { Module } from 'vuex';
import { Clock } from "../../types/Clock";
import { ClockService } from "../../services/ClockService";

interface ClockState {
	dataByUserId: Clock[];
	isLoadingByUserId: boolean;
}


const initialState: ClockState = {
	dataByUserId: [],
	isLoadingByUserId: false
};

const clockService = new ClockService();

export const ClockModule: Module<any, any> = {
	state: () => initialState,
	getters: {
		getByUserId: (state: ClockState) => {
			return {
				dataByUserId: state.dataByUserId,
				isLoadingByUserId: state.isLoadingByUserId
			};
		}
	},
	actions: {
		async addByUserId({ state }: { state: ClockState }, payload:  { id: string; data: Clock } ):Promise<void> {
			const { id, data }: { id: string; data: Clock } = payload;
			// let clock: any = await clockService.addByUserId(id, data);
			// state.dataByUserId.push(clock)
			console.log(id);
			console.log(data)
			// Commit a mutation to update the state if needed.
			// state.dataByUserId.push(clock);
		},
		async getAllByUserId({ state }: { state: ClockState }, payload: { id: string }): Promise<void> {
			const { id }: { id: string} = payload;
			// state.dataByUserId = await clockService.getClockByUserId(id);
			console.log(id)
		}
	}
};