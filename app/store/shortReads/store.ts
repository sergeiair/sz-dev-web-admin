import { create } from 'zustand'
import { ShortRead } from '~/dto/short-read';
import { SecuredHttp } from '~/http/secured-http';


export const useCreateShortReadStore = create((set, get) => ({
	items: [],
	current: {
		id: null,
		title: '',
		content: '',
		preview: '',
		urlAlias: ''
	},
	setCurrent: async (item: ShortRead) => {
		set({current: item})
	},
	set: (key: string, value: string) => set((state: { current: ShortRead }) => ({
		current: {
			...state.current ?? {},
			[key]: value
		}
	})),
	getAll: async () => {
		const response = await SecuredHttp.get(`${window?.ENV?.BASE_S_URL}/api/v1/forme/short-reads`)
		const json = await response.json()

		set({items: json?.data ?? []})
	},
	create: async (item: ShortRead) => {
		const response = await SecuredHttp.post(`${window?.ENV?.BASE_S_URL}/api/v1/forme/short-reads`, item)

		if (response.status === 201) {
			// @ts-ignore
			get().clear();
			// @ts-ignore
			get().getAll();
		}
	},
	update: async (item: ShortRead) => {
		const response = await SecuredHttp.put(`${window?.ENV?.BASE_S_URL}/api/v1/forme/short-reads`, item)

		if (response.status === 200) {
			// @ts-ignore
			get().clear();
			// @ts-ignore
			get().getAll();
		}
	},
	clear: () => {
		set({
			current: {
				id: null,
				title: '',
				content: '',
				preview: ''
			}
		})
	}

}))
