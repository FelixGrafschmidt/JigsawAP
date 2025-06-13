<template>
  <div class="mx-auto w-full flex flex-col gap-4">
    <FormInput
      v-model="hostport" label="Host and Port" :disableed="connecting" name="hostport"
      placeholder="Example: archipelago.gg:38281"
    />

    <FormInput
      v-model="playerName" label="Player Name" name="name" :disableed="connecting"
      placeholder="Example: Jigsaw"
    />

    <FormInput
      v-model="password" label="Password" name="password" :disableed="connecting"
      placeholder="Leave blank if no password"
    />

    <template v-if="error">
      <div class="flex flex-col items-center justify-center gap-1">
        <div class="flex flex-row items-center justify-center text-lg text-red-500">
          {{ error }}
        </div>
        <div class="flex flex-row items-center justify-center text-sm text-gray-400">
          Common remedies: refresh room and check login info
        </div>
        <div class="flex flex-row items-center justify-center text-sm text-gray-400">
          Please refresh this page to try again :)
        </div>
      </div>
    </template>

    <template v-if="connecting">
      <div class="flex flex-row items-center justify-center text-lg text-teal-3">
        Connecting...
      </div>
    </template>
    <template v-else>
      <FGButton color="green" size="2xl" fullwidth label="Login & Connect" @click="submitLogin" />
      <FGButton color="green" size="2xl" fullwidth label="Solo (same seed every time, no save)" @click="submitSolo" />
      <FGButton color="gray" size="lg" fullwidth label="Solo (with rotations)" @click="submitSoloRotations" />
      <FGButton color="gray" size="lg" fullwidth label="Options" @click="submitOptions" />
    </template>
  </div>
</template>

<script lang="ts" setup>
const hostport = useLocalStorage('hostport', '')
const playerName = useLocalStorage('playerName', '')
const password = ref('');

const connecting = ref(false);
const error = ref('');

const { login } = toRefs(useAPClient())

async function submitLogin() {
  connecting.value = true;
  // Connect to the Archipelago server
  try {
    await login.value(hostport.value, playerName.value, 'Jigsaw', password.value)
  } catch (e) {
    error.value = `Failed: ${e}`;
  } finally {
    connecting.value = false;
  }
}
async function submitSolo() { }
async function submitSoloRotations() { }
async function submitOptions() { }
</script>
