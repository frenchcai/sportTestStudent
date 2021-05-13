<template>
  <div>
    <van-nav-bar
      title="报名信息确认"
      left-text="返回"
      left-arrow
      @click-left="back()"
      class="pagetitle"
    />
    <vant-cell-group>
      <van-field label="基本信息" readonly class="gradetitle">
        <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
      </van-field>
      <van-field label="姓名" readonly :value="user.name">
        <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
      </van-field>
      <van-field label="身份证号" readonly :value="user.idNumber">
        <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
      </van-field>
      <van-field label="联系方式" readonly :value="user.phone">
        <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
      </van-field>

      <van-field label="报名比赛名称" readonly :value="postdata.project_name">
        <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
      </van-field>
    </vant-cell-group>
    <!-- 
   
    <vant-cell-group>
        <van-field label="比赛信息"  readonly class="gradetitle" >  -->
    <!-- <template #button><van-button type="default" size='small'>
                 前往注册</van-button>
            </template> -->
    <!-- </van-field >

    </vant-cell-group> -->

    <vant-cell-group>
      <van-field label="报名项目" readonly class="gradetitle"> </van-field>
    </vant-cell-group>
    <van-cell-group v-for="(item, index) in postdata['itemList'] " :key="index" >
      <van-field
        class="projectname"
        label="项目名称"
        :value="item.item_name"
        readonly
      />
      <!-- <span slot='label'>
                 <span> 项目名称</span>
            </span>
            <span slot="input">
                <span>{{item.project}}</span>
            </span> -->

      <!-- <van-field label="比赛地点" :value="item._site" readonly /> -->
      <van-field label="比赛时间" :value="item.item_time" readonly />
      <van-field label="项目费用" :value="item.item_cost" readonly />
    </van-cell-group>
    <vant-cell-group>
      <van-field label="总费用" readonly class="gradetitle"> </van-field>
    </vant-cell-group>
    <vant-cell-group>
      <van-field label="费用" readonly :value="postdata.paid" />
    </vant-cell-group>

    <van-row gutter="24" class="btbtn">
      <van-col span="10" offset="1">
        <van-button type="info" style="width: 100%" @click="comfirmToPay()"
          >确定缴费</van-button
        >
      </van-col>
      <van-col span="10" offset="">
        <van-button
          type="default"
          style="width: 100%"
          icon="close"
          @click="back"
          >重选</van-button
        >
      </van-col>
    </van-row>
    <!-- 
    <div class="btbtn">
        <van-button  type="info"  >确定缴费</van-button>
        <van-button  type="default" icon='arrow-left' @click="back">重选</van-button>
    </div> -->
  </div>
</template>

<script>
import api2 from "../../../api/appdatareq/index";
export default {
  name: "signpay",
  data() {
    return {
      postdata:{},
      mygamegradelist: [],
      total: 0,
      project: "",
      user: {
        // userName: "踩踩踩",
        // identify: "440923199802120425",
        // phone: "1234567890",
      },
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  async comfirmToPay(){
    if(window.localStorage.getItem("openid")&&window.localStorage.getItem("token")&&this.user.idNumber){
     
      let token=window.localStorage.getItem("token")
      let openid=window.localStorage.getItem("openid")

      
      let data={
        token,
        openid,
        project:JSON.stringify(this.postdata)
      }

      let result=await api2.sign(data)

      console.log("报名结果",result.data);

      if(result.data.code==200){
        this.$toast.success("报名成功")
        setTimeout(()=>{
          this.$router.replace("/sign")
        },500)

        // this.$route.
      }else if(result.data.code==203){
        let hassame=result.data.hassameitem
        this.$toast.fail("你已经报名了"+hassame.join(",")+"项目，请选择其他项目")

      }
      
    }else{

    }


  }
    
  },
  created(){
        const token = window.localStorage.getItem("token");
      if (token) {
      //如果拿到token说明已经授权成功，将其储存在本地
      // window.localStorage.setItem("token", token);
      const l = api2.getUserInfo({token}).then((res) => {
        console.log(res.data);
        if (res.data.code == "200") {
        
          //将数据赋值给用户数据  
        
          this.user = Object.assign({},res.data.data)
         
        }else if(res.code=="201"){
          console.log("用户尚未注册");
        }
      }).catch(error=>{
        
      })
      }
  },

  mounted() {

    
    console.log(this.$route);
    console.log(this.$route.params.project);
    if (this.$route.params) {
      // this.mygamegradelist = this.$route.params.project.item;
      // this.total = this.$route.params.total;
      this.postdata= this.$route.params.project;
      // this.total = this.$route.params.total;
      this.postdata['paid']=this.$route.params.total;
      // this.project = this.$route.params.project.project_name;
    } else {
      // console.log(this.$route.params.projectlist);
    }
  },
};
</script>

<style>
</style>