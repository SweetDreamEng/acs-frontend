<template>
  <v-card class="d-flex flex-column flex-grow-1">
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else class="d-flex flex-column flex-grow-1">
      <v-card-title class="primary--text">
        {{ label }}
      </v-card-title>

      <div class="d-flex flex-column flex-grow-1">
        <div class="px-2 pb-2">
          <div class="">
            <v-progress-linear
              color="primary"
              rounded
              value="100"
              height="16"
            >
              <template v-slot="{ }">
                <strong style="color:white;">7h10m</strong>
              </template>
            </v-progress-linear>
            <e-charts
              ref="line"
              autoresize
              style="width: 100%; height: 300px"
              :options="line"
              auto-resize
            />
          </div>
        </div>
      </div>
    </div>
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
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = [['2020-10-05',0],['2020-10-06',0],['2020-10-07',0],['2020-10-08',14],['2020-10-09',17],['2020-10-10',19]
    ]

    const dateList = data.map((item) => {
      return item[0]
    })
    const valueList = data.map((item) => {
      return item[1]
    })

    return {
      line: {
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 12,
          max: 19
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: dateList
        },
        yAxis: {
          splitLine: { show: false }
        },
        series: {
          type: 'line',
          showSymbol: false,
          data: valueList
        }
      }
    }
  },
  computed: {
  }
}
</script>
