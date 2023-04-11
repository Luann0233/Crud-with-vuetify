<template>
  <v-select
    v-model="sexo"
    :items="items"
    label="Sexo"
    item-text="label"
  />
</template>

<script>
export default {
  name: 'SelectSexo',

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
