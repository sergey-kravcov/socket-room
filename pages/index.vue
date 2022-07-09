<template>
  <div class="flex flex-col items-center w-full min-h-screen py-10 text-blue-400 bg-gray-700">
    <DescriptionSlider />
    <div class="w-[250px] p-4 bg-black/50 shadow-[0_0_10px_5px_rgba(0,0,0,0.3)] login-form mt-20">
      <BaseInput v-model="username" :error-message="usernameError" icon="face" placeholder="Никнейм*" autofocus />
      <BaseInput v-model="roomId" :error-message="roomError" icon="meeting_room" placeholder="Ключ к комнате" />
      <div class="pt-4">
        <BaseButton :disabled="isDisabledLoginButton" text="Войти" class="justify-center w-full" @click="login()" />
      </div>
    </div>
  </div>
</template>

<script>
import { sync } from 'vuex-pathify'
import DescriptionSlider from '@/components/login/DescriptionSlider.vue'
import { responseStatus } from '@/api/enums/responseStatus'

export default {
  components: {
    DescriptionSlider,
  },
  data() {
    return {
      id: '',
      username: '',
      roomId: '',
      errorMessage: '',
      invalidField: '',
    }
  },
  computed: {
    usernameError() {
      return this.invalidField === 'username' ? this.errorMessage : ''
    },
    roomError() {
      return this.invalidField === 'room' ? this.errorMessage : ''
    },
    isDisabledLoginButton() {
      return !!this.errorMessage
    },
    ...sync(['user', 'room']),
  },
  watch: {
    roomId() {
      this.errorMessage = ''
      this.invalidField = ''
    },
    username() {
      this.errorMessage = ''
      this.invalidField = ''
    },
  },
  beforeMount() {
    this.id = localStorage.id || ''
    this.username = localStorage.username || ''
    this.roomId = this.$route.query.room || ''
  },
  methods: {
    login() {
      const requestData = {
        id: this.id,
        username: this.username,
        roomId: this.roomId,
      }
      this.$socket.emit('join', requestData, (responseData) => {
        if (responseData.status === responseStatus.ok) {
          localStorage.setItem('username', responseData.user.username)
          localStorage.setItem('id', responseData.user.id)

          this.user = responseData.user
          this.room = responseData.room

          this.$router.push({
            name: 'playroom-id',
            params: { id: responseData.room.id },
          })
        } else {
          this.errorMessage = responseData.message
          this.invalidField = responseData.field
        }
      })
    },
  },
}
</script>

<style lang="postcss">
.login-form input {
  @apply border-none bg-transparent;
}
</style>
