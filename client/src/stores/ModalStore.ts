import create from "zustand-vue";

export type ModalState = {
	isOpen: boolean;
	component: undefined;
	openModal(component: any): void;
	closeModal(): void;
}

export const ModalStore = create<ModalState>((set) => ({
	isOpen: false,
	component: undefined,

	openModal: (component: any) => {
		set({ isOpen: true, component });
	},

	closeModal: () => {
		set({ isOpen: false, component: undefined });
	}
}));