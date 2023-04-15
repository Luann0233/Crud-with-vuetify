<template>
  <v-chip
    :color="getColor(gender)"
    dark
  >
    {{ getLabel(gender) }}
  </v-chip>
</template>

<script>
export default {
  name: 'TagGenero',

  props: {
    gender: {
      type: String,
      default: ''
    }
  },

  methods: {
    getColor (gender) {
      if (gender === 'male') {
        return 'blue'
      } else {
        return 'pink'
      }
    },

    getLabel (gender) {
      if (gender === 'male') {
        return 'Masculino'
      } else {
        return 'Feminino'
      }
    }

  }

}
</script>
