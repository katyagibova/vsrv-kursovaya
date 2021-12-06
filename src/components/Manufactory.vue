<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-progress-linear
        color="teal"
        buffer-value="0"
        height="15px"
        :value="progress"
        stream
      >
        <strong>{{ Math.ceil(progress) }}%</strong>
      </v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
        @click="addNewObject">
          Добавить объект в очередь
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Manufactory',
    data () {
      return{
        progress: 0,
        interval: 0,
        count: 0,
        i: 0,
      }
    },
    watch: {
      progress (val) {
        if (val <= 100) return
        this.stopWorking()
      },
    },
    methods:{
      activate() {
        this.interval = setInterval(() => {
          console.log("я работаю")
          this.progress = this.progress + 10
        }, 2000)
        
      },

      stopWorking(){
        this.i++
        if(this.count == 0){
          this.progress = 0
          setTimeout(() => { clearInterval(this.interval) }, 0);
          return true
        } else {
          this.progress = 0
          if(this.i === 1){
            this.activate()
          }
          this.count--
          return true
        }
      },

      addNewObject(){
        this.count += 2
        console.log(this.count)
        if(this.count === 2){
          //this.interval = 0
          this.i = 0
          this.stopWorking()
        }
        console.log(this.count)
      }
    },
    created(){
    }
  }
</script>
