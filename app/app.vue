<script setup lang="ts">
import { LayoutDashboard, Users, Swords } from 'lucide-vue-next';
</script>

<template>
  <div class="layout">
    <LoadingOverlay />
    <nav class="navbar">
      <div class="container nav-content">
        <NuxtLink to="/quests" class="logo">
          <Swords class="icon" />
          <span>Castle Admin</span>
        </NuxtLink>
        
        <div class="nav-links">
          <NuxtLink to="/quests" class="nav-link" active-class="active">
            <LayoutDashboard :size="18" />
            <span>Quests</span>
          </NuxtLink>
          <NuxtLink to="/players/player-1/quests" class="nav-link" active-class="active">
            <Users :size="18" />
            <span>Player 1 (Demo)</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main class="container page-content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  background: rgba(18, 18, 20, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-main);
}
.logo .icon { color: var(--primary); }

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.active {
  color: var(--text-main);
}

.nav-link.active {
  color: var(--primary);
}

.page-content {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
