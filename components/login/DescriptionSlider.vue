<template>
  <BaseSlider
    :class="[even ? 'bg-blue-400 text-gray-800 border-gray-800' : 'bg-gray-800 text-blue-400 border-blue-400']"
    class="mb-10 mx-5 border-4 border-dashed max-w-[700px] min-h-[200px]"
    @switch-slide="calculateEven"
  >
    <div>
      <h2 class="text-2xl font-bold">Добро пожаловать в макет игровой комнаты!</h2>
      <p class="py-2">Это просто пример базового слайдера.</p>
      <div class="text-center">
        <BaseIcon name="meeting_room" class="text-5xl" />
      </div>
    </div>
    <div>Слайд №2.</div>
    <div>Слайд №3.</div>
  </BaseSlider>
</template>

<script>
export default {
  data: () => ({
    even: true,
  }),
  methods: {
    calculateEven(active) {
      this.even = active % 2 === 0
    },
  },
}
</script>

<style lang="postcss" scoped></style>
