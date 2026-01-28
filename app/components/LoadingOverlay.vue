<script setup lang="ts">
// We use a global state to control the loader
const isLoading = useState<boolean>('isLoading', () => false);

// Safety: Always ensure loader is off when component mounts (fixes hydration mismatches)
onMounted(() => {
  isLoading.value = false;
});

</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="overlay">
      <div class="spinner"></div>
      <p class="loading-text">Loading...</p>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 15px var(--primary-glow);
}

.loading-text {
  color: var(--text-main);
  font-weight: 500;
  letter-spacing: 0.05em;
  animation: pulse 2s infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
