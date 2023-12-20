import { create } from 'zustand'
import { ClientStorage, ClientStorageKeys } from '~/storage/client-storage';
import { ShortRead } from '~/dto/short-read';
import { SecuredHttp } from '~/http/secured-http';


export const useUserStore = create((set, get) => ({
	accessToken: null,
	idToken: null,
	setSession: (accessToken: string, idToken: string) => set(() => {
		SecuredHttp.setTokens(accessToken, idToken)

		return {
			accessToken,
			idToken
		}
	}),
	logIn: async (email: string, pw: string) => {
		const response = await fetch(`${window?.ENV?.BASE_R_URL}/not4u/auth`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({
				email, pw
			})
		})

		const json = await response.json()

		// @ts-ignore
		get().setSession(json?.result?.AccessToken, json?.result?.IdToken)

		ClientStorage.set(ClientStorageKeys.accessToken, json?.result?.AccessToken)
		ClientStorage.set(ClientStorageKeys.idToken, json?.result?.IdToken)
	},
	getUser: async () => {
		const response = await fetch(`${window?.ENV?.BASE_R_URL}/not4u/current`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({
				accessToken: get()?.accessToken,
				idToken: get()?.idToken,
			})
		})


		if (response.status !== 200) {
			get()?.setSession(null, null);
		}
	},

}))
