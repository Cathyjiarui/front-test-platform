<template>
  <div class="notFound">
  </div>
</template>

<script>
export default {
  data(){
    return{
      imgPath: require('@/assets/images/404.jpg')
    }
  }
}
</script>

<style lang="scss" scoped>
.notFound{
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/images/404.jpg");
  background-position: center;
  background-size: cover;
}
</style>