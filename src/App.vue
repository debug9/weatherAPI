<template>
  <div id="app">
    <div class="menu">
      <a href="#/">台北市天氣預報</a><a href="#/rainwaterPH">2021年全台雨水酸鹼度值</a><a href="#/UV">2021年全台紫外線指數</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 50px auto;
}
.menu{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 0px 5px 0px #cccccc;
  padding: 20px;
  background-color: #fff;
  font-weight: bold;
  width: 100%;
}
.menu a{
  margin-right: 50px;
  text-decoration: none;
  color: gray;
}
.menu a:last-child{
  margin-right: 0;
}

.title_descript{
    margin-bottom: 50px;
    background: #fff;
    width:100%;
    padding: 10px 0;
    position: fixed;
    top: 6%
}
.content{
    margin: 0 auto;
    margin-top: 470px;
    width: 900px;
    border: 1px solid;
    text-align: center;
}

.content.rainPH:nth-child(n+3){
  margin-top: 0;
}

.title{
    padding: 20px;
    margin: 0;
    border-bottom: 5px solid
}

.mainimg{
    width: 20%;
    height: 20%;
}

.content p,
.rain_water_content p{
    display: inline-block;
    border-bottom: 1px solid;
    padding: 10px 0;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: -7px;
}


.content p:nth-child(4n),
.rainPH p:nth-child(2n-1),
.content.uv p:nth-child(odd){
    background-color: #99BBFF;
}

.content p:nth-child(even),
.content.uv p:nth-child(odd){
    width: 35%;
    border-right: 1px solid #000;
}

.content.rainPH p:nth-child(2n-1){
  width: 35%;
}

.rainPH p:nth-child(2n){
    border-right: 0;
    width: 64.6%;
}

.content p:nth-child(odd),
.content.uv p:nth-child(even){
    width: 64.6%;
}

.content.uv p:nth-child(even){
  border-right: 0
}

.content.uv p:nth-child(17){
  border-bottom: 0;
}



@media screen and (max-width:480px){
  .menu,.title_descript,.content{
    width: 100%;
  }

  .menu a{
    display: block;
    text-align: center;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .title_descript{
    top:15%
  }

  .title_descript img{
    width: 80%;
    height: 300px;
  }

  .title_descript select{
    margin: 0 auto;
    width: 90%;
    height: 40px;
  }

  .content{
    margin-top: 550px;
  }

}

</style>
