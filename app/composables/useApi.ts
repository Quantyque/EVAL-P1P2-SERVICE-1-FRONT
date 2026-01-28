export const useApi = () => {
    // Hardcoded for dev simplicity if env not set, typically 'http://localhost:5301'
    const baseURL = 'http://localhost:5301';

    const isLoading = useState<boolean>('isLoading', () => false);

    const request = async <T>(url: string, options: any = {}) => {
        // Only trigger global overlay on client-side to avoid SSR hydration issues (stuck loader)
        if (import.meta.client) {
            isLoading.value = true;
        }

        try {
            return await $fetch<T>(url, { baseURL, ...options });
        } finally {
            if (import.meta.client) {
                setTimeout(() => isLoading.value = false, 300);
            }
        }
    };

    return {
        get: <T>(url: string) => request<T>(url),
        post: <T>(url: string, body: any) => request<T>(url, { method: 'POST', body }),
        put: <T>(url: string, body: any) => request<T>(url, { method: 'PUT', body }),
        delete: <T>(url: string) => request<T>(url, { method: 'DELETE' }),
    };
};
