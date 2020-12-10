<template>
  <v-col> 
    <v-row class="alarmIcon">
      <v-icon :color="iconColor">{{ iconType }}</v-icon>
    </v-row>
    <v-spacer></v-spacer>
    <v-row v-if="isAlarmInfo" class="alarmAmount">
      {{ amount }}
    </v-row>
    <v-row v-else class="totalAmount">
      {{ amount }}
    </v-row>
    <v-row class="alarmTitle">
      {{ title }}
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: () => ('#000000')
    },
    title: {
      type: String,
      default: () => ('')
    },
    amount: {
      type: Number,
      default: () => (0)
    },
    iconType: {
      type: String,
      default: () => ('')
    },
    isAlarmInfo: {
      type: Boolean,
      default: () => (false)
    }
  }
}
</script>

<style>
.alarmIcon {
  font-size: 5px;
}
.alarmAmount {
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
}
.totalAmount {
  margin-top: 15px;
  font-size: 30px;
  font-weight: bold;
}
.alarmTitle {
  margin-top: 10px;
  font-size: 15px;
}
</style>
