<template>
  <v-card :loading="loading">
    <v-alert
      v-model="alert.show"
      :type="typeAlert"
      dismissible
      elevation="2"
    >
      {{ alert.message }}
    </v-alert>

    <v-card-title class="text-h5">
      Apagar Usuario
    </v-card-title>

    <v-card-text>
      <p>Tem certeza que desja APAGAR o usuário <b>{{ user.name }}</b>?</p>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        text
        :disabled="sending"
        @click="close()"
      >
        Cancelar
      </v-btn>

      <v-btn
        color="red darken-1"
        type="submit"
        :disabled="sending"
        text
        @click="deleteUser()"
      >
        Apagar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ModalDeleteUser',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: false,
      sending: false,
      alert: {
        show: false,
        isError: false,
        message: ''
      }
    }
  },

  computed: {
    typeAlert () {
      return this.alert.isError ? 'error' : 'success'
    }
  },

  methods: {
    async deleteUser () {
      this.loading = true
      this.sending = true
      await this.$Delete(`users/${this.user.id}`)
        .then((res) => {
          this.alert.show = true
          this.alert.isError = false
          this.alert.message = 'Usuário APAGADO com sucesso!'
          setTimeout(() => {
            this.$emit('atualizarLista')
            this.close()
          }, 3500)
        })
        .catch((error) => {
          this.alert.show = true
          this.alert.isError = true
          this.alert.message = this.setMessageError(
            error.response.data.data
          )
          this.sending = false
        })
        .finally(() => {
          this.loading = false
        })
    },

    setMessageError (errors) {
      let errorMessage = ''

      errors.forEach((err) => {
        errorMessage += `[${err.field}] - ${err.message};\n`
      })

      return errorMessage
    },

    reset () {
      this.sending = false
      this.alert = {
        show: false,
        isError: false,
        message: ''
      }
    },

    close () {
      this.reset()
      this.$emit('close')
    }

  }
}
</script>
