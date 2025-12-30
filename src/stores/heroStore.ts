import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "./authStore";
import type { Hero } from "../types";

// 1. Cấu hình đường dẫn gốc tới Repo Assets
const GITHUB_ASSETS_URL =
  "https://raw.githubusercontent.com/htkhang111/echo-abyss-assets/main";

export const useHeroStore = defineStore("hero", () => {
  const heroes = ref<Hero[]>([]);
  const loading = ref(false);
  const filterRarity = ref<string>("All");
  const selectedHero = ref<Hero | null>(null);

  const authStore = useAuthStore();

  // 2. Hàm helper lấy link ảnh "nghiêm túc"
  // Sau này trong DB bảng hero_templates huynh thêm cột 'asset_id' (vd: 'human_warrior_01')
  // thì thay cái string cứng kia bằng biến dynamic là xong.
  function getHeroImageUrl(assetId: string = "human_warrior_01") {
    return `${GITHUB_ASSETS_URL}/characters/portraits/${assetId}.png`;
  }

  async function fetchUserHeroes() {
    if (!authStore.user) return;
    loading.value = true;

    const { data, error } = await supabase
      .from("user_heroes")
      .select("*, hero_templates(*)");

    if (error) {
      console.error("Lỗi lấy tướng:", error);
    } else if (data) {
      heroes.value = data.map((item: any) => ({
        id: item.id,
        name: item.hero_templates.name,
        rarity: item.hero_templates.rarity,
        element: item.hero_templates.element,

        // 3. Gọi hàm lấy ảnh (Tạm thời force tất cả về human_warrior_01 để hiện hình)
        image_url: getHeroImageUrl(
          item.hero_templates.asset_id || "human_warrior_01"
        ),

        level: item.level,
        stars: item.stars,
        is_locked: item.is_locked,
        is_equipped: item.is_equipped,
        atk: item.hero_templates.base_atk + item.level * 10,
        hp: item.hero_templates.base_hp + item.level * 50,
      }));
    }
    loading.value = false;
  }

  async function summonHero() {
    if (!authStore.user) return;

    // Random tạm ID template 1-4
    const randomTemplateId = Math.floor(Math.random() * 4) + 1;

    const { error } = await supabase.from("user_heroes").insert({
      user_id: authStore.user.id,
      template_id: randomTemplateId,
      level: 1,
    });

    if (!error) {
      await fetchUserHeroes();
    }
  }

  const filteredHeroes = computed(() => {
    if (filterRarity.value === "All") return heroes.value;
    return heroes.value.filter((h) => h.rarity === filterRarity.value);
  });

  function setFilter(rarity: string) {
    filterRarity.value = rarity;
  }
  function selectHero(hero: Hero) {
    selectedHero.value = hero;
  }
  function clearSelection() {
    selectedHero.value = null;
  }

  return {
    heroes,
    loading,
    filteredHeroes,
    filterRarity,
    selectedHero,
    setFilter,
    selectHero,
    clearSelection,
    fetchUserHeroes,
    summonHero,
  };
});
