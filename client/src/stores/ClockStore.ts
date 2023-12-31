import { create } from "zustand-vue";
import { ClockService } from "../services/ClockService";
import { Clock } from "../types/Clock";
import { state } from "vue-tsc/out/shared";

const clockService = new ClockService();

export type ClockState = {
	data: Clock[]
	clockIn: boolean;
	autoSetData(userId: string): Promise<void>;
	clock(userId: string): Promise<void>;
}

export const ClockStore = create<ClockState>(
	(set) => ({
		data: [],
		clockIn: false,

		autoSetData: (userId: string): Promise<void>  => {
			return new Promise((resolve, reject) => {
				clockService.get(userId).then(async (response) => {
					if (!response.ok) {
						return;
					}

					const jsonResponse = await response.json();
					const data = jsonResponse.data;

					set({ data: data, clockIn: data.at(-1).status });
				}).catch((error) => {
					console.log(error);
				}).finally(() => {
					resolve()
				});
			})
		},

		clock: (userId: string): Promise<void> => {
			return new Promise((resolve, reject) => {
				clockService.add(userId).then(async (response) => {
					if (!response.ok) {
						return;
					}

					const jsonResponse = await response.json();
					const data = jsonResponse.data;

					set((state) => {
						const _data = [...state.data, data];
						return { data: _data, clockIn: _data.at(-1).status };
					});
				}).catch((error) => {
					console.log(error);
				}).finally(() => {
					resolve();
				});
			})
		}
	})
)
