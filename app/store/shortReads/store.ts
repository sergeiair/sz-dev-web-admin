import { create } from 'zustand'
import { ShortRead } from '~/dto/short-read';
import { SecuredHttp } from '~/http/secured-http';


export const useCreateShortReadStore = create((set, get) => ({
	items: [],
	current: {
		id: null,
		title: '',
		tags: [ ],
		published: false,
		content: '',
		preview: '',
		urlAlias: ''
	},
	setCurrent: async (item: ShortRead) => {
		set({current: {
			...item,
				tags: item.tags?.map(tag => tag.id) ?? [],
			}
		})
	},
	setProp: (key: string, value: string) => set((state: { current: ShortRead }) => ({
		current: {
			...state.current ?? {},
			[key]: value
		}
	})),
	getAll: async () => {
		const response = await SecuredHttp.get(`${window?.ENV?.BASE_S_URL}/api/v1/not4u/short-reads`)
		const json = await response.json()

		set({items: json?.data ?? []})
	},
	create: async (item: ShortRead) => {
		const response = await SecuredHttp.post(`${window?.ENV?.BASE_S_URL}/api/v1/not4u/short-reads`, item)

		if (response.status === 201) {
			// @ts-ignore
			get().clear();
			// @ts-ignore
			get().getAll();
		}
	},
	update: async (item: ShortRead) => {
		const response = await SecuredHttp.put(`${window?.ENV?.BASE_S_URL}/api/v1/not4u/short-reads`, item)

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
