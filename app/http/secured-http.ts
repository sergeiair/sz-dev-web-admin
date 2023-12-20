
export class SecuredHttp {

	static #accessToken: string | null = null
	static #idToken: string | null = null

	public static setTokens(accessToken: string, idToken: string) {
		SecuredHttp.#accessToken = accessToken
		SecuredHttp.#idToken = idToken
	}

	public static async get(url: string, options?: any): Promise<Response> {
		return SecuredHttp.request('GET', url, options);
	}

	public static async post(url: string, options?: any): Promise<Response> {
		return SecuredHttp.request('POST', url, options);
	}

	public static async put(url: string, options?: any): Promise<Response> {
		return SecuredHttp.request('PUT', url, options);
	}

	public static async delete(url: string, options?: any): Promise<Response> {
		return SecuredHttp.request('DELETE', url, options);
	}

	public static async request(method: string, url: string, data?: any): Promise<Response> {
		return await fetch(
			url, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': SecuredHttp.#accessToken ? `Bearer ${SecuredHttp.#accessToken}` : '',
			},
			method: method,
			body: !!data && typeof data === 'object' ? JSON.stringify(data) : null
		});
	}
}
