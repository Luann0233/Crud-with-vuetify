<template>
  <v-tooltip left>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        @click="$emit('updateStatusUser', item)"
        v-on="on"
      >
        <v-icon>
          {{ getColorIcon (item.status) }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ getLabelTooltip(item.status) }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'ButtonAtivaDesativa',

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    getColorIcon (status) {
      if (status === 'active') {
        return 'mdi-power-sleep'
      } else {
        return 'mdi-power'
      }
    },

    getLabelTooltip (status) {
      if (status === 'active') {
        return 'Desativar Usuário'
      } else {
        return 'Ativar Usuário'
      }
    }
  }
}
</script>
