<template>
  <div id="app">
    <router-view/>
    <navfooter></navfooter>
  </div>

</template>

<script>
import navfooter from './components/footer'
export default {
  name: 'App',
  components:{navfooter}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-bottom: 60px;
  /* 为了防止导航栏遮挡 */
  color: #2c3e50;
}
.btbtn{
 display:flex;justify-content:space-around;margin-top:60px;
}
.btback{
  display:flex;justify-content:center;margin-top:40px;
}

.gradetitle{
    font-size: 18px;
    /* color:white; */
    text-align: center;
    /* background-color:#969799; */
   
}
.gradetitle>.van-field__label{
    /* color:white; */
    }

    /* .gradetitle{
    font-size: 16px;
    color:white;
    text-align: center;
    background-color:#969799;
   
} */

/* .gradetitle>.van-field__label{
    color:white;
    } */

.projectname{
    background-color:#dadbddfa;
    
}
.pagetitle>.van-nav-bar__title{
  font-size:18px;
}
.cella{
  box-shadow:0 8px 12px #ebedf0;border-radius:12px;margin-top:12px;
}
.searchtitle{
  box-shadow:0 8px 12px #ebedf0;margin-top:12px;
}
</style>
