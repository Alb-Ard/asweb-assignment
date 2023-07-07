<script setup lang="ts">
  const starRating = ref(3.5);

  function renderStarRating(fullStar: number, halfStar: number): string {
    return (starRating.value >= fullStar) ? 'fa fa-star' : ((starRating.value >= halfStar) ? 'fa fa-star-half-full' : 'fa fa-star-o')
  }


</script>

<template>
  <div class="card">
    <img alt="" src="https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg">
    <div class="review">
        <span :class="renderStarRating(1, 0.5)"></span>
        <span :class="renderStarRating(2, 1.5)"></span>
        <span :class="renderStarRating(3, 2.5)"></span>
        <span :class="renderStarRating(4, 3.5)"></span>
        <span :class="renderStarRating(5, 4.5)"></span>
    </div>
  </div>
</template>

<style scoped>
  .card {
    width: 30%;
    padding: 2px;
    border-radius: 10px;
  }
  img {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }


  .review {
    background-color: cornflowerblue;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  span {
    width: 25px;
    height: 20px;
    font-size: 40px;
    display: inline-block;
    color: gold;
    margin-left: 10px;
    margin-right: 30px;
  }





</style>