<template>
  <v-select
    id="_id"
    :value="value"
    :items="items"
    label="Status"
    item-text="label"
    :rules="rules"
    @input="input"
  />
</template>

<script>
import componentMixin from '~/mixins/component.js'

export default {
  name: 'SelectStatus',

  mixins: [componentMixin],

  props: {
    rules: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      items: [
        { label: 'Ativo', value: 'active' },
        { label: 'Inativo', value: 'inactive' },
        { label: 'Ambos', value: '' }
      ]
    }
  }
}
</script>
