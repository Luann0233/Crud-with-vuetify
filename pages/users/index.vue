<template>
  <div>
    <!-- Filtros -->
    <FiltrosTabela @applyFilters="applyFilters" />

    {{ loading }}

    <v-data-table
      :loading="loading"
      class="elevation-1"
      sort-by="id"
      :headers="headers"
      :items="users"
      :server-items-length="totalItensServer"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Usários</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />

          <v-spacer />

          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="showDialog=true"
          >
            Criar Usuário
          </v-btn>
        </v-toolbar>
      </template>

      <template #[`item.gender`]="{ item }">
        <v-chip
          :color="getColorGender(item.gender)"
          dark
        >
          {{ getLabelGender(item.gender) }}
        </v-chip>
      </template>

      <template #[`item.status`]="{ item }">
        <v-badge
          :color="getColorStatus(item.status)"
          dot
        >
          {{ getLabelStatus(item.status) }}
        </v-badge>
      </template>

      <template #[`item.onOff`]="{ item }">
        <ButtonAtivaDesativa :item="item" @ativarUser="ativarUser" />
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="sendEditUser(item)"
        >
          mdi-pencil
        </v-icon>

        <v-icon
          small
          @click="deleteUser(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template #no-data>
        Sem Dados
      </template>
    </v-data-table>

    <DialogUsuario
      :visible="showDialog"
      :user-edit="userEdit"
      @close="showDialog=false"
      @teste="atualizaLoading"
    />
  </div>
</template>

<script>
import usersMixin from '~/mixins/users.js'
import FiltrosTabela from '~/components/FiltrosTabela.vue'
import ButtonAtivaDesativa from '~/components/ButtonAtivaDesativa.vue'
import DialogUsuario from '~/components/DialogUsuario.vue'

export default {
  components: {
    FiltrosTabela,
    ButtonAtivaDesativa,
    DialogUsuario
  },

  mixins: [usersMixin],

  data () {
    return {
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
          text: 'Ativar/Desativar',
          align: 'center',
          sortable: false,
          value: 'onOff'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false
        }
      ],
      userEdit: {},
      showDialog: false
    }
  },

  async created () {
    await this.getUsers()
  },

  methods: {
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

    getColorStatus (status) {
      if (status === 'active') {
        return 'green'
      } else {
        return ''
      }
    },

    getLabelStatus (status) {
      if (status === 'active') {
        return 'Ativo'
      } else {
        return 'Inativo'
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
    },

    async ativarUser (user) {
      const acao = user.status === 'active' ? 'desativar' : 'ativar'
      await this.ativarDesativarUsuario(user.id, acao)
    },

    sendEditUser (user) {
      this.showDialog = true
      this.userEdit = Object.assign({}, user)
    },

    async deleteUser (id) {
      await this.deleteUsuario(id)
    },

    atualizaLoading (value) {
      debugger
      this.loading = value
    }

  }
}
</script>
