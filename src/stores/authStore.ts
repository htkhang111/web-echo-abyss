import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(true);

  // 1. Kiểm tra xem user có phiên đăng nhập cũ không (F5 không bị văng)
  async function initialize() {
    loading.value = true;
    const { data } = await supabase.auth.getSession();
    user.value = data.session?.user || null;
    
    // Lắng nghe sự thay đổi (Lúc đăng nhập/đăng xuất)
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null;
    });
    loading.value = false;
  }

  // 2. Đăng ký
  async function signUp(email: string, pass: string, name: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: { data: { full_name: name } } // Lưu tên hiển thị
    });
    if (error) throw error;
  }

  // 3. Đăng nhập
  async function signIn(email: string, pass: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) throw error;
  }

  // 4. Đăng xuất
  async function signOut() {
    await supabase.auth.signOut();
    user.value = null;
  }

  return { user, loading, initialize, signUp, signIn, signOut };
});