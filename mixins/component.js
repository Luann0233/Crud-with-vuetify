/**
 * Mixin contendo metodos para components
 * permite usar o v-model
 */
export default {
  props: {
    value: {
      required: true
    }
  },

  computed: {
    _id () {
      return this.id || this.$options.name
    }
  },

  methods: {
    input (event) {
      this.$emit('input', event)
    },

    change (newVal, oldVal) {
      this.$emit('change', newVal, this.value)
    }
  }
}
