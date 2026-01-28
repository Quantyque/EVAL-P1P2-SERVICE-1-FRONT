import { defineStore } from 'pinia';
import type { Quest } from '~/types';
import { questService } from '~/services/quest.service';

export const useQuestStore = defineStore('quests', () => {
    const quests = ref<Quest[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchQuests = async (activeOnly = false, search = '') => {
        loading.value = true;
        error.value = null;
        try {
            quests.value = await questService.getAll(activeOnly, search);
        } catch (e: any) {
            error.value = e.message || 'Failed to fetch quests';
        } finally {
            loading.value = false;
        }
    };

    const getQuestById = async (id: string) => {
        return await questService.getById(id);
    };

    const createQuest = async (quest: Partial<Quest>) => {
        return await questService.create(quest);
    };

    const updateQuest = async (id: string, quest: Partial<Quest>) => {
        return await questService.update(id, quest);
    };

    const deleteQuest = async (id: string) => {
        await questService.delete(id);
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
