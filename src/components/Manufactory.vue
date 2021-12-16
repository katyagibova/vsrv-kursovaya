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
      </v-col>
      <v-col cols="3" align-self="center">
        <p class="text">Получено:</p>
        <p class="text">бруса - <b>{{countB}}</b><v-icon color="#1E1918">mdi-arrow-right-thin</v-icon> </p>
        <p class="text">горбылей - <b>{{countG}}</b><v-icon color="#1E1918">mdi-arrow-down-thin</v-icon> </p>
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
        :value="progressG"
        stream
        >
          <strong>{{ Math.ceil(progressG) }}%</strong>
        </v-progress-linear>
        <v-img contain src="@/assets/secondE.png" alt="Krafter E" max-height="70px">
        </v-img>
        <p class="text" style="width: 115px;">Krafter E</p>
      </v-col>
      <v-col cols="3" align-self="center">
        <p class="text">Получено досок:</p>
        <p class="text"><b>{{allBoards}}</b></p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="textTitle">Собранные пакеты: {{boardsBox}}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" align-self="center">
        <p class="text">В очереди: <b>{{readyToDry}}</b> пакетов</p>
      </v-col>
      <v-col cols="3">
        <v-progress-linear
        color="#B64D2F"
        buffer-value="0"
        height="17px"
        :value="progressSushka"
        stream
        >
          <strong>{{ Math.ceil(progressSushka) }}%</strong>
        </v-progress-linear>
        <v-img contain src="@/assets/sushka.png" alt="Sushka" >
        </v-img>
        <p class="text" style="width: 115px;">Сушильная камера</p>
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
                  color="#B64D2F"
                  required
                  v-model="diameter"
                  :rules="[rules.required, rules.isFractionalNumber]"
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
                  color="#B64D2F"
                  v-model="curvature"
                  required
                  :rules="[rules.required, rules.isIntNumber]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#B64D2F"
            text
            @click="addNewHDialog = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="#B64D2F"
            text
            :disabled="!(diameter > 0) && !(curvature > 0)"
            @click="addNewH"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
    v-model="KraftersError"
    max-width="600px"
    persistent
    >
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-spacer></v-spacer>
              <v-col
              cols="6"
              align-self="center"
              >
                <p class="text" style="color: red; margint-top: 30px">ОШИБКА на {{machineName}}</p>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="errorFix"
          >
            Устранить
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
    v-model="theEnd"
    max-width="600px"
    persistent
    >
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-spacer></v-spacer>
              <v-col
              cols="6"
              align-self="center"
              >
                <p class="text" style=" margint-top: 60px">Готово на продажу: 72</p>
                <p class="text" style=" margint-top: 30px">Обработано: 12</p>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#B64D2F"
            text
            @click="theEnd = false"
          >
            Понятно
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
    color="#B64D2F"
    width="400px"
    v-model="snackbarError"
    >
      <p class="text" style="color: #fff">{{ textError }}</p>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'Manufactory',
    data () {
      return{
        rules: {
          required: value =>{
            return !!value || 'Обязательно для заполнения'
          },
          isIntNumber: value => {
            const pattern = /^[0-9]+$/
            return pattern.test(value) || 'Необходимо ввести целое число'
          },
          isFractionalNumber: value => {
            const pattern = /^(0$|[1-9]\d*(\.\d*[1-9]$)?|0\.\d*[1-9])$/
            return pattern.test(value) || 'Необходимо ввести положительное число'
          },
        },
        theEnd: false,
        addNewHDialog: false,
        errorDialog: false,
        snackbarError: false,
        textError: '',
        diameter: null,
        boolDiameter: 0,
        curvature: null,
        boolCurvature: 0,
        allHObjects: [],
        numberOfHObject: -1,
        hIndex: 0,
        allB: [],
        allG: [],
        index: 0,
        indexB: 0,
        indexG: 0,
        progress: 0,
        progressB: 0,
        progressG: 0,
        progressSushka: 0,
        interval: 0,
        intervalB: 0,
        intervalG: 0,
        intervalSushka: 0,
        countH: 0,
        countB: 0,
        countG: 0,
        countS: 0,
        visitsHQuantity: 0,
        visitsBQuantity: 0,
        visitsGQuantity: 0,
        visitsSQuantity: 0,
        heightB: 150,
        lengthB: 0,
        boardsNumberB: 0,
        allBoards: 0,
        KraftersError: false,
        machineName: false,
        KrafterM: false,
        KrafterE: false,
        boardsBox: 0,
        readyToDry: 0,
      }
    },
    watch: {
      progress (val) {
        if (val <= 100) return
        
        this.hIndex++
        this.krafter2Working()
      },

      progressB (val) {
        if (val <= 100) return

        this.numberOfHObject++
        this.allBoards += this.allHObjects[this.numberOfHObject].quantityBoards
        this.krafterMWorking()
      },

      progressSushka (val) {
        if (val <= 100) return
        
        this.sushkaWorking()
      },

      progressG (val) {
        if (val <= 100) return
        
        this.allBoards++
        this.krafterEWorking()
      },

      allBoards(val){
        if(val < 9) return

        this.boardsBox++
        this.allBoards -= 9
      },

      boardsBox(val){
        if(val < 4) return

        this.readyToDry++
        this.boardsBox -= 4
        this.countS++
        this.sushkaWorking()
      }
    },
    methods:{
      activate() {
        this.interval = setInterval(() => {
          this.progress = this.progress + 10
        }, 1000)
      },

      activateB() {
        this.intervalB = setInterval(() => {
          this.progressB = this.progressB + 10
        }, 2000)
      },

      activateG() {
        this.intervalG = setInterval(() => {
          this.progressG = this.progressG + 10
        }, 2000)
      },

      activateSushka() {
        this.intervalSushka = setInterval(() => {
          this.progressSushka = this.progressSushka + 10
        }, 2000)
      },

      openHDialog(){
        this.diameter = 0
        this.curvature = 0
        this.addNewHDialog = true
      },

      krafter2Working(){
        this.visitsHQuantity++
        let num = this.hIndex
        if(num < this.allHObjects.length){
          if(this.allHObjects[num].diameter === false && this.allHObjects[num].curvature === false){
            this.textError = "Хлыст не может быть распилен на лесопильной линии KRAFTER из-за неподходящего диаметра и большого искривления"
            this.snackbarError = true
            this.countH--
            this.index--
            this.hIndex--
            this.allHObjects.splice(num, 1)
            return
          } else if(this.allHObjects[num].diameter === false){
            this.textError = "Хлыст не может быть распилен на лесопильной линии KRAFTER из-за неподходящего диаметра"
            this.snackbarError = true
            this.countH--
            this.index--
            this.hIndex--
            this.allHObjects.splice(num, 1)
            return
          } else if (this.allHObjects[num].curvature === false){
            this.textError = "Хлыст не может быть распилен на лесопильной линии KRAFTER из-за слишком большого искривления"
            this.snackbarError = true
            this.countH--
            this.index--
            this.hIndex--
            this.allHObjects.splice(num, 1)
            return
          }
        } else {
          this.hIndex = this.allHObjects.length
        }
        

        //Добавление бруса и горбыля
        if(this.visitsHQuantity >= 2 ){
          this.addNewB()
          this.addNewG()
        }

        if(this.countH == 0){
          this.progress = 0
          setTimeout(() => { clearInterval(this.interval) }, 0);
          this.index = 0
          return true
        } else {
          //Генерация возникновения ошибки (вероятность возникновения ошибки = 10%)
          let err = Math.random()
          if(err >= 0.9){
            this.machineName = "Krafter 2.0"
            this.KraftersError = true
            setTimeout(() => { clearInterval(this.interval) }, 0);
            setTimeout(() => { clearInterval(this.intervalB) }, 0);
            setTimeout(() => { clearInterval(this.intervalG) }, 0);
          }

          //Загрузка хлыста
          this.progress = 0
          if(this.visitsHQuantity === 1){
            this.activate()
          }
          this.countH--
          return true
        }
      },

      krafterMWorking(){
        this.visitsBQuantity++
        console.log("Надеюсь тут заканчивается распил 1 бруса")
        if(this.visitsBQuantity >= 2 ){
          this.addNewG()
        }
        if(this.countB == 0){
          this.progressB = 0
          setTimeout(() => { clearInterval(this.intervalB) }, 0);
          this.indexB = 0
          this.allB = []
          return true
        } else {
          let err = Math.random()
          if(err >= 0.9){
            this.machineName = "Krafter M"
            this.KraftersError = true
            setTimeout(() => { clearInterval(this.interval) }, 0);
            setTimeout(() => { clearInterval(this.intervalB) }, 0);
            setTimeout(() => { clearInterval(this.intervalG) }, 0);
          }
          this.progressB = 0
          if(this.allB.length === 1){
            this.activateB()
          }
          this.countB--
          return true
        }
      },

      krafterEWorking(){
        this.visitsGQuantity++
        console.log("Надеюсь тут заканчивается распил 1 горбыля")
        if(this.countG == 0){
          this.progressG = 0
          setTimeout(() => { clearInterval(this.intervalG) }, 0);
          this.indexG = 0
          this.allG = []
          return true
        } else {
          let err = Math.random()
          if(err >= 0.9){
            this.machineName = "Krafter E"
            this.KraftersError = true
            setTimeout(() => { clearInterval(this.interval) }, 0);
            setTimeout(() => { clearInterval(this.intervalB) }, 0);
            setTimeout(() => { clearInterval(this.intervalG) }, 0);
          }
          this.progressG = 0
          if(this.visitsGQuantity === 1){
            this.activateG()
          }
          this.countG--
          return true
        }
      },

      sushkaWorking(){
        this.visitsSQuantity++
        if(this.countS == 0){
          this.progressSushka = 0
          setTimeout(() => { clearInterval(this.intervalSushka) }, 0);
          return true
        } else {
          this.progressSushka = 0
          if(this.visitsSQuantity === 1){
            this.activateSushka()
          }
          this.countS--
          return true
        }
      },

      addNewH(){
        if(this.diameter >= 19 && this.diameter <= 46){
          this.boolDiameter = true
        } else {
          this.boolDiameter = false
        }
        if(this.curvature >= 3){
          this.boolCurvature = false
        } else {
          this.boolCurvature = true
        }

        //Расчет количества полученных досок в зависимостиот диаметра хлыста
        this.lengthB = Math.sqrt(Math.pow(Number(this.diameter)*10, 2) - Math.pow(this.heightB, 2))

        this.boardsNumberB = Math.trunc(this.lengthB / 25)

        let newObject = {
          diameter: this.boolDiameter,
          curvature: this.boolCurvature,
          quantityBoards: this.boardsNumberB,
        }
        this.allHObjects.push(newObject)
        this.countH++

        this.addNewHDialog = false
        this.index++
        if(this.index === 1){
          this.interval = 0
          this.visitsHQuantity = 0
          this.krafter2Working()
        }
      },

      addNewB(){
        for(let b = 0; b < 1; b++){
          let newObject = {
            error: false,
          }
          this.allB.push(newObject)
          this.countB++
        }

        this.indexB++
        if(this.indexB === 1){
          this.intervalB = 0
          this.visitsBQuantity = 0
          this.krafterMWorking()
        }
      },

      addNewG(){
        for(let g = 0; g < 2; g++){
          let newObject = {
            error: false,
          }
          this.allG.push(newObject)
          this.countG++
        }

        this.indexG++
        if(this.indexG === 1){
          this.intervalG = 0
          this.visitsGQuantity = 0
          this.krafterEWorking()
        }
      },

      errorEr(){
        setTimeout(() => { clearInterval(this.interval) }, 0);
        setTimeout(() => { clearInterval(this.intervalB) }, 0);
        setTimeout(() => { clearInterval(this.intervalG) }, 0);
      },

      errorFix(){
        this.KraftersError = false

        if(this.index !== 0){
          this.activate()
        }
        if(this.indexB !== 0){
          this.activateB()
        }
        if(this.indexG !== 0){
          this.activateG()
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

.textTitle{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 32px;
  color: #1E1918;
  margin: 0 auto;
}

</style>