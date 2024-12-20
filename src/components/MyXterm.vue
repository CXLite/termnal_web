<script setup>
import { onMounted, onUnmounted } from 'vue'
import { runFakeTerminal } from '@/utils/xterm/main'
import '@xterm/xterm/css/xterm.css'
import { fitAddon } from '@/utils/xterm/main'

const resizeHandler = () => {
  fitAddon.fit()
}
onMounted(() => {
  runFakeTerminal()
  window.addEventListener('resize', resizeHandler)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <div id="xterm-body" class="rounded px-3 py-2 bg-[#2d2e2c] pr-1 h-full min-h-[300px]">
    <div id="xterm-inner" class="h-full"></div>
  </div>
</template>

<style>
.xterm-viewport::-webkit-scrollbar {
  width: 8px;
}
.xterm-viewport::-webkit-scrollbar-track {
  opacity: 0;
}
.xterm-viewport::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-color: #a0a0a092;
}

.h-full{
    width: 100%;
    height: 100%;
}
</style>