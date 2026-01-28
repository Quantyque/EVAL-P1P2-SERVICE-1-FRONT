# 🏰 Castle of Whispers - Admin Dashboard (Frontend)

This is the Back-Office interface for managing and viewing Quests and Player Progression.
Built with **Nuxt 4** and optimized for performance and accessibility.

## 🛠️ Tech Stack
*   **Framework**: Nuxt 4 (Vue 3 + Vite)
*   **State Management**: Pinia (Stores)
*   **Styling**: Vanilla CSS (Premium Dark Theme, Glassmorphism)
*   **Icons**: Lucide Vue Next

## ✨ Key Features
1.  **Quest Management**: Create, Edit, and Delete quests.
    *   Support for **Targeted Quests** (Specific Dungeon IDs).
2.  **Player Progression**: View active quests and progress bars for players.
    *   **Multi-Player Demo**: Quickly switch between `Player 1`, `Player 2`, and `Player 3` to verify independent progression.
3.  **Performance Optimized**:
    *   Lighthouse Score targets: 100/100 (Performance, SEO, Accessibility).
    *   Optimized assets (Gzip, Font loading).
    *   Dedicated **Service Layer** architecture (`services/` -> `stores/`).

## 🚀 How to Run

### Development
```bash
npm install
npm run dev
```
Access at `http://localhost:3000`.

### Production (for Lighthouse Testing)
To see the true performance scores:
```bash
npm run build
npm run preview
```

## 📂 Architecture
*   `app/components`: UI Components (`QuestForm`, `LoadingOverlay`, etc.)
*   `app/pages`: Routes/Views (`/quests`, `/players`)
*   `app/services`: API abstraction layer (decoupled from stores)
*   `app/stores`: State management (Pinia)
*   `app/types`: TypeScript interfaces

## 🧪 Testing Flow
1.  Create a Quest in the dashboard (e.g., Target: `dungeon-fire`).
2.  Use the Backend Simulation to trigger `DungeonCompleted` for `dungeon-fire`.
3.  Refresh the Player view (`P1`) to see the progress bar fill up in real-time.
