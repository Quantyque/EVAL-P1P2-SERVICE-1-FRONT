<script setup lang="ts">
import { useQuestStore } from '~/stores/quest';

const route = useRoute();
const router = useRouter();
const questStore = useQuestStore();
const apiError = ref<string | null>(null);

const id = route.params.id as string;

// Fetch data on load
const { data: quest } = await useAsyncData(`quest-${id}`, async () => {
  return await questStore.getQuestById(id);
});

const handleUpdate = async (data: any) => {
  try {
    apiError.value = null;
    await questStore.updateQuest(id, data);
    router.push('/quests');
  } catch (e: any) {
    apiError.value = e.data?.detail || e.message || 'An error occurred';
  }
};
</script>

<template>
  <div>
    <h1 class="title">Edit Quest</h1>
    
    <div v-if="apiError" class="card error-card mb-6">
      <p>{{ apiError }}</p>
    </div>

    <QuestForm v-if="quest" :initial-data="quest" :is-edit="true" @submit="handleUpdate" />
    <div v-else class="text-center">Loading...</div>
  </div>
</template>

<style scoped>
.error-card {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--error);
  color: var(--error);
}
.mb-6 { margin-bottom: 1.5rem; }
.text-center { text-align: center; color: var(--text-muted); }
</style>
