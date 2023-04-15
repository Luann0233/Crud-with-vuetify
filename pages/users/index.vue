<template>
  <div>
    <!-- Filtros -->
    <FiltrosTabela @applyFilters="applyFilters" />

    <v-data-table
      class="elevation-1"
      :loading="loading"
      :headers="headers"
      :items="users"
      :server-items-length="pagination.totalItensServer"
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

          <!-- Modal Cadastrar/Editar Usuario -->
          <v-dialog
            v-model="showDialogForm"
            max-width="700px"
            persistent
          >
            <template #activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                Criar Usuário
              </v-btn>
            </template>
            <FormUser
              :user="userObj"
              @close="showDialogForm=false"
              @atualizarLista="getUsers"
            />
          </v-dialog>

          <!-- Modal Delete Usuario -->
          <v-dialog v-model="showModalDelete" max-width="600px" persistent>
            <UserDeleteDialog
              :user="userObj"
              @closeDialog="showModalDelete=false"
            />
          </v-dialog>
        </v-toolbar>
      </template>

      <!-- Genero -->
      <template #[`item.gender`]="{ item }">
        <TagGenero :gender="item.gender" />
      </template>

      <!-- Status -->
      <template #[`item.status`]="{ item }">
        <LabelStatus :status="item.status" />
      </template>

      <!-- Btn Alterar Status -->
      <template #[`item.onOff`]="{ item }">
        <ButtonAtivaDesativa :item="item" @updateStatusUser="updateStatusUser" />
      </template>

      <!-- Btns Editar/Apagar -->
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
  </div>
</template>

<script>
import UserNewMixin from '~/mixins/userNew.js'

import FiltrosTabela from '~/components/FiltrosTabela.vue'
import FormUser from '~/components/FormUser.vue'
import TagGenero from '~/components/TagGenero.vue'
import LabelStatus from '~/components/LabelStatus.vue'
import ButtonAtivaDesativa from '~/components/ButtonAtivaDesativa.vue'

export default {

  components: {
    FiltrosTabela,
    FormUser,
    TagGenero,
    LabelStatus,
    ButtonAtivaDesativa
  },

  mixins: [UserNewMixin],

  methods: {
    sendEditUser (user) {
      this.userObj = user
      this.showDialogForm = true
    },

    async deleteUser (id) {
      this.loading = true
      await this.$delete(`/users/${id}`).then(async (res) => {
        // sucesso
        await this.getUsers()
      }).finally(() => {
        this.loading = false
      })
    }

  }

}
</script>

<style lang="scss" scoped>

</style>
