<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { PhScroll, PhKey, PhUserCircle, PhMagicWand, PhArrowClockwise } from '@phosphor-icons/vue';

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const fullName = ref('');
const authStore = useAuthStore();

const handleSubmit = async () => {
  if (isLogin.value) {
    await authStore.signIn(email.value, password.value);
  } else {
    await authStore.signUp(email.value, password.value, fullName.value);
  }
};
</script>

<template>
  <div class="glass-panel p-8 rounded-2xl w-full max-w-md relative overflow-hidden border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
    <div class="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

    <div class="text-center mb-8 relative z-10">
      <PhMagicWand size="48" weight="duotone" class="text-primary mx-auto mb-2 drop-shadow-[0_0_10px_rgba(var(--p),0.6)]" />
      <h2 class="font-rpg text-3xl font-bold text-white tracking-wider drop-shadow-lg">
        {{ isLogin ? 'CỔNG DỊ GIỚI' : 'GHI DANH' }}
      </h2>
      <p class="text-gray-400 text-sm font-mono mt-2">
        {{ isLogin ? 'Nhập mật khẩu để mở cổng dịch chuyển.' : 'Tạo danh tính mới trong thế giới Echo Abyss.' }}
      </p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-4 relative z-10">
      <div v-if="!isLogin" class="form-control w-full">
          <label class="label">
              <span class="label-text font-rpg text-gray-300 flex items-center gap-2">
                <PhUserCircle weight="fill" class="text-primary"/> Tên Hiệp Sĩ
              </span>
          </label>
          <div class="relative">
            <input type="text" v-model="fullName" placeholder="VD: Arthur Pendragon" class="input input-bordered w-full bg-[#1a1b20]/80 border-white/10 focus:border-primary focus:shadow-[0_0_15px_rgba(var(--p),0.4)] text-white placeholder-gray-500 pl-10" required/>
            <PhUserCircle size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
      </div>

      <div class="form-control w-full">
          <label class="label">
              <span class="label-text font-rpg text-gray-300 flex items-center gap-2">
                <PhScroll weight="fill" class="text-primary"/> Thư Tín Ma Pháp (Email)
              </span>
          </label>
          <div class="relative">
             <input type="email" v-model="email" placeholder="email@example.com" class="input input-bordered w-full bg-[#1a1b20]/80 border-white/10 focus:border-primary focus:shadow-[0_0_15px_rgba(var(--p),0.4)] text-white placeholder-gray-500 pl-10" required/>
             <PhScroll size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
      </div>

      <div class="form-control w-full">
          <label class="label">
              <span class="label-text font-rpg text-gray-300 flex items-center gap-2">
                <PhKey weight="fill" class="text-primary"/> Mật Khẩu Cổ Ngữ
              </span>
          </label>
          <div class="relative">
            <input type="password" v-model="password" placeholder="••••••••" class="input input-bordered w-full bg-[#1a1b20]/80 border-white/10 focus:border-primary focus:shadow-[0_0_15px_rgba(var(--p),0.4)] text-white placeholder-gray-500 pl-10" required/>
            <PhKey size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
      </div>
      
      <div v-if="authStore.error" class="alert alert-error bg-red-900/50 border-red-500/50 text-red-200 text-sm font-mono p-2 rounded-lg flex items-center gap-2">
          <PhArrowClockwise weight="bold" class="animate-spin"/> {{ authStore.error }}
      </div>

      <div class="mt-8">
        <button type="submit" class="btn btn-primary w-full font-rpg text-lg font-bold tracking-wider shadow-[0_0_20px_rgba(var(--p),0.4)] hover:shadow-[0_0_30px_rgba(var(--p),0.6)] border-none relative overflow-hidden group" :disabled="authStore.loading">
          <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-in-out"></span>
          <span v-if="authStore.loading" class="loading loading-spinner loading-md mr-2"></span>
          {{ isLogin ? 'KHAI MỞ CỔNG' : 'XÁC NHẬN GHI DANH' }}
        </button>
      </div>
    </form>

    <div class="text-center mt-6 relative z-10">
      <button @click="isLogin = !isLogin" class="link link-hover text-sm text-primary/80 hover:text-primary font-mono transition-colors">
        {{ isLogin ? "Chưa có danh tính? Đăng ký ngay" : "Đã là thành viên? Quay lại cổng" }}
      </button>
    </div>
  </div>
</template>