<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';
import { useHeroStore } from './stores/heroStore';
import AuthForm from './components/auth/AuthForm.vue';
import HeroCard from './components/game/HeroCard.vue';
import HeroDetailModal from './components/game/HeroDetailModal.vue';
import GameHeader from './components/layout/GameHeader.vue';
import GameFooter from './components/layout/GameFooter.vue';
import { PhFunnel, PhPlusCircle } from '@phosphor-icons/vue';

const authStore = useAuthStore();
const heroStore = useHeroStore();

onMounted(async () => {
  await authStore.initialize();
  if (authStore.user) {
    heroStore.fetchUserHeroes();
  }
});
</script>

<template>
  <div v-if="!authStore.user" class="min-h-screen bg-[#0f1014] flex items-center justify-center p-4">
    <div v-if="authStore.loading" class="flex items-center justify-center">
      <span class="loading loading-infinity loading-lg text-primary scale-150"></span>
    </div>
    <AuthForm v-else />
  </div>

  <div v-else class="min-h-screen flex flex-col p-4 md:p-6 relative max-w-[1600px] mx-auto">
    
    <GameHeader />

    <div class="flex flex-col lg:flex-row flex-1 gap-6">
      
      <aside class="w-full lg:w-48 flex-shrink-0 space-y-4">
         <div class="glass-panel rounded-xl p-3 sticky top-28">
          <h3 class="text-sm font-bold mb-3 flex items-center gap-2 text-white font-rpg tracking-wide border-b border-white/10 pb-2">
            <PhFunnel weight="fill" class="text-primary"/> BỘ LỌC
          </h3>
          
          <div class="space-y-1">
             <label 
                v-for="rarity in ['All', 'Legendary', 'Epic', 'Rare', 'Uncommon']" 
                :key="rarity"
                class="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors hover:bg-white/5 group"
                :class="{ 'bg-white/10 ring-1 ring-white/20': heroStore.filterRarity === rarity }"
             >
                <input type="radio" name="rarity" class="radio radio-primary radio-xs" 
                    :value="rarity" 
                    :checked="heroStore.filterRarity === rarity"
                    @change="heroStore.setFilter(rarity)" 
                />
                <span class="text-xs group-hover:text-white transition-colors" :class="rarity === 'All' ? 'text-gray-400' : 'text-gray-300'">{{ rarity }}</span>
             </label>
           </div>
          
          <div class="divider my-3 before:bg-white/10 after:bg-white/10"></div>

          <button @click="heroStore.summonHero()" class="btn btn-sm btn-secondary w-full shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] border-none font-bold text-white font-rpg tracking-wider">
            <PhPlusCircle size="16" weight="fill"/> TRIỆU HỒI
          </button>
        </div>
      </aside>

      <div class="flex-1 min-h-[500px]">
        <div v-if="heroStore.loading" class="flex justify-center py-20">
            <span class="loading loading-dots loading-lg text-primary scale-150"></span>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4">
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
    </div>

    <GameFooter />

    <HeroDetailModal />
  </div>
</template>