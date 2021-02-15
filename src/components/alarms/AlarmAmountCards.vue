<template>
  <v-col> 
    <v-row class="alarmIcon">
      <v-icon :color="iconColor">{{ iconType }}</v-icon>
    </v-row>
    <v-spacer></v-spacer>
    <v-row v-if="isAlarmInfo">
      <div class="font-weight-bold mt-1 title">{{ amount }}</div>
    </v-row>
    <v-row v-else>
      <div class="font-weight-bold mt-1 display-1">{{ amount }}</div>
    </v-row>
    <v-row>
      <div class="mt-1 subtitle-1">{{ time }}</div>
    </v-row>
  </v-col>
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