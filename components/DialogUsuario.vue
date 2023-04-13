<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on"
      >
        Criar Usuário
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
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
              />
            </v-col>

            <!-- Genero -->
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <SelectGenero v-model="user.gender" :rules="rulesGenero" />
            </v-col>

            <!-- Status -->
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <SelectStatus v-model="user.status" :rules="rulesStatus" />
            </v-col>
          </v-row>
        </v-container>
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

  data () {
    return {
      dialog: false,
      user: {
        name: '',
        email: '',
        gender: '',
        status: ''
      },
      rulesNome: [
        value => !!value || 'Obrigatório.',
        value => (value || '').length <= 191 || 'Máximo 191 caracteres'
      ],
      rulesEmail: [
        value => !!value || 'Obrigatório.',
        value => (value || '').length <= 191 || 'Máximo 191 caracteres',
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
    formTitle () {
      return this.editedIndex === -1 ? 'Criar Novo Usuário' : 'Editar Usuário'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    async save () {
      debugger

      await this.saveUsers(this.user)
      this.close()
    },

    resetUser () {
      this.user = {
        name: '',
        email: '',
        gender: '',
        status: ''
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.resetUser()
        this.editedIndex = -1
      })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
