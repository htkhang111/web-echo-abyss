<script setup lang="ts">
import type { Hero, Rarity } from '../../types';
import { PhSword, PhShield, PhStar, PhLockKey } from '@phosphor-icons/vue';

// Nhận dữ liệu từ cha truyền vào
const props = defineProps<{ hero: Hero }>();

// Hàm lấy màu viền theo độ hiếm
const getRarityColor = (rarity: Rarity) => {
  switch (rarity) {
    case 'Legendary': return 'border-orange-500 shadow-orange-500/20';
    case 'Epic': return 'border-purple-500 shadow-purple-500/20';
    case 'Rare': return 'border-blue-500 shadow-blue-500/20';
    case 'Uncommon': return 'border-green-500 shadow-green-500/20';
    default: return 'border-gray-500 shadow-gray-500/20';
  }
};

// Hàm lấy màu chữ tên
const getTextClass = (rarity: Rarity) => {
    switch (rarity) {
    case 'Legendary': return 'text-orange-400';
    case 'Epic': return 'text-purple-400';
    case 'Rare': return 'text-blue-400';
    case 'Uncommon': return 'text-green-400';
    default: return 'text-gray-300';
  }
}
</script>

<template>
  <div 
    class="card bg-base-300 shadow-xl border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
    :class="getRarityColor(hero.rarity)"
  >
    <div class="absolute top-2 left-2 z-10 badge badge-neutral font-mono font-bold">
      Lv.{{ hero.level }}
    </div>

    <div class="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center border border-white/20">
      <span class="text-xs font-bold">{{ hero.element[0] }}</span>
    </div>

    <div v-if="hero.is_equipped" class="absolute top-10 left-[-25px] bg-red-600 text-white text-[10px] font-bold px-8 py-1 -rotate-45 z-10 shadow-md">
      EQUIPPED
    </div>

    <figure class="aspect-[3/4] overflow-hidden bg-base-200 relative">
      <img :src="hero.image_url" :alt="hero.name" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
      
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
    </figure>

    <div class="card-body p-3 gap-1 absolute bottom-0 w-full">
      <h2 class="card-title text-sm font-serif truncate" :class="getTextClass(hero.rarity)">
        {{ hero.name }}
      </h2>
      
      <div class="flex text-yellow-500 mb-1">
        <PhStar v-for="n in hero.stars" :key="n" weight="fill" size="12" />
      </div>

      <div class="flex justify-between text-xs text-gray-400 font-mono bg-black/40 p-1 rounded">
        <div class="flex items-center gap-1">
          <PhSword size="14" class="text-red-400"/> {{ hero.atk }}
        </div>
        <div class="flex items-center gap-1">
          <PhShield size="14" class="text-blue-400"/> {{ hero.hp }}
        </div>
      </div>
    </div>
    
    <div v-if="hero.is_locked" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20">
        <PhLockKey size="48" weight="duotone" />
    </div>
  </div>
</template>