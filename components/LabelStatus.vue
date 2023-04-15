<template>
  <v-badge
    :color="getColor(status)"
    dot
  >
    {{ getLabel(status) }}
  </v-badge>
</template>

<script>
export default {
  name: 'LabelStatus',

  props: {
    status: {
      type: String,
      default: ''
    }
  },

  methods: {
    getColor (status) {
      if (status === 'active') {
        return 'green'
      } else {
        return ''
      }
    },

    getLabel (status) {
      if (status === 'active') {
        return 'Ativo'
      } else {
        return 'Inativo'
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
