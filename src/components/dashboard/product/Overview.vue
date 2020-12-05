<template>
  <v-card height="100%">
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
</template>

<script>

/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
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
      loadingInterval: null,
      isLoading1: true
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
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>
