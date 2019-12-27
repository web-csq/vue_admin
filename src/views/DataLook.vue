<template>
  <div>
      <div class="title-c">
        <Divider > 2022届12.12 第一次模拟考试</Divider>
        <div class="cent">
          数据看板
        </div>
      </div>
      <div class="board-top">
        <div>
          <div class="num">5</div>
          <div class="intr">考试班级数</div>
        </div>
        <div>
          <div class="num">2</div>
          <div class="intr">考试科目数</div>
        </div>
        <div>
          <div class="num">654</div>
          <div class="intr">参加考生人数</div>
        </div>
      </div>
      <div class="total-table">
        <div class="total-t">
          <i class="el-icon-loading"></i>
          考试综合分析
        </div>
        <div class="total-c">
          <div>
            <div class="num">655</div>
            <div class="intr">平均分</div>
          </div>
          <div>
            <div class="num">755</div>
            <div class="intr">最高分</div>
          </div>
          <div>
            <div class="num">355</div>
            <div class="intr">最低分</div>
          </div>
          <div>
            <div class="num">455</div>
            <div class="intr">中位数</div>
          </div>
          <div>
            <div class="num">102.5</div>
            <div class="intr">标准差</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name:"datalook",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.title-c{
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  .cent{
    letter-spacing: 2px;
    color: #409EFF;
  }
}
.title-c >>> .ivu-divider-horizontal.ivu-divider-with-text-center{
  font-size: 22px;
}
.board-top{
  background-color: #F0F2F5;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  > div{
    text-align: center;
    padding: 50px 60px 15px;
    border-radius: 8px;
    color: #fff;
    .num{
      font-size: 30px;
    }
    .intr{
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
  > div:first-child{
    background: -webkit-gradient(linear,0 0,100% 0,from(#d078f4),to(#697efc));
  }
  > div:nth-child(2){
    background: -webkit-gradient(linear,0 0,100% 0,from(#ff8d95),to(#de3895));
  }
  >div:last-child{
    background: -webkit-gradient(linear,0 0,100% 0,from(#afbafe),to(#657efd));
  }
}
.el-icon-loading{
  color: #409EFF;
  font-size: 20px;
}
.total-table{
  padding: 10px;
  font-size: 16px;
}
.total-c{
  display: flex;
  justify-content: space-around;
  text-emphasis: center;
  >div{
    display: flex;
    flex-direction:column;
    align-items: center;
    .num{
      font-size: 30px;
    }
    .intr{
      font-size: 18px;
      letter-spacing: 2px;
    }
  }
}
</style>