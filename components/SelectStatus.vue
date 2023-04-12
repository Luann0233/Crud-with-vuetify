<template>
  <v-select
    id="_id"
    :value="value"
    :items="items"
    label="Status"
    item-text="label"
    @input="input"
  />
</template>

<script>
import componentMixin from '~/mixins/component.js'

export default {
  name: 'SelectStatus',

  mixins: [componentMixin],

  data () {
    return {
      items: [
        { label: 'Ativo', value: 'inactive' },
        { label: 'Inativo', value: 'active' },
        { label: 'Ambos', value: '' }
      ]
    }
  }
}
</script>
