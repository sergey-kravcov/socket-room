<template>
  <div class="flex items-center p-5 transition duration-500">
    <slot name="back" :back="back">
      <BaseIcon
        :class="[active === 0 ? 'opacity-30' : 'cursor-pointer']"
        class="text-4xl"
        name="arrow_back_ios"
        @click.native="back()"
      />
    </slot>
    <div class="mx-3 overflow-hidden">
      <div :style="getSlidesStyles" class="grid transition-transform duration-500">
        <slot />
      </div>
    </div>
    <slot name="forward" :forward="forward">
      <BaseIcon
        :class="[active === slidesNumber - 1 ? 'opacity-30' : 'cursor-pointer']"
        class="text-4xl"
        name="arrow_forward_ios"
        @click.native="forward()"
      />
    </slot>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 0,
  }),
  computed: {
    slidesNumber() {
      return this.$slots.default.filter(({ tag }) => tag).length
    },
    getSlidesStyles() {
      return {
        width: `${this.slidesNumber * 100}%`,
        transform: `translateX(-${(this.active * 100) / this.slidesNumber}%)`,
        'grid-template-columns': `repeat(${this.slidesNumber}, minmax(0, 1fr))`,
      }
    },
  },
  methods: {
    switchSlide(step) {
      if (this.active + step >= 0 && this.active + step < this.slidesNumber) {
        this.active += step
        this.$emit('switch-slide', this.active)
      }
    },
    back() {
      this.switchSlide(-1)
    },
    forward() {
      this.switchSlide(1)
    },
  },
}
</script>

<style lang="postcss" scoped></style>
