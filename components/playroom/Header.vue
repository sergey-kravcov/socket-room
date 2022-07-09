<template>
  <BaseHeader :username="user.username" title="Room" @logout="logout()">
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
  methods: {
    logout() {
      localStorage.setItem('id', '')
      this.$router.push({ name: 'index' })
    },
  },
}
</script>

<style lang="postcss" scoped></style>
