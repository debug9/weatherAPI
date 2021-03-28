<template>
    <div>
        <div class="title_descript">
            <h3>{{title}}</h3>
            <img src="https://image.freepik.com/free-vector/woman-with-umbrella-girl-raincoat-dog-walking-rain-city-park-vector-illustration-family-activity-bad-weather-downpour-concept_74855-13290.jpg" alt="" class="mainimg"><br>
            <select name="locationName" id="locationName" @change="changeMonths($event)">
                <option v-for="(month, index) in months" :key="index" :value="index">{{month.month}}</option>
            </select>
        </div>
        <div class="tac content rainPH"  v-for="(city, index) in citys" :key="index">
            <h3 class="title">{{city.city}}</h3>                
            <div v-for="(parameter, index2) in parameters" :key="index2+'parameters'">
                <p v-for="(val, index4) in parameter[index]" :key="index4+'parameter'">
                    {{val[0]}}
                </p>
            </div>
            <div v-for="(PHValue, index3) in PHValues" :key="index3+'phvalues'">
                <p v-for="(val, index4) in PHValue[index]" :key="index4+'phvalue'">
                    {{val[0]}}
                </p>                
            </div>
        </div> 
    </div>  
</template>

<script>

    export default{
        data(){
            return{
                title: "2021年雨水酸鹼度值資料",
                APIurl: "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0004-001?Authorization=CWB-A47D0DB5-E6C5-4D37-BD32-070DB94B5ED9&format=JSON",
                months: [],
                location: null,
                citys: [],
                parameters: [],
                PHValues: [],
                rainDay: null
            }
        },
        created() {
            this.$axios
                .get(this.APIurl)
                .then( data => {

                    console.log(data)

                    const months = data.data.cwbopendata.dataset.weatherElement;

                    months.forEach((element,index) => {
                        this.months.push({"month":(index+1)+"月份"} ) 
                    });

                    this.location = data.data.cwbopendata.dataset.weatherElement[0].location

                    this.rainPHValue();
                    this.dayForRain()
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods:{
            rainPHValue(){
                this.location.forEach((element2,index2) => {

                    const parameterLen = element2.parameter.length;
                    if(index2 <1){
                        for(let i = 0; i< parameterLen ; i++){
                            this.parameters.push([])
                        }
                    }

                    const parameter = element2.parameter;
                    parameter.forEach((element3,index3) => {
                            
                        const parameterName = element3.parameterName
                        const parameterValue = element3.parameterValue

                        if(index3 == 0){
                            this.citys.push({ "city" : this.location[index2].locationName})
                        }
        
                        if(parameterValue == null){
                            this.parameters[index3].push([[parameterName],[0]])
                        }
                        else{
                            this.parameters[index3].push([[parameterName],[parameterValue]])
                        }
                    })
                })
            },
            dayForRain(){
                    this.location.forEach((element,index) => {
                        //index 17
                        const rainDay = this.location[index].time
                        const rainDayLen = this.location[index].time.length
                        if(index <1){
                            for(let i = 0; i< rainDayLen ; i++){
                                this.PHValues.push([]);
                            }
                        }

                        rainDay.forEach((element,index2) => {
                            //index2 30
                            const dataTime = rainDay[index2].dataTime
                            const PHValue = rainDay[index2].value;

                            if(PHValue === "-" || PHValue === null){
                                this.PHValues[index2].push([[dataTime],["未下雨"]])
                            }
                            else{
                                this.PHValues[index2].push([[dataTime],[PHValue]])
                            }
                        });


                    });
            },
            changeMonths(event){
                this.$axios
                    .get(this.APIurl)
                    .then((data) => {
                          
                        this.parameters = [];
                        this.citys = [];
                        this.PHValues = [];

                        this.location = data.data.cwbopendata.dataset.weatherElement[event.target.value].location

                        this.rainPHValue()

                        this.dayForRain()
                        
                    })
                    .catch((res) => {
                        console.error(res)
                    })
                }
            }
        }
</script>



