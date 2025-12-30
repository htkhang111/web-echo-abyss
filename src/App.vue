<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';
import { useHeroStore } from './stores/heroStore';
import AuthForm from './components/auth/AuthForm.vue';
import HeroCard from './components/game/HeroCard.vue';
import HeroDetailModal from './components/game/HeroDetailModal.vue';
import { PhBackpack, PhFunnel, PhSignOut, PhPlusCircle } from '@phosphor-icons/vue';

const authStore = useAuthStore();
const heroStore = useHeroStore();

// Khi vào web, kiểm tra ngay xem đang đăng nhập hay chưa
onMounted(async () => {
  await authStore.initialize();
  if (authStore.user) {
    heroStore.fetchUserHeroes(); // Nếu đã login thì lấy list tướng ngay
  }
});

// Hàm xử lý logout
const handleLogout = async () => {
  await authStore.signOut();
  heroStore.heroes = []; // Xóa data cũ
};
</script>

<template>
  <div v-if="!authStore.user" class="min-h-screen bg-[#0f1014] flex items-center justify-center">
    <div v-if="authStore.loading" class="flex items-center justify-center">
      <span class="loading loading-infinity loading-lg text-primary scale-150"></span>
    </div>
    <AuthForm v-else />
  </div>

  <div v-else class="min-h-screen text-gray-200 font-sans p-4 md:p-8 relative">
    
    <header class="glass-panel rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center mb-8 gap-4 sticky top-4 z-40">
      <div class="flex items-center gap-4">
        <div class="p-3 bg-primary/20 rounded-xl text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--p),0.3)]">
          <PhBackpack size="28" weight="duotone" />
        </div>
        <div>
          <h1 class="text-2xl font-rpg font-bold text-white tracking-wider drop-shadow-lg">TÚI ĐỒ</h1>
          <p class="text-xs text-gray-400 font-mono">Guild Member: {{ authStore.user.user_metadata.full_name }}</p>
        </div>
      </div>

      <div class="flex gap-4 items-center">
        <div class="stats shadow-lg bg-black/50 border border-white/10 hidden md:inline-grid text-gray-300">
          <div class="stat place-items-center py-1 px-4">
            <div class="stat-title text-[10px] uppercase tracking-widest opacity-60">Sức chứa</div>
            <div class="stat-value text-base font-mono text-primary">{{ heroStore.heroes.length }}<span class="text-xs opacity-50">/100</span></div>
          </div>
          <div class="stat place-items-center py-1 px-4 border-l border-white/10">
            <div class="stat-title text-[10px] uppercase tracking-widest opacity-60">Gold</div>
            <div class="stat-value text-base font-mono text-yellow-500">1,250</div>
          </div>
        </div>

        <button @click="handleLogout" class="btn btn-ghost btn-circle text-error hover:bg-error/10" title="Đăng xuất">
          <PhSignOut size="24" weight="duotone" />
        </button>
      </div>
    </header>

    <main class="flex flex-col lg:flex-row gap-6">
      
      <aside class="w-full lg:w-64 flex-shrink-0 space-y-4">
         <div class="glass-panel rounded-xl p-5 sticky top-32">
          <h3 class="font-bold mb-4 flex items-center gap-2 text-white font-rpg tracking-wide">
            <PhFunnel weight="fill"/> BỘ LỌC
          </h3>
          
          <div class="space-y-2">
             <label 
                v-for="rarity in ['All', 'Legendary', 'Epic', 'Rare', 'Uncommon']" 
                :key="rarity"
                class="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-white/5"
                :class="{ 'bg-white/10 ring-1 ring-white/20': heroStore.filterRarity === rarity }"
             >
                <input type="radio" name="rarity" class="radio radio-primary radio-xs" 
                    :value="rarity" 
                    :checked="heroStore.filterRarity === rarity"
                    @change="heroStore.setFilter(rarity)" 
                />
                <span class="text-sm" :class="rarity === 'All' ? 'text-gray-300' : ''">{{ rarity }}</span>
             </label>
           </div>
          
          <div class="divider my-4 before:bg-white/10 after:bg-white/10"></div>

          <button @click="heroStore.summonHero()" class="btn btn-secondary w-full shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] border-none font-bold text-white">
            <PhPlusCircle size="20" weight="fill"/> TRIỆU HỒI
          </button>
        </div>
      </aside>

      <div class="flex-1">
        <div v-if="heroStore.loading" class="flex justify-center py-20">
            <span class="loading loading-dots loading-lg text-primary scale-150"></span>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <HeroCard 
            v-for="hero in heroStore.filteredHeroes" 
            :key="hero.id" 
            :hero="hero" 
            @click="heroStore.selectHero(hero)" 
          />
        </div>

        <div v-if="!heroStore.loading && heroStore.heroes.length === 0" class="text-center py-20 opacity-50 flex flex-col items-center">
          <p class="font-rpg text-xl mb-2">Túi đồ trống trơn đại ca ơi!</p>
          <button @click="heroStore.summonHero()" class="btn btn-primary btn-sm">Nhận tướng tân thủ</button>
        </div>
      </div>
    </main>

    <HeroDetailModal />
  </div>
</template>