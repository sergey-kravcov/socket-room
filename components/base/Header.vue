<template>
  <header class="flex items-center w-full p-2 bg-gray-800 shadow-[0_0_10px_5px_rgba(0,0,0,0.3)]">
    <div class="flex items-center text-blue-300">
      <slot name="logo"></slot>
      <slot name="text">
        <h1 class="text-xl font-bold font-mono">{{ title }}</h1>
      </slot>
    </div>
    <div v-if="username" class="flex items-center ml-auto gap-2">
      <div class="text-gray-200">{{ username }}</div>
      <div class="border-r p-[1px] h-10 border-gray-500 border-dashed"></div>
      <BaseButton icon="logout" theme="reverse" @click="$emit('logout')">
        <span class="sm:block hidden">Выход</span>
      </BaseButton>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
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

<style lang="postcss" scoped>
.copy:focus:before {
  content: 'Скопировано в буфер';
  position: absolute;
  bottom: -0.5rem;
  right: 0;
  transform: translate(50%, 100%);
  background-color: #4b5563;
  color: #fff;
  padding: 0.25rem;
  border-radius: 0.2rem;
}
</style>
