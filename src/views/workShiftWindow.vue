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
      <v-col cols="2" style="margin-left: 20px">
        <p class="timer">{{displayMinutes}} : {{displaySeconds}}</p>
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

        ye: 0,
        endYear: 0,
        endMonth: 0,
        endDay: 0,
        endHour: 0,
        endMinute: 0,
        endSecond: 0,
        displaySeconds: 0,
        displayMinutes: 0,
      }
    },
    methods:{
      startWorkShift(){
        this.showManufactory = true
        this.showRemaining()
      },

      showRemaining(){
        this.endYear = new Date().getUTCFullYear()
        this.endMonth = new Date().getUTCMonth()
        this.endDay = new Date().getUTCDate()
        this.endHour = new Date().getUTCHours() + 3
        this.endMinute = new Date().getUTCMinutes() + 8
        this.endSecond = new Date().getUTCSeconds()
        const timer = setInterval(() => {
        const now = new Date()
        const end = new Date(this.endYear, this.endMonth, this.endDay, this.endHour, this.endMinute, this.endSecond, 0)
        const distance = end.getTime() - now.getTime()

        if(distance < 0){
          clearInterval(timer)
          return
        }

        const minutes = Math.floor((distance % this._hours)/ this._minutes)
        const seconds = Math.floor((distance % this._minutes)/ this._seconds)

        this.displayMinutes = minutes < 10 ? "0" + minutes : minutes
        this.displaySeconds = seconds < 10 ? "0" + seconds : seconds

        if(this.displayMinutes == 0 && this.displaySeconds == 0){
          console.log("The end")
        }

        }, 1000)
      },
    },
    mounted(){
    },
    computed: {
      _seconds: () => 1000,
      _minutes(){
        return this._seconds * 60
      },
      _hours(){
        return this._minutes * 60
      },
      _days(){
        return this._hours * 24
      }
    },
    created(){
    }
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
