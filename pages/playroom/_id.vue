<template>
  <component :is="componentName" />
</template>

<script>
import { upperFirst } from 'lodash-es'
import { get } from 'vuex-pathify'
import responseStatus from '~/server/enums/responseStatus'
import Preparation from '@/components/Preparation.vue'
import Waiting from '@/components/Waiting.vue'

export default {
  components: {
    Preparation,
    Waiting,
  },
  computed: {
    componentName() {
      return upperFirst(this.room.status)
    },
    ...get(['room', 'user']),
  },
  beforeMount() {
    if (this.user && this.user.id) {
      addEventListener('beforeunload', this.refresh)
    } else {
      this.checkSavedUser()
    }
  },
  beforeDestroy() {
    removeEventListener('beforeunload', this.refresh)
  },
  methods: {
    checkSavedUser() {
      const id = localStorage.id || ''
      const username = localStorage.username || ''
      const roomId = this.$route.params.id
      if (id && username) {
        this.reestablish({
          username,
          id,
          roomId,
        })
      } else {
        this.$router.push({ name: 'index', query: { room: roomId } })
      }
    },
    reestablish(data) {
      this.$socket.emit('reestablish-connection', data, (responseData) => {
        if (responseData.status === responseStatus.ok) {
          this.user = responseData.user
          this.room = responseData.room
          addEventListener('beforeunload', this.refresh)
        } else if (responseData.status === responseStatus.error) {
          this.$router.push({ name: 'index' })
        } else if (responseData.status === responseStatus.notAuthorized) {
          this.$router.push({ name: 'index', query: { room: data.roomId } })
        }
      })
    },
    refresh() {
      this.$socket.emit('refresh', this.user)
    },
  },
}
</script>

<style lang="postcss" scoped></style>
