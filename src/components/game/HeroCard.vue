<script setup lang="ts">
import type { Hero, Rarity } from '../../types';
import { PhSword, PhShield, PhStar, PhLockKey } from '@phosphor-icons/vue';

const props = defineProps<{ hero: Hero }>();

// Hàm lấy style "phát sáng" theo độ hiếm
const getRarityStyle = (rarity: Rarity) => {
  switch (rarity) {
    case 'Legendary': 
      return 'border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]';
    case 'Epic': 
      return 'border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]';
    case 'Rare': 
      return 'border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]';
    case 'Uncommon': 
      return 'border-green-500/50 shadow-[0_0_5px_rgba(34,197,94,0.2)]';
    default: 
      return 'border-gray-700 hover:border-gray-500';
  }
};

const getTextClass = (rarity: Rarity) => {
    switch (rarity) {
    case 'Legendary': return 'text-orange-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]';
    case 'Epic': return 'text-purple-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]';
    case 'Rare': return 'text-blue-400';
    case 'Uncommon': return 'text-green-400';
    default: return 'text-gray-400';
  }
}
</script>

<template>
  <div 
    class="card bg-[#1a1b20] transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer group relative overflow-hidden border border-white/5"
    :class="getRarityStyle(hero.rarity)"
  >
    <div class="absolute top-2 left-2 z-20 badge badge-sm bg-black/80 border-white/20 text-white font-mono shadow-lg backdrop-blur-sm">
      Lv.{{ hero.level }}
    </div>

    <div class="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg">
      <span class="text-[10px] font-bold">{{ hero.element[0] }}</span>
    </div>

    <div v-if="hero.is_equipped" class="absolute top-6 -left-8 bg-red-600/90 text-white text-[9px] font-bold px-8 py-1 -rotate-45 z-20 shadow-lg border-y border-red-400">
      EQUIPPED
    </div>

    <figure class="aspect-[3/4] overflow-hidden relative bg-gray-900">
      <img 
        :src="hero.image_url" 
        :alt="hero.name" 
        class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#1a1b20] via-transparent to-black/20"></div>
    </figure>

    <div class="card-body p-3 gap-2 absolute bottom-0 w-full z-10">
      <h2 class="font-rpg font-bold text-sm truncate uppercase tracking-wide" :class="getTextClass(hero.rarity)">
        {{ hero.name }}
      </h2>
      
      <div class="flex gap-0.5 text-yellow-500/80 mb-1 h-3">
        <PhStar v-for="n in hero.stars" :key="n" weight="fill" size="10" />
      </div>

      <div class="grid grid-cols-2 gap-2 text-[10px] text-gray-300 font-mono bg-black/40 p-1.5 rounded border border-white/5 backdrop-blur-sm">
        <div class="flex items-center gap-1.5">
          <PhSword size="12" class="text-red-400"/> 
          <span class="font-bold">{{ hero.atk }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <PhShield size="12" class="text-blue-400"/> 
          <span class="font-bold">{{ hero.hp }}</span>
        </div>
      </div>
    </div>
    
    <div v-if="hero.is_locked" class="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-30 flex items-center justify-center text-white/40">
        <PhLockKey size="32" weight="duotone" />
    </div>
  </div>
</template>