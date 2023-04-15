<template>
  <div>
    <v-card :loading="loading">
      <v-alert
        v-model="alert.show"
        :type="typeAlert"
        dismissible
        elevation="2"
      >
        {{ alert.message }}
      </v-alert>

      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="formUsuario" v-model="valid">
          <v-container>
            <v-row>
              <!-- Nome -->
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="userFields.name"
                  label="Nome"
                  :rules="rulesName"
                  :counter="191"
                  required
                />
              </v-col>

              <!-- Email -->
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="userFields.email"
                  label="E-mail"
                  :rules="rulesEmail"
                  :counter="191"
                  required
                />
              </v-col>

              <!-- Genero -->
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <SelectGenero
                  v-model="userFields.gender"
                  :rules="rulesGender"
                  required
                />
              </v-col>

              <!-- Status -->
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <SelectStatus
                  v-model="userFields.status"
                  :rules="rulesStatus"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="close()"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="blue darken-1"
          text
          @click="setAction()"
        >
          {{ btnSaveLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'FormUser',

  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      loading: false,
      valid: false,
      userFields: {
        name: '',
        email: '',
        gender: '',
        status: ''
      },
      rulesName: [
        value => !!value || 'Obrigatório.',
        value => (value || '').length <= 191 || 'O Nome deve ter no Máximo 191 caracteres'
      ],
      rulesEmail: [
        value => !!value || 'Obrigatório.',
        value => (value || '').length <= 191 || 'O Email deve ter no Máximo 191 caracteres',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail Inválido.'
        }
      ],
      rulesGender: [
        (value) => {
          const validGenders = ['male', 'female']
          if (!validGenders.includes(value)) {
            return "O Genero de ser 'Masculino' ou 'Feminino'"
          } else {
            return true
          }
        }
      ],
      rulesStatus: [
        (value) => {
          const validStatuses = ['active', 'inactive']
          if (!validStatuses.includes(value)) {
            return "O Status de ser 'Ativo' ou 'Inativo'"
          } else {
            return true
          }
        }
      ],
      alert: {
        show: false,
        isError: false,
        message: ''
      }
    }
  },

  computed: {
    formTitle () {
      return this.user.id ? 'Editar Usuário' : 'Criar Novo Usuário'
    },

    btnSaveLabel () {
      return this.user.id ? 'Salvar' : 'Criar'
    },

    typeAlert () {
      return this.alert.isError ? 'error' : 'success'
    }
  },

  watch: {
    user: {
      immediate: true,
      handler (newValue, _oldValue) {
        this.userFields = structuredClone(newValue)
      }
    }
  },

  methods: {
    setAction () {
      const isValid = this.$refs.formUsuario.validate()
      if (!isValid) {
        return
      }

      if (this.user.id) {
        this.edit()
      } else {
        this.save()
      }
    },

    async save () {
      this.loading = true
      await this.$post('/users', this.userFields)
        .then((res) => {
          this.alert.show = true
          this.alert.isError = false
          this.alert.message = 'Usuário CRIADO com sucesso!'
          setTimeout(() => {
            this.$emit('atualizarLista')
            this.close()
          }, 3500)
        }).catch((error) => {
          this.alert.show = true
          this.alert.isError = true
          this.alert.message = this.setMessageError(
            error.response.data.data
          )
        }).finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 3500)
        })
    },

    async edit () {
      this.loading = true
      await this.$put(`users/${this.userFields.id}`, this.userFields)
        .then((res) => {
          this.alert.show = true
          this.alert.isError = false
          this.alert.message = 'Usuário EDITADO com sucesso!'
          setTimeout(() => {
            this.$emit('atualizarLista')
            this.close()
          }, 3500)
        }).catch((error) => {
          this.alert.show = true
          this.alert.isError = true
          this.alert.message = this.setMessageError(
            error.response.data.data
          )
        }).finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 3500)
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
      this.userFields = {
        name: '',
        email: '',
        gender: '',
        status: ''
      }

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
