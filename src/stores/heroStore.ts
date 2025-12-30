// import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';
// import type { Hero } from '../types';

// export const useHeroStore = defineStore('hero', () => {
//   // 1. State: Chứa danh sách tướng
//   const heroes = ref<Hero[]>([
//     // Dữ liệu giả để test giao diện (Mock Data)
//     {
//       id: '1', name: 'Tiêu Phong', rarity: 'Legendary', element: 'Fire',
//       level: 50, stars: 5, atk: 2500, hp: 10000, is_locked: true, is_equipped: true,
//       image_url: 'https://placehold.co/400x600/orange/white?text=Tieu+Phong'
//     },
//     {
//       id: '2', name: 'Hư Trúc', rarity: 'Epic', element: 'Wood',
//       level: 40, stars: 3, atk: 1800, hp: 8000, is_locked: false, is_equipped: false,
//       image_url: 'https://placehold.co/400x600/purple/white?text=Hu+Truc'
//     },
//     {
//       id: '3', name: 'Đoàn Dự', rarity: 'Rare', element: 'Water',
//       level: 30, stars: 2, atk: 1200, hp: 5000, is_locked: false, is_equipped: false,
//       image_url: 'https://placehold.co/400x600/blue/white?text=Doan+Du'
//     },
//     {
//       id: '4', name: 'Lính Cỏ', rarity: 'Common', element: 'Earth',
//       level: 1, stars: 1, atk: 100, hp: 500, is_locked: false, is_equipped: false,
//       image_url: 'https://placehold.co/400x600/gray/white?text=Linh+Co'
//     },
//     // Ca có thể copy thêm nhiều con nữa để test scroll
//   ]);

//   const filterRarity = ref<string>('All');

//   // 2. Getter: Lọc tướng (Sau này dùng cho bộ lọc)
//   const filteredHeroes = computed(() => {
//     if (filterRarity.value === 'All') return heroes.value;
//     return heroes.value.filter(h => h.rarity === filterRarity.value);
//   });

//   // 3. Action: Các hàm xử lý
//   function setFilter(rarity: string) {
//     filterRarity.value = rarity;
//   }

//   return { heroes, filteredHeroes, filterRarity, setFilter };
// });

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Hero } from '../types';

export const useHeroStore = defineStore('hero', () => {
  // 1. State: Chứa danh sách tướng
  const heroes = ref<Hero[]>([
    // Dữ liệu giả để test giao diện (Mock Data)
    {
      id: '1', name: 'Tiêu Phong', rarity: 'Legendary', element: 'Fire',
      level: 50, stars: 5, atk: 2500, hp: 10000, is_locked: true, is_equipped: true,
      image_url: 'https://placehold.co/400x600/orange/white?text=Tieu+Phong'
    },
    {
      id: '2', name: 'Hư Trúc', rarity: 'Epic', element: 'Wood',
      level: 40, stars: 3, atk: 1800, hp: 8000, is_locked: false, is_equipped: false,
      image_url: 'https://placehold.co/400x600/purple/white?text=Hu+Truc'
    },
    {
      id: '3', name: 'Đoàn Dự', rarity: 'Rare', element: 'Water',
      level: 30, stars: 2, atk: 1200, hp: 5000, is_locked: false, is_equipped: false,
      image_url: 'https://placehold.co/400x600/blue/white?text=Doan+Du'
    },
    {
      id: '4', name: 'Lính Cỏ', rarity: 'Common', element: 'Earth',
      level: 1, stars: 1, atk: 100, hp: 500, is_locked: false, is_equipped: false,
      image_url: 'https://placehold.co/400x600/gray/white?text=Linh+Co'
    },
    // Ca có thể copy thêm nhiều con nữa để test scroll
  ]);

  const filterRarity = ref<string>('All');
  const selectedHero = ref<Hero | null>(null); // <--- MỚI: Tướng đang được chọn

  // 2. Getters
  const filteredHeroes = computed(() => {
    if (filterRarity.value === 'All') return heroes.value;
    return heroes.value.filter(h => h.rarity === filterRarity.value);
  });

  // 3. Actions
  function setFilter(rarity: string) {
    filterRarity.value = rarity;
  }

  function selectHero(hero: Hero) { // <--- MỚI
    selectedHero.value = hero;
  }

  function clearSelection() { // <--- MỚI
    selectedHero.value = null;
  }

  return { heroes, filteredHeroes, filterRarity, selectedHero, setFilter, selectHero, clearSelection };
});