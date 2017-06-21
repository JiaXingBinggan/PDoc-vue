<template>
  <div class="account-info">
    <mu-card>
      <mu-content-block>
        <mu-card-header title="halomoto" subTitle="729869585@qq.com">
          <mu-avatar slot="avatar" icon="person"/>
        </mu-card-header>
        <mu-card-text>
          <mu-row gutter>
            <mu-col width="100" tablet="20" desktop="20"><b>性别</b><span> 男</span></mu-col>
            <mu-col width="100" tablet="40" desktop="40"><b>出生日期</b><span> 2017-06-17</span></mu-col>
            <mu-col width="100" tablet="40" desktop="40"><b>电话号码</b><span> 13565475895</span></mu-col>
          </mu-row>
          </mu-card-text>
        <mu-card-text>
            <mu-row gutter>
            <mu-col width="100" tablet="100" desktop="100"><b>个人简介</b> <span>散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
          似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
          找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！</span></mu-col>
          </mu-row>
        </mu-card-text>
      </mu-content-block>
    </mu-card>
  </div>
</template>

<script>
export default {
  name: 'account-info',
  data () {
    return {
      msg: '这是用户信息页面'
    }
  }
}
</script>

<style lang="stylus" scoped>
.account-info
  width 100%
  height 100%
  text-align left
.test
  margin-top 20px
</style>
