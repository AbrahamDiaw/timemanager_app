import create from "zustand-vue";
import { Components } from "../components/_components/Components";

export type ModalState = {
	isOpen: boolean;
	componentName: undefined | Components;
	openModal(component: any): void;
	closeModal(): void;
}

export const ModalStore = create<ModalState>((set) => ({
	isOpen: false,
	componentName: undefined,

	openModal: (componentName: Components) => {
		set({ isOpen: true, componentName });
	},

	closeModal: () => {
		set({ isOpen: false, componentName: undefined });
	}
}));