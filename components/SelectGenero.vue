<template>
  <v-select
    id="_id"
    :value="value"
    :items="items"
    label="Sexo"
    item-text="label"
    :rules="rules"
    @input="input"
  />
</template>

<script>
import componentMixin from '~/mixins/component.js'

export default {
  name: 'SelectGenero',

  mixins: [componentMixin],

  props: {
    rules: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      sexo: [],
      items: [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Ambos', value: '' }
      ]
    }
  }
}
</script>
