<template>
  <div class="start">
    <img src="/static/star.png" alt v-for="item in array" :key="item.id">
  </div>
</template>
<script>
export default {
  data() {
    return {
      array: []
    };
  },
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  created() {
    this.getimg();
  },
  methods: {
    getimg() {
      console.log(this.score);
      switch (this.score) {
        case 1:
          return (this.array = [1]);
          break;
        case 2:
          return (this.array = [1, 1]);
          break;
        case 3:
          return (this.array = [1, 1, 1]);
          break;
        case 4:
          return (this.array = [1, 1, 1, 1]);
          break;
        case 5:
          return (this.array = [1, 1, 1, 1, 1]);
          break;
      }
      console.log(this.array);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
