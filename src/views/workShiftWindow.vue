<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn
        color="#B64D2F"
        outlined
        @click="startWorkShift">
          Начать рабочую смену
        </v-btn>
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
    }
  }
</script>
