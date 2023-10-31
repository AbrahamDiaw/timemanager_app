import { create } from "zustand-vue";
import { ClockService } from "../services/ClockService";

const clockService = new ClockService();

export type ClockState = {
	startDatetime: any;
	clockIn: boolean;
	clock(userId: string): void;
	refresh(): void;
}

export const ClockStore = create<ClockState>(
	(set) => ({
		startDatetime: undefined,
		clockIn: false,

		clock: (userId: string) => {
			console.log("koko", userId);
			/*
			clockService.addByUserId(userId,  {
				time: new Date("now"),
				status: true
			}).then((jsonData) => {
				console.log(jsonData);
			});

			 */
		},

		refresh: () => {
			console.log("----------okokokoko")

		}
	})
)