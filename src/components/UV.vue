<template>
    <div>
        <div class="title_descript">
            <h3>{{title}}</h3>
            <img src="https://image.freepik.com/free-vector/online-doctor-recommending-sunscreen-phone-screen-bottle-sunblock-tube-lotion-flat-illustration_74855-10970.jpg" alt="" class="mainimg"><br>
        </div>
        <div class="tac content uv">
            <h3 class="title">{{today}}</h3>
            
            <div v-for="(value, index) in UVValue" :key="index">
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
                title: "紫外線指數",
                APIurl: "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/O-A0005-001?Authorization=CWB-A47D0DB5-E6C5-4D37-BD32-070DB94B5ED9&format=JSON",
                locations: ["嘉義","台中","澎湖","田中","金門","日月潭","台東","宜蘭","蘭嶼","新屋","基隆","成功","台北","恆春","鞍部","新竹","台南","玉山","高雄","馬祖","花蓮"],
                UVValue: [],
                today: null
            }
        },
        created () {
            this.$axios
                .get(this.APIurl)
                .then( data => {
                    
                    const locationCode = data.data.cwbopendata.dataset.weatherElement.location;
                    this.today = data.data.cwbopendata.dataset.weatherElement.time.dataTime;

                    locationCode.forEach((element,i) => {
                        const a = Math.floor(element.value);
                        this.UVValue.push([[this.locations[i]],[a]])
                    });
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            }            
        }
</script>



