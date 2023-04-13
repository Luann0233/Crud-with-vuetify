<template>
  <v-row justify="space-around" class="mb-2">
    <v-col>
      <SelectStatus v-model="status" />
    </v-col>

    <v-col>
      <SelectGenero v-model="gender" />
    </v-col>

    <v-col>
      <v-text-field
        v-model="name"
        label="Nome"
        append-icon="mdi-account-group"
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

    <v-col
      align-self="center"
      class="text-align-end"
    >
      <v-btn
        prepend-icon="mdi-magnify"
        color="primary"
        @click="setFilters()"
      >
        Aplicar Filtros
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import SelectStatus from '~/components/SelectStatus.vue'
import SelectGenero from '~/components/SelectGenero.vue'

export default {
  name: 'FiltrosTabela',

  components: {
    SelectStatus,
    SelectGenero
  },

  data () {
    return {
      status: '',
      gender: '',
      name: '',
      email: ''
    }
  },

  methods: {
    setFilters () {
      const filters = {
        status: this.status,
        gender: this.gender,
        name: this.name,
        email: this.email
      }

      this.$emit('applyFilters', filters)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-align-end {
  text-align: end;
}
</style>
