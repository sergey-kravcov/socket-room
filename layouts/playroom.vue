<template>
  <div>
    <Header />
    <NuxtChild />
    <BaseAlert />
  </div>
</template>

<script>
import Header from '@/components/playroom/Header.vue'

export default {
  components: {
    Header,
  },
}
</script>

<style lang="postcss" scoped></style>
