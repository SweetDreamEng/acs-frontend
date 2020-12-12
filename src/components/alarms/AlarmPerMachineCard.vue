<template>
  <v-row>
    <v-col>
      <v-card
        outlined
        style="background-color: lightgrey;"
        tile
      >
        Alarms/Machine
      </v-card>
      <v-card
        outlined
        style="border: 2px solid lightgrey;"
        tile
      >
        <v-icon>mdi-near-me</v-icon>{{ amount }}
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      amount: Math.floor(Math.random() * 50) + 50
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
