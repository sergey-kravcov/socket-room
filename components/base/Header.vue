<template>
  <header class="flex justify-between w-full p-2">
    <div class="flex items-center">
      <slot name="logo"></slot>
      <slot name="text">
        <h1 class="text-xl font-bold">{{ text }}</h1>
      </slot>
    </div>
    <div v-if="username" class="flex items-center">
      <div class="pr-2 mr-2 border-r">{{ username }}</div>
      <BaseButton text="Выход" icon="logout" theme="link" />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped></style>
