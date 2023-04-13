<template>
  <v-row justify="space-around" class="mb-2">
    <v-col :cols="6">
      <SelectStatus v-model="status" />
    </v-col>

    <v-col :cols="6">
      <SelectSexo v-model="gender" />
    </v-col>

    <v-col :cols="6">
      <v-text-field
        v-model="name"
        label="Nome"
        append-icon="mdi-account-group"
        hide-details="auto"
      />
    </v-col>

    <v-col :cols="6">
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
      :cols="6"
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
export default {
  name: 'FiltrosTabela',

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
