import type { Quest } from '~/types';

export const questService = {
    getAll: async (activeOnly = false, search = '') => {
        const api = useApi();
        const params = new URLSearchParams();
        if (activeOnly) params.append('isActive', 'true');
        if (search) params.append('search', search);
        return await api.get<Quest[]>(`/quests?${params.toString()}`);
    },

    getById: async (id: string) => {
        const api = useApi();
        return await api.get<Quest>(`/quests/${id}`);
    },

    create: async (quest: Partial<Quest>) => {
        const api = useApi();
        return await api.post<Quest>('/quests', quest);
    },

    update: async (id: string, quest: Partial<Quest>) => {
        const api = useApi();
        return await api.put<void>(`/quests/${id}`, quest);
    },

    delete: async (id: string) => {
        const api = useApi();
        return await api.delete<void>(`/quests/${id}`);
    }
};
