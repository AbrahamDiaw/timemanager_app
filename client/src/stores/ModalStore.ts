import create from "zustand-vue";
import { Components } from "../components/_components/Components";

export type ModalState = {
	isOpen: boolean;
	componentName: undefined | Components;
	componentProps: undefined;
	openModal(component: any, props?: any): void;
	closeModal(): void;
}

export const ModalStore = create<ModalState>((set) => ({
	isOpen: false,
	componentName: undefined,
	componentProps: undefined,

	openModal: (componentName: Components, componentProps) => {
		console.log("props:", componentProps)
		set({ isOpen: true, componentName, componentProps });
	},

	closeModal: () => {
		set({ isOpen: false, componentName: undefined });
	}
}));