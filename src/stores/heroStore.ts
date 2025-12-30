import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';
import type { Hero } from '../types';

export const useHeroStore = defineStore('hero', () => {
  const heroes = ref<Hero[]>([]); // Data thật rỗng ban đầu
  const loading = ref(false);
  const filterRarity = ref<string>('All');
  const selectedHero = ref<Hero | null>(null);
  
  const authStore = useAuthStore();

  // 1. Hàm lấy dữ liệu từ Supabase
  async function fetchUserHeroes() {
    if (!authStore.user) return;
    loading.value = true;

    // Kỹ thuật JOIN bảng trong Supabase: 
    // select(*, hero_templates(*)) nghĩa là lấy thông tin user_heroes kèm theo thông tin gốc từ hero_templates
    const { data, error } = await supabase
      .from('user_heroes')
      .select('*, hero_templates(*)');

    if (error) {
      console.error('Lỗi lấy tướng:', error);
    } else if (data) {
      // Map dữ liệu từ Database sang format Frontend cần
      heroes.value = data.map((item: any) => ({
        id: item.id,
        // Lấy thông tin từ bảng template
        name: item.hero_templates.name,
        rarity: item.hero_templates.rarity,
        element: item.hero_templates.element,
        image_url: item.hero_templates.image_url || 'https://placehold.co/400x600/black/white?text=No+Image',
        // Lấy thông tin level của user
        level: item.level,
        stars: item.stars,
        is_locked: item.is_locked,
        is_equipped: item.is_equipped,
        // Tính toán chỉ số: Base + (Level * Growth) - Tạm tính đơn giản
        atk: item.hero_templates.base_atk + (item.level * 10),
        hp: item.hero_templates.base_hp + (item.level * 50),
      }));
    }
    loading.value = false;
  }

  // 2. Hàm Gacha (Triệu hồi tướng mới cho người mới)
  async function summonHero() {
    if (!authStore.user) return;
    
    // Lấy random 1 con template (Tạm thời lấy ID 1-4 ca đã tạo trong SQL)
    const randomTemplateId = Math.floor(Math.random() * 4) + 1; 

    const { error } = await supabase
      .from('user_heroes')
      .insert({
        user_id: authStore.user.id,
        template_id: randomTemplateId, // Random tạm
        level: 1
      });

    if (!error) {
      await fetchUserHeroes(); // Refresh lại list sau khi gacha
    }
  }

  // Getters & Helpers (Giữ nguyên logic cũ)
  const filteredHeroes = computed(() => {
    if (filterRarity.value === 'All') return heroes.value;
    return heroes.value.filter(h => h.rarity === filterRarity.value);
  });

  function setFilter(rarity: string) { filterRarity.value = rarity; }
  function selectHero(hero: Hero) { selectedHero.value = hero; }
  function clearSelection() { selectedHero.value = null; }

  return { 
    heroes, loading, filteredHeroes, filterRarity, selectedHero, 
    setFilter, selectHero, clearSelection, fetchUserHeroes, summonHero 
  };
});