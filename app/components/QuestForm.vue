<script setup lang="ts">
import { Save, ArrowLeft } from 'lucide-vue-next';
import type { Quest } from '~/types';

const props = defineProps<{
  initialData?: Quest;
  isEdit?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', data: Partial<Quest>): void;
}>();

const form = ref<Partial<Quest>>({
  code: '',
  title: '',
  description: '',
  type: 'DungeonCompletion',
  targetCount: 1,
  isActive: true,
  reward: '',
  ...props.initialData
});

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>

<template>
  <div class="card form-container">
    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-2">
        <div class="form-group">
          <label>Code (Unique)</label>
          <input v-model="form.code" required :disabled="isEdit" placeholder="QUEST-001" />
        </div>
        
        <div class="form-group">
          <label>Title</label>
          <input v-model="form.title" required placeholder="The Beginning" />
        </div>
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea v-model="form.description" rows="3"></textarea>
      </div>

      <div class="grid grid-cols-2">
        <div class="form-group">
          <label>Target Count</label>
          <input type="number" v-model="form.targetCount" required min="1" />
        </div>

        <div class="form-group">
          <label>Status</label>
          <div class="toggle-wrapper">
             <label class="toggle-switch">
                <input type="checkbox" v-model="form.isActive">
                <span class="slider"></span>
             </label>
             <span>{{ form.isActive ? 'Active' : 'Inactive' }}</span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Reward</label>
        <input v-model="form.reward" placeholder="100 Gold" />
      </div>

      <div class="form-actions">
        <NuxtLink to="/quests" class="btn btn-outline" aria-label="Cancel">
          <ArrowLeft :size="18" /> Cancel
        </NuxtLink>
        <button type="submit" class="btn btn-primary" :aria-label="isEdit ? 'Update Quest' : 'Create Quest'">
          <Save :size="18" /> {{ isEdit ? 'Update Quest' : 'Create Quest' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 0.5rem;
}

/* Custom Toggle */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input { opacity: 0; width: 0; height: 0; }

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px; width: 16px;
  left: 4px; bottom: 3px;
  background-color: var(--text-muted);
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: rgba(139, 92, 246, 0.2);
  border-color: var(--primary);
}

input:checked + .slider:before {
  transform: translateX(26px);
  background-color: var(--primary);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
}
</style>
