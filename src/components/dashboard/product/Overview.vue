<template>
  <div>
    <v-card
      height="280"
      :loading="loading"
    >
      <v-img
        height="150"
        contain
        src="../../../assets/imgs/blender.png"
      ></v-img>
      <v-card-text>
        <div class="subtitle font-weight-bold">{{ machine.name }}</div>
        <div class="ml-2">
          <div>PLC Software Version: <small>{{ machine.version }}</small></div>
          <div>PLC Software Build: <small>{{ machine.software_build }}</small></div>
          <div>Serial Number: <small>{{ machine.serial_number }}</small></div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    machine: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        grid: {
          show: false
        },
        yaxis: {
          show: false
        },
        xaxis: {
          labels: {
            show: false
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
      }
    }
  },
  methods: {
  }
}
</script>
