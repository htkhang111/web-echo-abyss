<script setup lang="ts">
import { useHeroStore } from './stores/heroStore';
import HeroCard from './components/game/HeroCard.vue';
import { PhBackpack, PhFunnel } from '@phosphor-icons/vue';

const heroStore = useHeroStore();
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans p-4 md:p-8">
    
    <header class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-primary/10 rounded-xl text-primary">
          <PhBackpack size="32" weight="duotone" />
        </div>
        <div>
          <h1 class="text-2xl font-bold font-serif text-white">Túi Đồ</h1>
          <p class="text-sm opacity-60">Quản lý anh hùng và trang bị</p>
        </div>
      </div>

      <div class="stats shadow bg-base-200">
        <div class="stat place-items-center py-2">
          <div class="stat-title text-xs">Sức chứa</div>
          <div class="stat-value text-lg text-primary">{{ heroStore.heroes.length }}/100</div>
        </div>
        <div class="stat place-items-center py-2">
          <div class="stat-title text-xs">Vàng</div>
          <div class="stat-value text-lg text-yellow-500">12,500</div>
        </div>
      </div>
    </header>

    <main class="flex flex-col lg:flex-row gap-6">
      
      <aside class="w-full lg:w-64 flex-shrink-0 space-y-4">
        <div class="card bg-base-200 p-4 sticky top-4">
          <h3 class="font-bold mb-3 flex items-center gap-2">
            <PhFunnel /> Bộ Lọc
          </h3>
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-3">
              <input type="radio" name="rarity" class="radio radio-primary radio-sm" checked />
              <span class="label-text">Tất cả</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3">
              <input type="radio" name="rarity" class="radio radio-error radio-sm" />
              <span class="label-text text-orange-400">Legendary</span>
            </label>
            <label class="label cursor-pointer justify-start gap-3">
              <input type="radio" name="rarity" class="radio radio-secondary radio-sm" />
              <span class="label-text text-purple-400">Epic</span>
            </label>
          </div>
        </div>
      </aside>

      <div class="flex-1">
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <HeroCard 
            v-for="hero in heroStore.filteredHeroes" 
            :key="hero.id" 
            :hero="hero" 
          />
        </div>

        <div v-if="heroStore.filteredHeroes.length === 0" class="text-center py-20 opacity-50">
          <p>Không tìm thấy tướng nào đại ca ơi!</p>
        </div>
      </div>

    </main>
  </div>
</template>