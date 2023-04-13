<template>
  <v-dialog
    v-model="show"
    max-width="500px"
  >
    <v-card>
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
                v-model="user.name"
                label="Nome"
                :rules="rulesNome"
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
                v-model="user.email"
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
                  v-model="user.gender"
                  :rules="rulesGenero"
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
                  v-model="user.status"
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
          Cancel
        </v-btn>

        <v-btn
          color="blue darken-1"
          text
          @click="save()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import usersMixin from '~/mixins/users.js'
import SelectGenero from '~/components/SelectGenero.vue'
import SelectStatus from '~/components/SelectStatus.vue'

export default {
  name: 'DialogUsuario',

  components: {
    SelectGenero,
    SelectStatus
  },

  mixins: [usersMixin],

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      dialog: false,
      valid: false,
      user: {
        name: '',
        email: '',
        gender: '',
        status: ''
      },
      rulesNome: [
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
      rulesGenero: [
        value => value !== '' || 'Selecione um gênero válido'
      ],
      rulesStatus: [
        value => value !== '' || 'Selecione um status válido'
      ]
    }
  },

  computed: {
    show: {
      get () {
        return this.visible
      },

      set (value) {
        if (!value) {
          this.close()
        }
      }
    }
  },

  methods: {
    async save () {
      const isValid = this.$refs.formUsuario.validate()
      if (!isValid) {
        return
      }

      await this.saveUsers(this.user)
      this.close()
    },

    reset () {
      this.user = {
        name: '',
        email: '',
        gender: '',
        status: ''
      }
    },

    close () {
      this.reset()
      this.$emit('close')
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
