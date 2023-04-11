<template>
  <v-container class="bg-surface-variant">
    <v-row>
      <v-col>
        <SelectStatus v-model="status" />
      </v-col>

      <v-col>
        <SelectSexo v-model="sexo" />
      </v-col>

      <v-col>
        <v-text-field
          v-model="name"
          label="Nome"
          append-icon="mdi-account-group"
          :rules="rules"
          hide-details="auto"
        />
      </v-col>

      <v-col>
        <v-text-field
          v-model="email"
          label="Email"
          append-icon="mdi-at"
          hide-details="auto"
        />
      </v-col>

      <v-col align-self="center" class="text-align-end">
        <v-btn prepend-icon="mdi-magnify">
          Aplicar
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <ul>
        <li v-for="(user, index) in users" :key="index">
          <p>
            <b>Nome: </b> {{ user.name }}
          </p>

          <p>
            <b>Email: </b> {{ user.email }}
          </p>

          <p>
            <b>Genero: </b> {{ user.gender }}
          </p>

          <p>
            <b>Status: </b> {{ user.status }}
          </p>

          <hr>
        </li>
      </ul>
    </v-row>
  </v-container>
</template>

<script>
import SelectStatus from '~/components/SelectStatus.vue'
import SelectSexo from '~/components/SelectSexo.vue'

export default {

  components: {
    SelectStatus,
    SelectSexo
  },

  data () {
    return {
      users: [],
      status: '',
      sexo: '',
      nome: '',
      email: ''
    }
  },

  async created () {
    await this.getUsers()
  },

  methods: {
    async getUsers () {
      await this.$axios.$get('/users').then((res) => {
        this.users = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text-align-end {
  text-align: end;
}
</style>
