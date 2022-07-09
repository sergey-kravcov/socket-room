<template>
  <button
    :class="theme"
    class="inline-flex items-center py-1 px-2 font-bold rounded disabled:cursor-default"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <BaseIcon v-if="icon" :name="icon" class="mr-1" />
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped>
.primary {
  @apply text-gray-800 bg-blue-400 hover:bg-blue-500 disabled:bg-blue-400/40;
}
.link {
  @apply text-blue-500 hover:text-blue-600 disabled:text-blue-500/30;
}
.reverse {
  @apply text-gray-300 bg-gray-600 hover:bg-gray-200 hover:text-gray-700 disabled:opacity-40;
}
</style>
