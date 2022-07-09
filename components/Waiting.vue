<template>
  <div>
    <Header :title="gameName" />
    <div class="flex flex-col items-center">
      <div class="my-5 text-center">Недостаточно игроков для начала игры.</div>
      <div class="py-2 px-3 bg-gray-200 flex items-center gap-4 rounded ml-6">
        <strong>Share:</strong>
        <a
          :href="`https://t.me/share/url?url=${currentUrl}&text=${linkText}`"
          target="_blank"
          rel="noopener"
          class="text-blue-400"
        >
          <BaseIcon name="telegram" />
        </a>
        <a
          :href="`viber://forward?text=${currentUrl} ${linkText}`"
          target="_blank"
          rel="noopener"
          class="text-purple-600"
        >
          <BaseIcon name="phone_in_talk" />
        </a>
        <button v-if="isSecureContext" class="text-gray-600 copy relative" @click="copyUrl">
          <BaseIcon name="link" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/playroom/Header.vue'

export default {
  components: {
    Header,
  },
  props: {
    gameName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      linkText: `Переходи по ссылке, чтобы мы смогли сыграть вместе в игру '${this.gameName}'`,
      currentUrl: document.URL,
      isSecureContext: window.isSecureContext,
    }
  },
  methods: {
    copyUrl(event) {
      if (window.isSecureContext) {
        navigator.clipboard.writeText(`${this.currentUrl} ${this.linkText}`)
        setTimeout(() => {
          event.target.blur()
        }, 500)
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
