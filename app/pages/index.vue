<script setup lang="ts">
definePageMeta({
  redirect: '/quests'
});
</script>

<template>
  <div class="redirecting">
    Redirecting to Quests...
  </div>
</template>

<style scoped>
.redirecting {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: var(--text-muted);
}
</style>
