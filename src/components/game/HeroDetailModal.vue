<script setup lang="ts">
import { useHeroStore } from '../../stores/heroStore';
import { PhX, PhSword, PhShield, PhHeart, PhLightning, PhLockKey, PhLockKeyOpen } from '@phosphor-icons/vue';

const heroStore = useHeroStore();

// Hàm đóng modal
const close = () => {
  heroStore.clearSelection();
};
</script>

<template>
  <div class="modal modal-bottom sm:modal-middle backdrop-blur-sm" :class="{ 'modal-open': heroStore.selectedHero }">
    
    <div v-if="heroStore.selectedHero" class="modal-box w-11/12 max-w-4xl bg-base-100 p-0 overflow-hidden border border-primary/20 shadow-2xl">
      
      <button @click="close" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50 bg-black/50 hover:bg-red-500 text-white">
        <PhX size="20" />
      </button>

      <div class="flex flex-col md:flex-row h-full">
        
        <div class="w-full md:w-1/3 relative bg-black">
            <img 
              :src="heroStore.selectedHero.image_url" 
              class="w-full h-96 md:h-full object-cover opacity-90"
            />
            <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-base-100 to-transparent h-32"></div>
            
            <div class="absolute bottom-4 left-4">
                <div class="badge badge-primary mb-2">{{ heroStore.selectedHero.rarity }}</div>
                <h2 class="text-3xl font-serif font-bold text-white drop-shadow-md">
                    {{ heroStore.selectedHero.name }}
                </h2>
                <div class="flex items-center gap-2 mt-1">
                     <span class="badge badge-outline text-xs">Hệ {{ heroStore.selectedHero.element }}</span>
                     <span class="text-warning text-sm">Lv.{{ heroStore.selectedHero.level }}</span>
                </div>
            </div>
        </div>

        <div class="w-full md:w-2/3 p-6 flex flex-col gap-6">
            
            <div class="grid grid-cols-2 gap-4">
                <div class="stat bg-base-200 rounded-box py-2 px-4 border border-white/5">
                    <div class="stat-figure text-error"><PhSword size="24" weight="fill"/></div>
                    <div class="stat-title text-xs">Tấn công</div>
                    <div class="stat-value text-lg">{{ heroStore.selectedHero.atk }}</div>
                    <div class="stat-desc text-success">↗︎ 12 (Bonus)</div>
                </div>
                
                <div class="stat bg-base-200 rounded-box py-2 px-4 border border-white/5">
                    <div class="stat-figure text-info"><PhShield size="24" weight="fill"/></div>
                    <div class="stat-title text-xs">Phòng thủ</div>
                    <div class="stat-value text-lg">850</div> </div>

                <div class="stat bg-base-200 rounded-box py-2 px-4 border border-white/5">
                    <div class="stat-figure text-success"><PhHeart size="24" weight="fill"/></div>
                    <div class="stat-title text-xs">Sinh lực (HP)</div>
                    <div class="stat-value text-lg">{{ heroStore.selectedHero.hp }}</div>
                </div>

                <div class="stat bg-base-200 rounded-box py-2 px-4 border border-white/5">
                    <div class="stat-figure text-warning"><PhLightning size="24" weight="fill"/></div>
                    <div class="stat-title text-xs">Tốc độ</div>
                    <div class="stat-value text-lg">120</div> </div>
            </div>

            <div>
                <div class="flex justify-between text-xs mb-1 opacity-70">
                    <span>EXP</span>
                    <span>4500 / 10000</span>
                </div>
                <progress class="progress progress-warning w-full h-2" value="45" max="100"></progress>
            </div>

            <div class="mt-auto grid grid-cols-2 gap-3">
                <button class="btn btn-primary w-full">Cường Hóa (Gold)</button>
                <button class="btn btn-secondary w-full">Đột Phá (Star Up)</button>
                
                <button class="btn btn-outline col-span-2 md:col-span-1">
                     <span v-if="heroStore.selectedHero.is_equipped">Tháo Trang Bị</span>
                     <span v-else>Trang Bị Ngay</span>
                </button>

                <div class="flex gap-2 col-span-2 md:col-span-1">
                    <button class="btn btn-square btn-ghost border border-white/10" title="Khóa/Mở khóa">
                        <PhLockKey v-if="heroStore.selectedHero.is_locked" size="24" class="text-yellow-500" />
                        <PhLockKeyOpen v-else size="24" class="opacity-50" />
                    </button>
                    <button class="btn btn-error flex-1 text-white">Phân Tách</button>
                </div>
            </div>

        </div>
      </div>
    </div>
    
    <form method="dialog" class="modal-backdrop">
        <button @click="close">close</button>
    </form>
  </div>
</template>