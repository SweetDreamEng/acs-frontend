<template>
  <div>
    <div class="mb-1">
      <v-icon :color="iconColor" >{{ iconType }}</v-icon>
    </div>
    <div class="text-h4 font-weight-bold" :class="{ 'text-h6': isAlarmInfo }">
      {{ amount }}
    </div>
    <div>
      {{ time }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: '#000000'
    },
    time: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      default: 0
    },
    iconType: {
      type: String,
      default: ''
    },
    isAlarmInfo: {
      type: Boolean,
      default: false
    }
  }
}
</script>