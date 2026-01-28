import { defineStore } from 'pinia';
import type { PlayerQuest } from '~/types';
import { playerService } from '~/services/player.service';

export const usePlayerStore = defineStore('players', () => {
    const playerQuests = ref<PlayerQuest[]>([]);
    const loading = ref(false);

    const fetchPlayerQuests = async (playerId: string) => {
        loading.value = true;
        try {
            playerQuests.value = await playerService.getQuests(playerId);
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
