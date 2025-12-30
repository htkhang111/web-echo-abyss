<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/authStore';
import { PhSkull, PhSword } from '@phosphor-icons/vue';

const auth = useAuthStore();
const isLogin = ref(true); // Toggle giữa Đăng nhập/Đăng ký
const loading = ref(false);
const errorMsg = ref('');

// Form Data
const email = ref('');
const password = ref('');
const fullName = ref('');

const handleSubmit = async () => {
  loading.value = true;
  errorMsg.value = '';
  try {
    if (isLogin.value) {
      await auth.signIn(email.value, password.value);
    } else {
      await auth.signUp(email.value, password.value, fullName.value);
      alert('Đăng ký thành công! Hãy đăng nhập ngay.');
      isLogin.value = true; // Chuyển về tab đăng nhập
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Có lỗi xảy ra!';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-100 p-4">
    <div class="card w-full max-w-md bg-base-200 shadow-xl border border-primary/20">
      <div class="card-body">
        
        <div class="text-center mb-4">
          <div class="inline-flex p-4 bg-black/30 rounded-full mb-2 text-primary">
            <PhSkull v-if="isLogin" size="48" weight="duotone" />
            <PhSword v-else size="48" weight="duotone" />
          </div>
          <h2 class="text-3xl font-serif font-bold text-white">
            {{ isLogin ? 'Đăng Nhập' : 'Gia Nhập Guild' }}
          </h2>
          <p class="text-sm opacity-60">Chào mừng trở lại thế giới Echo Abyss</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <input v-if="!isLogin" v-model="fullName" type="text" placeholder="Tên Đại Hiệp" class="input input-bordered w-full" required />
          <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full" required />
          <input v-model="password" type="password" placeholder="Mật khẩu" class="input input-bordered w-full" required />
          
          <div v-if="errorMsg" class="text-error text-sm text-center">{{ errorMsg }}</div>

          <button type="submit" class="btn btn-primary w-full" :disabled="loading">
            <span v-if="loading" class="loading loading-spinner"></span>
            {{ isLogin ? 'Vào Game' : 'Đăng Ký' }}
          </button>
        </form>

        <div class="divider">HOẶC</div>
        <button @click="isLogin = !isLogin" class="btn btn-ghost btn-sm w-full">
          {{ isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập' }}
        </button>

      </div>
    </div>
  </div>
</template>