<template>
  <div>
    <Header />
    <div class="my-5 text-center">Недостаточно игроков для начала игры.</div>
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
