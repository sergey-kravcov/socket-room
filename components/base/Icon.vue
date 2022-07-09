<template>
  <span class="select-none material-icons flex pointer-events-none">
    <slot>{{ name }}</slot>
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped></style>
