import { mapFields } from 'vuex-map-fields'

export default {

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
      userObj: {},
      userObjDelete: {},
      showDialogForm: false,
      showModalDelete: false
    }
  },

  computed: {
    ...mapFields(['users', 'pagination', 'options'])
  },

  async created () {
    await this.getUsers()
  },

  methods: {
    async getUsers (config = {}) {
      this.loading = true
      await this.$get('/users', config).then((res) => {
        this.users = [...res.data.data]
        this.pagination.totalItensServer = res.data.meta.pagination.total
      }).finally(() => {
        this.loading = false
      })
    },

    async applyFilters (filters) {
      const config = {
        params: {
          ...filters
        }
      }

      await this.getUsers(config)
    },

    async updateStatusUser (user) {
      this.loading = true

      const action = user.status === 'active' ? 'desativar' : 'ativar'

      const body = {}
      if (action === 'ativar') {
        body.status = 'active'
      } else {
        body.status = 'inactive'
      }

      await this.$put(`/users/${user.id}`, body).then(async (res) => {
        await this.getUsers()
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
