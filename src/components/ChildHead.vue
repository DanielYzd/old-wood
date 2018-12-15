<template>
    <div class="child_head">
          <div class="block"></div>
          <div class="child_title">{{childhead}}</div>
        </div>
</template>
<script>
export default {
    name:"ChildHeader",

    props:{
        childhead:String,
        require:true
  },
  data(){
    return{
    
    }
  },
   created(){
     console.log('child-----')
   }
}
</script>
<style lang="less" scoped>
.child_head {
    height: 43px;
    margin: 8px;
    background-color: #ffffff;
    display: flex;
    line-height: 43px;
    .block {
      width: 17px;
      height: 19px;
      background: rgba(141, 225, 188, 1);
      margin-top: 10px;
      margin-left: 10px;
    }
    .child_title {
      font-size: 16px;
      font-family: PingFang-SC-Medium;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-left: 20px;
    }
  }
</style>
