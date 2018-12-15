<template>
  <div class="video">
    <div class="prism-player" id="player-con"></div>
  </div>
</template>
<script>
export default {
  name: "Video",
  props: {
    url: String,
    required: true
  },
  mounted() {
    console.log(this.url);
    var player = new Aliplayer(
      {
        id: "player-con",
        // "source": "http://common.qupai.me/player/qupai.mp4",
        source: "http://ldzwh.oss-cn-hangzhou.aliyuncs.com/" + this.url,
        // source: "https://vs1.baduziyuan.com/20181027/Ncp072NC/index.m3u8",
        width: "100%",
        height: "100%",
        type: "video/pm4",
        controls: "controls",
        autoplay: true,
        isLive: false,
        rePlay: false,
        videoHeight: "90%",
        playsinline: true,
        preload: true,
        controlBarVisibility: "hover",
        videoWidth: "100%",
        showBarTime: 5000,
        useH5Prism: true
      },
      function(player) {
        console.log(player);
        console.log("播放器创建了。");
      }
    );
  },
  updated() {
    console.log("updated");
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>
<style lang="less">
.video {
  background-color: #ffffff;
  height: 100%;
  width: 100%;

  box-sizing: border-box;
}
</style>
