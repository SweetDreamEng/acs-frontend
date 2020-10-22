<template>
  <div></div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    roles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      products: [
        'BD Batch Blender',
        'Accumeter Ovation Continuous',
        'GH Gravimetric Extrusion Control',
        'GH-F Gravimetric Additive',
        'VTC Plus Conveying',
        'NGX',
        'NGX Nomad',
        'Truetemp',
        'GP & HE Central',
        'T50 Central'
      ],
      telemetries: [
        'Power Loss',
        'Out of Material',
        'Hopper Unstable',
        'Hopper Overfeed',
        'Hopper Over Max',
        'Max Empty Weight',
        'Mixer Failure',
        'Unable to make rate',
        'Pump Starter Fault'
      ],
      operators: [
        'Equals',
        'Does not equal',
        'Is greater than',
        'Is greater than or equal to',
        'Is less than',
        'Is less than or equal to',
        'Is in',
        'Is not in'
      ],
      switch1: true,

      defaultFilter: {
        telemetry: '',
        operator: '',
        value: ''
      },
      filters: [
        {
          telemetry: '',
          operator: '',
          value: ''
        }
      ],
      emailForm: {
        name: '',
        to: '',
        note: '',
        media: []
      },
      panel: [0]
    }
  },
  methods: {
    addFilter() {
      this.filters.push(this.defaultFilter)
    }
  }
}
</script>
