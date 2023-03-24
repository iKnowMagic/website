<script setup lang="ts">
// @ts-expect-error
import backgroundImage from '@/assets/tree.png'
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${backgroundImage})` }"
    class="flex flex-col items-center justify-center w-screen h-screen bg-center bg-no-repeat bg-cover"
  >
    <div
      class="w-screen px-6 py-10 font-sans text-3xl text-center text-gray-600 bg-white-rgba"
    >
      Those who don't believe in magic will never find it.
    </div>
  </div>
</template>

<style>
video {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
}
</style>
