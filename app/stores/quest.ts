import { defineStore } from 'pinia';
import type { Quest } from '~/types';

export const useQuestStore = defineStore('quests', () => {
    const api = useApi();
    const quests = ref<Quest[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchQuests = async (activeOnly = false, search = '') => {
        loading.value = true;
        error.value = null;
        try {
            const params = new URLSearchParams();
            if (activeOnly) params.append('isActive', 'true');
            if (search) params.append('search', search);

            // Note: In real SSR usage, useAsyncData is preferred in the page component,
            // but this action is useful for client-side filtering/refreshing.
            quests.value = await api.get<Quest[]>(`/quests?${params.toString()}`);
        } catch (e: any) {
            error.value = e.message || 'Failed to fetch quests';
        } finally {
            loading.value = false;
        }
    };

    const getQuestById = async (id: string) => {
        return await api.get<Quest>(`/quests/${id}`);
    };

    const createQuest = async (quest: Partial<Quest>) => {
        return await api.post<string>('/quests', quest);
    };

    const updateQuest = async (id: string, quest: Partial<Quest>) => {
        return await api.put(`/quests/${id}`, quest);
    };

    const deleteQuest = async (id: string) => {
        await api.delete(`/quests/${id}`);
        quests.value = quests.value.filter(q => q.id !== id);
    };

    return {
        quests,
        loading,
        error,
        fetchQuests,
        getQuestById,
        createQuest,
        updateQuest,
        deleteQuest
    };
});
