<template>
  <div>
    <div>第一次月考</div>
    <div class="tab-container">
       <Table border :columns="detailColumns" :data="detailData">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="leadIn(index)">导入</Button>
            <Button type="error" size="small" style="margin-right: 5px" @click="removeExam(index)">清空</Button>
            <Button type="error" @click="delSubject(index)" size="small">删除</Button>
          </template>
      </Table>
    </div>
    <router-link to="/analyzedetail">
      <Button type="primary" size="small" style="margin: 15px 0 0 0" @click="lookExcel">查看分析报表</Button>
    </router-link>


    
  </div>
</template>

<script>
export default {
  name:"examdetail",
  data(){
    return{
      dialogVisible:false,
      detailColumns:[
           {
            "title": "科目",
            "key": "subject",
            "width":120
          },
          {
            "title": "已导入人数",
            "key": "count",
            "width":120
          },
          {
            "title": "总人数",
            "key": "totalCount",
            'width':120
          },
          {
            "title": "操作",
            "key": "action",
            "slot": 'action',
            "align":"center",
          }
        ],
        detailData:[
          {
                subject: '语文',
                count: 5,
                totalCount: 123,
            },
            {
                subject: '数学',
                count: 5,
                totalCount: 123
            },
            {
                subject: '物理',
                count: 5,
                totalCount: 123
            },
            {
                subject: '化学',
                count: 5,
                totalCount: 123
            }
        ],
    }
  },
  methods:{
    leadIn(index){
      this.dialogVisible=true;
      console.log(index)
    },
    close(){
      let _this=this
      this.dialogVisible=false;
      this.$nextTick(()=>{
        for(let item in _this.$refs){
          _this.$refs[item].clearFiles();
        }   
      })
    },
    lookExcel(){

    },
    delSubject(index){
      console.log(index)
      this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除数据？</p>',
          onOk: () => {
              this.$Message.info('Clicked ok');
          },
          onCancel: () => {
              this.$Message.info('Clicked cancel');
          }
      });
    },
    
    removeExam(index){
      this.$Modal.confirm({
          title: '提示',
          content: '<p>确认清空数据？</p>',
          onOk: () => {
              this.$Message.info('Clicked ok');
          },
          onCancel: () => {
              this.$Message.info('Clicked cancel');
          }
      });
      console.log(index)
      
    },
    cancel(){

    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
.inlin{
  display: inline-block;
}
</style>