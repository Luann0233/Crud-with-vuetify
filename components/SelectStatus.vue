<template>
  <v-select
    v-model="status"
    :items="items"
    label="Status"
    item-text="label"
  />
</template>

<script>
export default {
  name: 'SelectStatus',

  data () {
    return {
      status: [],
      items: [
        { label: 'Ativo', value: 'inactive' },
        { label: 'Inativo', value: 'active' },
        { label: 'Ambos', value: '' }
      ]
    }
  }
}
</script>
