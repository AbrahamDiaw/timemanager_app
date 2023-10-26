import { createStore } from "vuex";
import { ClockModule } from "./ClockModule";
import { WorkingTimeModule } from "./WorkingTimeModule";
import { UserModule } from "./UserModule";

export const store = createStore({
	modules: {
		Clocks: ClockModule,
		WorkingTime: WorkingTimeModule,
		User: UserModule
	}
})