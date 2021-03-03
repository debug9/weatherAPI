<template>
    <div>
        <div class="title_descript">
            <h3>台北各區天氣預報資料</h3>
            <select name="locationName" id="locationName" @change="add($event)">
                <option v-for="(locationName, index) in locationNames" :key="index" :value="locationName.index">{{locationName.locationName}}</option>
            </select>
        </div>
        <div class="tac content">
            <div v-for="(value, index) in values[0]" :key="index" class="test">
                <h3 class="title">{{descriptions[index]}}</h3>
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
                locationNames: [],
                descriptions: [],
                values: [],
                height: 0
                
            }
        },
        created() { 

            function get(url) {
                return new Promise((resolve, reject)=> {
                    var xhr = new XMLHttpRequest();
                    xhr.open('get', url,false);
                    xhr.onload = function() {
                    if (xhr.status == 200) {
                            const data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } else {
                        reject("資料讀取失敗")
                    }
                    };
                    xhr.send(null);
                });
            }

            get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-063?Authorization=CWB-A47D0DB5-E6C5-4D37-BD32-070DB94B5ED9&format=JSON')
                .then((data) => {

                    const location = data.cwbopendata.dataset.locations.location;

                    location.forEach((element,index) => {
                        this.locationNames.push({"index":index,"locationName":element.locationName} )
                    });

                    this.values.push([]);

                    const weatherElement = data.cwbopendata.dataset.locations.location[0].weatherElement;

                    weatherElement.forEach((element2,index2) => {

                        this.values[0].push([]);

                        const elDescription = element2.description;
                        const eltime = element2.time;
                        
                        this.descriptions.push(elDescription);


                        eltime.forEach((element3,index3) => {

                            const WEValue = element3.elementValue.value;
                            const WETime = element3.startTime;

                            if(index2 >10 && index2<14){
                                var a = data.cwbopendata.dataset.locations.location[0].weatherElement[index2].time[index3].elementValue[0].value;
                                this.values[0][index2].push([WETime],[a]) 
                            }
                            else if(WEValue === null){
                                this.values[0][index2].push([WETime],["未偵測"]) 
                            }
                            else{
                                this.values[0][index2].push([WETime],[WEValue])
                            }                        
                        });
                    });  

                    const description = data.cwbopendata.dataset.locations.location[0].weatherElement;

                    description.forEach((element,index) => {
                        this.descriptions.push({"index":index,"description":element.description} ) 
                    });
                })
                .catch((res) => {
                    console.error(res)
                })
        },
        methods:{
            add(event){

                function get(url) {
                    return new Promise((resolve, reject)=> {
                        var xhr = new XMLHttpRequest();
                        xhr.open('get', url,false);
                        xhr.onload = function() {
                        if (xhr.status == 200) {
                                const data = JSON.parse(xhr.responseText);
                            resolve(data);
                        } else {
                            reject(new Error(xhr))
                        }
                        };
                        xhr.send(null);
                    });
                }

                get('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-D0047-063?Authorization=CWB-A47D0DB5-E6C5-4D37-BD32-070DB94B5ED9&format=JSON')
                    .then((data) => {
                        
                        this.values = [];
                        this.descriptions = []
                        this.values.push([])

                        const weatherElement = data.cwbopendata.dataset.locations.location[event.target.value].weatherElement

                        weatherElement.forEach((element2,index2) => {

                            this.values[0].push([]);
                        
                            const elDescription = element2.description;            
                            const eltime = element2.time;

                            this.descriptions.push(elDescription)

                            eltime.forEach((element3,index3) => {

                                const WEValue = element3.elementValue.value;
                                const WETime = element3.startTime;


                                if(index2 >10 && index2<14){
                                    var a = data.cwbopendata.dataset.locations.location[event.target.value].weatherElement[0].time[index3].elementValue.value;
                                    this.values[0][index2].push([WETime],[a]) 
                                }
                                else if(WEValue === null){
                                    
                                    this.values[0][index2].push([WETime],["未偵測"]) 
                                }
                                else{
                                    this.values[0][index2].push([WETime],[WEValue])
                                }                  
                            });
                        });
                    })
                    .catch((res) => {
                        console.error(res)
                    })
                }
            }
        }
</script>

<style>
.title_descript{
    margin-bottom: 50px;
    position: fixed;
    top: 0;
    left: 0%;
    width:100%;
    padding: 10px 0;
    background: #fff;

}
.content{
    width: 900px;
    margin: 0 auto;
    border: 1px solid;
    text-align: center;
}
.title{
    padding: 20px;
    margin: 0;
    border-bottom: 5px solid
}

.content p{
    display: inline-block;
    border-bottom: 1px solid;
    padding: 10px 0;
    margin: 0 auto;
}

.content p:nth-child(4n) {
    background-color: #99BBFF;
}

.content p:nth-child(even) {
    width: 35%;
}

.content p:nth-child(odd) {
    width: 64.8%;
    border-left: 1px solid;
}

.dib{
    display: inline-block;
}


</style>


