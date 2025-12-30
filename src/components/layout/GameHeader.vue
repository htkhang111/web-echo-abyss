<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
import { useHeroStore } from '../../stores/heroStore';
import { PhBackpack, PhSignOut } from '@phosphor-icons/vue';

const authStore = useAuthStore();
const heroStore = useHeroStore();

const handleLogout = async () => {
  await authStore.signOut();
  heroStore.heroes = [];
};
</script>

<template>
  <header class="glass-panel rounded-xl p-3 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-4 z-40 mb-6">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary/20 rounded-lg text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--p),0.3)]">
          <PhBackpack size="24" weight="duotone" />
        </div>
        <div>
          <h1 class="text-xl font-rpg font-bold text-white tracking-wider drop-shadow-lg">TÚI ĐỒ</h1>
          <p class="text-[10px] text-gray-400 font-mono uppercase">Guild: {{ authStore.user?.user_metadata.full_name }}</p>
        </div>
      </div>

      <div class="flex gap-3 items-center">
        <div class="stats shadow-lg bg-black/50 border border-white/10 hidden md:inline-grid text-gray-300 stats-horizontal">
          <div class="stat place-items-center py-1 px-3">
            <div class="stat-title text-[9px] uppercase tracking-widest opacity-60">Sức chứa</div>
            <div class="stat-value text-sm font-mono text-primary">{{ heroStore.heroes.length }}<span class="text-[10px] opacity-50">/100</span></div>
          </div>
          <div class="stat place-items-center py-1 px-3 border-l border-white/10">
            <div class="stat-title text-[9px] uppercase tracking-widest opacity-60">Gold</div>
            <div class="stat-value text-sm font-mono text-yellow-500">1,250</div>
          </div>
        </div>

        <button @click="handleLogout" class="btn btn-sm btn-ghost btn-square text-error hover:bg-error/10" title="Đăng xuất">
          <PhSignOut size="20" weight="duotone" />
        </button>
      </div>
    </header>
</template>