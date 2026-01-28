export interface Quest {
    id: string;
    code: string;
    title: string;
    description?: string;
    type: 'DungeonCompletion' | 'CombatWon';
    targetCount: number;
    isActive: boolean;
    startAt?: string;
    endAt?: string;
    reward?: string;
}

export interface PlayerQuest {
    id: string;
    playerId: string;
    questId: string;
    status: 'NotStarted' | 'InProgress' | 'Completed' | 'Claimed';
    progressCount: number;
    completedAt?: string;
    updatedAt: string;
    // Enriched data from joining
    questTitle?: string;
    questDescription?: string;
    questTarget?: number;
}
