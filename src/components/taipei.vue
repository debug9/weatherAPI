<template>
    <div>
        <div class="title_descript">
            <h3>{{title}}</h3>
            <img src="https://image.freepik.com/free-vector/meteorology-abstract-concept-vector-illustration-met-station-meteorology-program-university-degree-weather-prediction-method-measuring-instruments-atmosphere-study-abstract-metaphor_335657-1980.jpg" alt="" class="mainimg"><br>
            <select name="locationName" id="locationName" @change="changeLocation($event)">
                <option v-for="(locationName, index) in locationNames" :key="index" :value="locationName.index">{{locationName.locationName}}</option>
            </select>
        </div>
        <div class="tac content">
            <div v-for="(value, index) in values[0]" :key="index">
                <h3 class="title">{{descriptions[index].description}}</h3>
                <p class="tac" v-for="(val, index) in value" :key="index" >
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
                title: "台北各區天氣預報資料",
                locationNames: [],
                descriptions: [],
                values: [],
                weatherElement: null,
                data: null,
                APIurl: "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/E-A0015-001?Authorization=CWB-A47D0DB5-E6C5-4D37-BD32-070DB94B5ED9&format=JSON"
            }
        },
        created () {
            this.$axios
                .get(this.APIurl)
                .then( data => {
                    this.data = data;
                    
                    const location = data.data.cwbopendata.dataset.locations.location

                    location.forEach((element,index) => {
                         this.locationNames.push({"index":index,"locationName":element.locationName})
                    });

                    this.values.push([]);

                    this.weatherElement  = data.data.cwbopendata.dataset.locations.location[0].weatherElement

                    this.weatherValue();

                    this.weatherElement.forEach((element,index) => {
                        this.descriptions.push({"index":index,"description":element.description} ) 
                    });

                })
                .catch(function (error) {
                    console.log(error);
                });            
        },
        methods:{
            weatherValue(){
                this.weatherElement.forEach((element2,index2) => {
                    this.values[0].push([]);

                    const elementTime = element2.time;
                                
                    elementTime.forEach((element3,index3) => {

                        const weatherValue = element3.elementValue.value;

                        const weatherTime = element3.startTime;

                        if(index2 >10 && index2<14){
                            const elementValue = this.data.data.cwbopendata.dataset.locations.location[0].weatherElement[index2].time[index3].elementValue[0].value;
                            this.values[0][index2].push([weatherTime],[elementValue]) 
                        }
                        else if(weatherValue === null){
                            this.values[0][index2].push([weatherTime],["未偵測"]) 
                        } 
                        else{
                            this.values[0][index2].push([weatherTime],[weatherValue])
                        }
                    });
                });
            },
            changeLocation(event){
                this.$axios
                    .get(this.APIurl)
                    .then((data) => {
                        this.values = [];

                        this.values.push([]);

                        this.weatherElement = data.data.cwbopendata.dataset.locations.location[event.target.value].weatherElement

                        this.weatherValue()
                        
                    })
                    .catch((res) => {
                        console.error(res)
                    })
                }
            }
            
        }
</script>



