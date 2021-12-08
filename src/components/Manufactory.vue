<template>
  <div>
    <v-row>
      <v-col>
        <v-btn
        color="#B64D2F"
        outlined
        @click="openHDialog">
          Загрузить новый хлыст
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col align-self="center" cols="3">
        <p class="text">В очереди: <b>{{countH}}</b> хлыстов</p>
      </v-col>
      <v-col cols="3">
        <v-progress-linear
        color="#B64D2F"
        buffer-value="0"
        height="17px"
        :value="progress"
        stream
        >
          <strong>{{ Math.ceil(progress) }}%</strong>
        </v-progress-linear>
        <v-img contain src="@/assets/first.png" alt="Krafter 2.0" >
        </v-img>
        <p class="text" style="width: 115px;">Krafter 2.0</p>
        <!-- <v-sheet
        color="white"
        elevation="5"
        height="130"
        class="text_step1"
        style=""
        >
          Krafter 2.0
        </v-sheet> -->
      </v-col>
      <v-col cols="3" align-self="center">
        <p class="text">Получено:</p>
        <p class="text">бруса - <b>{{countB}}</b><v-icon color="#1E1918">mdi-arrow-right-thin</v-icon> </p>
        <p class="text">горбылей - <b>{{countH}}</b><v-icon color="#1E1918">mdi-arrow-down-thin</v-icon> </p>
      </v-col>
      <v-col cols="3">
        <v-progress-linear
        color="#B64D2F"
        buffer-value="0"
        height="17px"
        :value="progressB"
        stream
        >
          <strong>{{ Math.ceil(progressB) }}%</strong>
        </v-progress-linear>
        <v-img contain src="@/assets/secondM.png" alt="Krafter M" max-height="60px">
        </v-img>
        <p class="text" style="width: 115px;">Krafter M</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col 
      cols="12"
      sm="3"
      offset-md="6">
        <v-progress-linear
        color="#B64D2F"
        buffer-value="0"
        height="17px"
        :value="progress"
        stream
        >
          <strong>{{ Math.ceil(progress) }}%</strong>
        </v-progress-linear>
        <v-img contain src="@/assets/secondE.png" alt="Krafter E" max-height="70px">
        </v-img>
        <p class="text" style="width: 115px;">Krafter E</p>
        

      </v-col>
    </v-row>
    <v-dialog
      v-model="addNewHDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Добавить новый хлыст</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Диаметр"
                  required
                  v-model="diameter"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  label="Степень искревления"
                  hint="0, 1, 2, 3"
                  v-model="curvature"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="addNewHDialog = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addNewH"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Manufactory',
    data () {
      return{
        addNewHDialog: false,
        errorDialog: false,
        diameter: 0,
        boolDiameter: 0,
        curvature: 0,
        boolCurvature: 0,
        allH: [],
        allB: [],
        index: 0,
        indexB: 0,
        hQueue: 0,
        progress: 0,
        progressB: 0,
        interval: 0,
        intervalB: 0,
        countH: 0,
        countB: 0,
        i: 0,
        iB: 0,
      }
    },
    watch: {
      progress (val) {
        if (val <= 100) return

        this.firstWorking()
      },

      progressB (val) {
        if (val <= 100) return

        this.secondMWorking()
      },
    },
    methods:{
      activate() {
        this.interval = setInterval(() => {
          this.progress = this.progress + 10
        }, 2000)
      },

      activateB() {
        this.intervalB = setInterval(() => {
          this.progressB = this.progressB + 10
        }, 2000)
      },

      openHDialog(){
        this.diameter = 0
        this.curvature = 0
        this.addNewHDialog = true
      },

      firstWorking(){
        this.i++
        //this.addNewB()
        console.log("Надеюсь тут заканчивается распил 1 хлыста")
        console.log(this.i)
        if(this.countH == 0){
          this.progress = 0
          setTimeout(() => { clearInterval(this.interval) }, 0);
          this.index = 0
          this.allH = []
          return true
        } else {
          this.progress = 0
          if(this.i === 1){
            this.activate()
          }
          this.countH--
          return true
        }
      },

      secondMWorking(){
        this.iB++
        console.log("Надеюсь тут заканчивается распил 1 бруса")
        if(this.countB == 0){
          this.progressB = 0
          setTimeout(() => { clearInterval(this.intervalB) }, 0);
          this.indexB = 0
          this.allB = []
          return true
        } else {
          this.progressB = 0
          if(this.iB === 1){
            this.activateB()
          }
          this.countB--
          return true
        }
      },

      addNewH(){
        if(this.diameter >= 12 && this.diameter <= 46){
          this.boolDiameter = true
        } else {
          this.boolDiameter = false
        }
        if(this.curvature == 3){
          this.boolCurvature = false
        } else {
          this.boolCurvature = true
        }
        // if(this.boolDiameter === false || this.boolCurvature === false){
        //   this.errorDialog = true
        // }
        let newObject = {
          diameter: this.boolDiameter,
          curvature: this.boolCurvature,
        }
        this.allH.push(newObject)

        if(this.allH.length == 1){
          this.countH = this.allH.length
        } else {
          this.countH = this.allH.length - 1
        }

        console.log(this.allH)
        this.addNewHDialog = false
        this.index++
        if(this.index === 1){
          this.interval = 0
          this.i = 0
          this.firstWorking()
        }
        console.log(this.countH)
      },

      addNewB(){
        // for(let b = 0; b < 2; b++){
        let newObject = {
          error: false,
        }
        this.allB.push(newObject)
        // }
        

        if(this.allB.length == 1){
          this.countB = this.allB.length
        } else {
          this.countB = this.allB.length - 1
        }

        //console.log(this.allB)
        this.indexB++
        if(this.index === 1){
          this.intervalB = 0
          this.iB = 0
          this.secondMWorking()
        }
      }
    },
    created(){
    }
  }
</script>

<style lang="scss" scoped>
.text{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 32px;
  color: #1E1918;
  text-align: center;
  margin: 0 auto;
}

.text_step1{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 32px;
  color: #1E1918; 
  text-align: center;
  align-items: center;
  padding-top: auto;
  padding-bottom: auto;
}
</style>