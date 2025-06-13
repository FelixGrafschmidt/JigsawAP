<template>
  <div id="login-container" class="">
    <div class="mx-auto mt-12 w-110 flex flex-col gap-4 border border-gray-5 rounded-xl bg-gray-8 p-8">
      <h2 class="text-2xl font-bold">
        Jigsaw Puzzles for Archipelago
      </h2>

      <label
        v-if="isVertical" class="text-center text-gray-4"
      >
        Consider rotating your device to landscape!
      </label>

      <LoginForm />

      <div
        style="margin-top: 20px; font-size: 0.9em; color: white; border: 2px solid #4dabf7; padding: 10px; text-align: center; border-radius: 10px;"
      >
        The images displayed on this website are loaded directly from external sources and are not hosted or
        distributed by this site.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isVertical = computed(() => {
  return window.innerHeight > window.innerWidth;
});
</script>
