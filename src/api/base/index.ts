const BASE_URL = process.env.EXPO_PUBLIC_API_BASE;

type RequestConfig = {
	headers?: Record<string, string>;
};

const defaultHeaders: Record<string, string> = {
	'Content-Type': 'application/json',
};

export const API = {
	async get<T>(path: string, config?: RequestConfig): Promise<T> {
		const response = await fetch(`${BASE_URL}${path}`, {
			method: 'GET',
			headers: { ...defaultHeaders, ...config?.headers },
		});

		if (!response.ok) {
			throw new Error(`API Error [${response.status}]: ${path}`);
		}

		return response.json();
	},
};
