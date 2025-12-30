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
  <div v-if="!authStore.user" class="min-h-screen bg-base-100">
    <div v-if="authStore.loading" class="flex h-screen items-center justify-center">
      <span class="loading loading-infinity loading-lg text-primary"></span>
    </div>
    <AuthForm v-else />
  </div>

  <div v-else class="min-h-screen bg-base-100 text-base-content font-sans p-4 md:p-8">
    
    <header class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div class="flex items-center gap-3">
        <div class="p-3 bg-primary/10 rounded-xl text-primary">
          <PhBackpack size="32" weight="duotone" />
        </div>
        <div>
          <h1 class="text-2xl font-bold font-serif text-white">Túi Đồ</h1>
          <p class="text-sm opacity-60">Xin chào, {{ authStore.user.user_metadata.full_name }}</p>
        </div>
      </div>

      <div class="flex gap-4 items-center">
        <div class="stats shadow bg-base-200 hidden md:inline-grid">
          <div class="stat place-items-center py-2">
            <div class="stat-title text-xs">Sức chứa</div>
            <div class="stat-value text-lg text-primary">{{ heroStore.heroes.length }}/100</div>
          </div>
          <div class="stat place-items-center py-2">
            <div class="stat-title text-xs">Vàng</div>
            <div class="stat-value text-lg text-yellow-500">1000</div>
          </div>
        </div>

        <button @click="handleLogout" class="btn btn-ghost btn-circle text-error" title="Đăng xuất">
          <PhSignOut size="24" />
        </button>
      </div>
    </header>

    <main class="flex flex-col lg:flex-row gap-6">
      <aside class="w-full lg:w-64 flex-shrink-0 space-y-4">
         <div class="card bg-base-200 p-4 sticky top-4">
          <h3 class="font-bold mb-3 flex items-center gap-2"><PhFunnel /> Bộ Lọc</h3>
          <div class="form-control">
             <label class="label cursor-pointer justify-start gap-3">
                <input type="radio" name="rarity" class="radio radio-primary radio-sm" checked @change="heroStore.setFilter('All')" />
                <span class="label-text">Tất cả</span>
             </label>
             </div>
          
          <button @click="heroStore.summonHero()" class="btn btn-secondary w-full mt-4">
            <PhPlusCircle size="20"/> Triệu Hồi Nhanh
          </button>
        </div>
      </aside>

      <div class="flex-1">
        <div v-if="heroStore.loading" class="flex justify-center py-20">
            <span class="loading loading-dots loading-lg"></span>
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
          <p>Túi đồ trống trơn đại ca ơi!</p>
          <button @click="heroStore.summonHero()" class="btn btn-primary btn-sm mt-2">Nhận tướng tân thủ</button>
        </div>
      </div>
    </main>

    <HeroDetailModal />
  </div>
</template>