// Định nghĩa các loại độ hiếm và nguyên tố giống trong Database
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
export type Element = 'Metal' | 'Wood' | 'Water' | 'Fire' | 'Earth';

// Khuôn mẫu của một con tướng (lấy từ Supabase về)
export interface Hero {
  id: string; // UUID
  name: string;
  rarity: Rarity;
  element: Element;
  level: number;
  stars: number;
  atk: number; // Chỉ số tấn công đã tính toán
  hp: number;
  image_url?: string;
  is_locked: boolean;
  is_equipped: boolean;
}