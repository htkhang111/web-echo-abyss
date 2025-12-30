import { createClient } from '@supabase/supabase-js'

// Lấy key từ biến môi trường (file .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Đại hiệp chưa cấu hình VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY trong file .env rồi!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)