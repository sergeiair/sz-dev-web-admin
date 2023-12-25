
export enum ClientStorageKeys {
	accessToken = "accessToken",
	idToken = "idToken",
	content = "content"
}

export class ClientStorage {

	public static get(key: ClientStorageKeys): string | null{
		return window?.localStorage?.getItem(key);
	}

	public static set(key: ClientStorageKeys, value: string): void {
		window?.localStorage?.setItem(key, value);
	}

	public static remove(key: ClientStorageKeys): void {
		window?.localStorage?.removeItem(key);
	}

	public static clear(): void {
		window?.localStorage?.clear();
	}

}
