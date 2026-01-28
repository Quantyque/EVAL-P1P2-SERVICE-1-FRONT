import type { PlayerQuest } from '~/types';

export const playerService = {
    getQuests: async (playerId: string) => {
        const api = useApi();
        return await api.get<PlayerQuest[]>(`/players/${playerId}/quests`);
    }
};
