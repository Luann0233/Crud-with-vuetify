<template>
  <div>
    <!-- Filtros -->
    <FiltrosTabela @applyFilters="applyFilters" />

    <v-data-table
      :loading="loading"
      class="elevation-1"
      sort-by="id"
      :headers="headers"
      :items="users"
      :server-items-length="totalItensServer"
    >
      <template #[`item.gender`]="{ item }">
        <v-chip
          :color="getColorGender(item.gender)"
          dark
        >
          {{ getLabelGender(item.gender) }}
        </v-chip>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template #no-data>
        Sem Dados
      </template>
    </v-data-table>
  </div>
</template>

<script>
import FiltrosTabela from '~/components/FiltrosTabela.vue'

export default {
  components: {
    FiltrosTabela
  },

  data () {
    return {
      loading: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'E-mail',
          align: 'start',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Gênero',
          align: 'start',
          sortable: false,
          value: 'gender'
        },
        {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'status'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      users: [],
      totalItensServer: 0
    }
  },

  async created () {
    await this.getUsers()
  },

  methods: {
    async getUsers (config) {
      this.loading = true
      await this.$get('/users', config).then((res) => {
        this.users = res.data.data
        this.totalItensServer = res.data.meta.pagination.total
      }).finally(() => {
        this.loading = false
      })
    },

    getColorGender (gender) {
      if (gender === 'male') {
        return 'blue'
      } else {
        return 'pink'
      }
    },

    getLabelGender (gender) {
      if (gender === 'male') {
        return 'Masculino'
      } else {
        return 'Feminino'
      }
    },

    async applyFilters (filters) {
      this.loading = true

      const filtersFormated = {}
      Object.keys(filters).forEach((key) => {
        if (filters[key] !== '') {
          filtersFormated[key] = filters[key]
        }
      })

      const config = {
        params: {
          ...filters
        }
      }

      await this.getUsers(config)
    }
  }
}
</script>
