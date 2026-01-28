<script setup lang="ts">
import { Plus, Search, Edit2, Trash2 } from 'lucide-vue-next';
import { useQuestStore } from '~/stores/quest';

// SSR Data Fetching
const questStore = useQuestStore();
// We use useAsyncData to ensure server-side rendering of the list
const { data: quests, refresh } = await useAsyncData('quests', async () => {
  await questStore.fetchQuests();
  return questStore.quests;
});

// Client-side interactions
const search = ref('');
const activeOnly = ref(false);

const handleSearch = async () => {
  await questStore.fetchQuests(activeOnly.value, search.value);
  // Update local ref to match store state (since useAsyncData only ran once on server/init)
  // Actually, fetchQuests updates the store state, so we should rely on store.quests if we want client reactivity
  // OR we can just refresh the async data if we passed params to it.
  // For simplicity, we'll map the store state to a computed if we want reactivity after client actions
};

// Computed property to reflect store changes (client-side filtering results)
const displayedQuests = computed(() => questStore.quests);

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this quest?')) {
    await questStore.deleteQuest(id);
  }
};
</script>

<template>
  <div>
    <div class="header">
      <h1 class="title">Quest Board</h1>
      <NuxtLink to="/quests/new" class="btn btn-primary">
        <Plus :size="18" />
        New Quest
      </NuxtLink>
    </div>

    <div class="card mb-6">
      <div class="filters">
        <div class="search-box">
          <Search class="search-icon" :size="18" />
          <input 
            v-model="search" 
            placeholder="Search by code or title..." 
            @input="handleSearch"
          />
        </div>
        <div class="toggle">
          <label class="checkbox-label">
            <input type="checkbox" v-model="activeOnly" @change="handleSearch">
            <span>Active Only</span>
          </label>
        </div>
      </div>
    </div>

    <!-- SSR Content -->
    <div class="card table-container">
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Code</th>
            <th>Title</th>
            <th>Target</th>
            <th>Reward</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quest in displayedQuests" :key="quest.id">
            <td>
              <span v-if="quest.isActive" class="badge badge-active">Active</span>
              <span v-else class="badge badge-inactive">Inactive</span>
            </td>
            <td class="font-mono">{{ quest.code }}</td>
            <td>{{ quest.title }}</td>
            <td>{{ quest.targetCount }}</td>
            <td>{{ quest.reward }}</td>
            <td class="actions">
              <NuxtLink :to="`/quests/${quest.id}`" class="btn-icon" title="Edit" aria-label="Edit Quest">
                <Edit2 :size="16" />
              </NuxtLink>
              <button @click="handleDelete(quest.id)" class="btn-icon danger" title="Delete" aria-label="Delete Quest">
                <Trash2 :size="16" />
              </button>
            </td>
          </tr>
          <tr v-if="displayedQuests.length === 0">
            <td colspan="7" class="text-center p-4">No quests found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.search-box input {
  padding-left: 2.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-bottom: 0;
}

.font-mono {
  font-family: monospace;
  color: var(--primary);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
}

.btn-icon:hover {
  color: var(--text-main);
}

.btn-icon.danger:hover {
  color: var(--error);
}

.mb-6 { margin-bottom: 1.5rem; }
.text-center { text-align: center; }
.p-4 { padding: 1rem; }
</style>
