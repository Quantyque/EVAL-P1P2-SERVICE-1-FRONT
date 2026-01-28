<script setup lang="ts">
import { useQuestStore } from '~/stores/quest';


const questStore = useQuestStore();
const router = useRouter();
const apiError = ref<string | null>(null);

const handleCreate = async (data: any) => {
  try {
    apiError.value = null;
    await questStore.createQuest(data);
    router.push('/quests');
  } catch (e: any) {
    // Basic error handling for 400 Bad Request (e.g., Duplicate Code)
    apiError.value = e.data?.detail || e.message || 'An error occurred';
  }
};
</script>

<template>
  <div>
    <h1 class="title">Create New Quest</h1>
    
    <div v-if="apiError" class="card error-card mb-6">
      <p>{{ apiError }}</p>
    </div>

    <QuestForm @submit="handleCreate" />
  </div>
</template>

<style scoped>
.error-card {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--error);
  color: var(--error);
}
.mb-6 { margin-bottom: 1.5rem; }
</style>
