<template>
  <div class="sliderInfo">
    <Headers title="正文"> </Headers>
    <div v-html="con"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const con =
      '<p><img src="http://xcpicture.oss-cn-shanghai.aliyuncs.com/app/news/content/2023/06/26/154738.png" style="max-width:100%;" contenteditable="false" width="100%"/><br/><iframe src="https://xcpicture.oss-cn-shanghai.aliyuncs.com/app/news/content/2023/06/26/f28e8b21bef1e9d6b418296bb0190a41.mp4" style="width:100%;height:180px"></iframe></p>';
    return {
      con,
    };
  },
});
</script>
<style scoped lang="scss">
.sliderInfo {
  background: #f6f6f6;
  padding: 0 20px;
  padding-top: 44px;
}
</style>
