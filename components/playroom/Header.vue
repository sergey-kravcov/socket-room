<template>
  <BaseHeader
    :username="user.username"
    text="Room"
    class="bg-gray-800 text-blue-400 shadow-[0_0_10px_5px_rgba(0,0,0,0.3)]"
  >
    <template #logo>
      <BaseIcon name="meeting_room" class="mr-2 text-4xl" />
    </template>
  </BaseHeader>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  computed: {
    ...get(['user']),
  },
}
</script>

<style lang="postcss" scoped></style>
