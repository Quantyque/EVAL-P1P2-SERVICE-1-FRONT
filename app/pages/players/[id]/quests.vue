<script setup lang="ts">
import { usePlayerStore } from '~/stores/player';
import { ArrowLeft, Clock } from 'lucide-vue-next';

const route = useRoute();
const playerStore = usePlayerStore();
const playerId = route.params.id as string;

// Fetch player data
// Use client-side fetch here as it's dynamic user data, though SSR is fine too.
// We'll use onMounted or useAsyncData. useAsyncData is cleaner in Nuxt.
await useAsyncData(`player-${playerId}`, async () => {
  await playerStore.fetchPlayerQuests(playerId);
  return true;
});

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Completed': return 'badge-success';
    case 'InProgress': return 'badge-info';
    case 'NotStarted': return 'badge-neutral';
    default: return 'badge-neutral';
  }
};
</script>

<template>
  <div>
    <div class="header">
      <div>
        <NuxtLink to="/quests" class="back-link">
          <ArrowLeft :size="16" /> Back to Board
        </NuxtLink>
        <h1 class="title">Player Progress: <span class="highlight">{{ playerId }}</span></h1>
      </div>
    </div>

    <div class="grid grid-player">
      <div v-for="pq in playerStore.playerQuests" :key="pq.id" class="card quest-card">
        <div class="quest-header">
           <h3 class="quest-title">{{ pq.questTitle }}</h3>
           <span :class="['badge', getStatusBadge(pq.status)]">{{ pq.status }}</span>
        </div>
        
        <p class="quest-desc">{{ pq.questDescription }}</p>
        
        <div class="progress-bar-container">
          <div class="progress-info">
            <span>Progress</span>
            <span>{{ pq.progressCount }} / {{ pq.questTarget }}</span>
          </div>
          <div class="progress-track">
             <div 
               class="progress-fill" 
               :style="{ width: `${Math.min((pq.progressCount / (pq.questTarget || 1)) * 100, 100)}%` }"
             ></div>
          </div>
        </div>

        <div class="meta">
            <span class="meta-item"><Clock :size="14" /> Updated: {{ new Date(pq.updatedAt).toLocaleDateString() }}</span>
        </div>
      </div>

      <div v-if="playerStore.playerQuests.length === 0" class="card empty-state">
        <p>No active quests found for this player.</p>
        <small>Simulate some gameplay to see quests appear!</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header { margin-bottom: 2rem; }
.back-link { 
  display: inline-flex; align-items: center; gap: 0.5rem; 
  color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;
}
.highlight { color: var(--primary); }

.grid-player {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.quest-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quest-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.quest-title { font-size: 1.1rem; font-weight: 600; color: var(--text-main); }
.quest-desc { font-size: 0.9rem; color: var(--text-muted); flex: 1; }

.badge-success { background: rgba(16, 185, 129, 0.2); color: var(--success); }
.badge-info { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
.badge-neutral { background: rgba(161, 161, 170, 0.1); color: var(--text-muted); }

.progress-track {
  height: 6px;
  background: var(--bg-surface);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.meta {
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.75rem;
  margin-top: auto;
}

.meta-item {
  display: flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; color: var(--text-muted);
}
</style>
