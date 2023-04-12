<template>
  <v-select
    id="_id"
    :value="value"
    :items="items"
    label="Sexo"
    item-text="label"
    @input="input"
  />
</template>

<script>
import componentMixin from '~/mixins/component.js'

export default {
  name: 'SelectSexo',

  mixins: [componentMixin],

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
