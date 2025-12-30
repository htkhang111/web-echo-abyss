<script setup lang="ts">
import { PhGlobe, PhDiscordLogo, PhFacebookLogo } from '@phosphor-icons/vue';
</script>

<template>
  <footer class="mt-auto pt-8 pb-4 text-center">
    <div class="glass-panel inline-flex items-center gap-6 px-6 py-2 rounded-full mb-4">
        <a href="#" class="text-gray-400 hover:text-[#5865F2] transition-colors"><PhDiscordLogo size="20" weight="fill" /></a>
        <a href="#" class="text-gray-400 hover:text-[#1877F2] transition-colors"><PhFacebookLogo size="20" weight="fill" /></a>
        <a href="#" class="text-gray-400 hover:text-primary transition-colors"><PhGlobe size="20" weight="fill" /></a>
    </div>
    
    <div class="text-[10px] text-gray-500 font-mono">
        <p>ECHO ABYSS - EARLY ACCESS v0.1.0</p>
        <p class="mt-1">© 2024 Khuynh Hàn Studio. All rights reserved.</p>
    </div>
  </footer>
</template>