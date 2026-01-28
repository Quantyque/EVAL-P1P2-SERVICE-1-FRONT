import { defineStore } from 'pinia';
import type { PlayerQuest } from '~/types';

export const usePlayerStore = defineStore('players', () => {
    const api = useApi();
    const playerQuests = ref<PlayerQuest[]>([]);
    const loading = ref(false);

    const fetchPlayerQuests = async (playerId: string) => {
        loading.value = true;
        try {
            playerQuests.value = await api.get<PlayerQuest[]>(`/players/${playerId}/quests`);
        } finally {
            loading.value = false;
        }
    };

    return {
        playerQuests,
        loading,
        fetchPlayerQuests
    };
});
