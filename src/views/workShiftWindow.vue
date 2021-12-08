<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-btn
        elevation="0"
        color="#B64D2F"
        dark
        @click="startWorkShift">
          Начать рабочую смену
        </v-btn>
      </v-col>
      <v-col style="padding-left: 0">
        <p class="timer">00:00</p>
      </v-col>
    </v-row>
    <Manufactory v-if="showManufactory" />
  </v-container>
  
</template>

<script>
  import Manufactory from '../components/Manufactory.vue'

  export default {
    name: 'Home',
    components: {
      Manufactory,
    },
    data(){
      return{
        showManufactory: false,
      }
    },
    methods:{
      startWorkShift(){
        this.showManufactory = true
      }
    },
  }
</script>

<style lang="scss" scoped>
.timer{
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 20px;
  margin-top: 9px;
  color: #1E1918;
}
</style>
