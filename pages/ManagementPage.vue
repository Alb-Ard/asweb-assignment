<script setup lang="ts">


</script>

<template>
  <div class="header">
    <h1>Benvenuto</h1>
    <div class="notify">
      <span class="fa fa-bell"></span>
    </div>
  </div>
  <div class="cardList">
    <PlaceCard image="https://www.corriereromagna.it/wp-content/uploads/2021/06/cesena-turismo.jpg" :star-rating="3.5"></PlaceCard>
    <PlaceCard image="https://sviaggiare.it/wp-content/uploads/2022/01/cesena-cosa-vedere.jpg" :star-rating="1.5"></PlaceCard>
    <PlaceCard image="https://images.lonelyplanetitalia.it/static/places/cesena-4676.jpg?q=90&p=social&s=d363943adb7412973fe417b37f53998d" :star-rating="3.5"></PlaceCard>
    <PlaceCard image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/62/6c/3a/basilica-del-monte.jpg?w=500&h=400&s=1" :star-rating="5"></PlaceCard>
    <PlaceCard image="https://media-cdn.tripadvisor.com/media/photo-c/1280x250/10/55/9a/9b/diga-di-ridracoli.jpg" :star-rating="1"></PlaceCard>
  </div>
</template>

<style scoped>


h1 {
  text-align: center;
  color: blue;
}

.header {
  background-color: chartreuse;
}

.cardList {
  display: inline-block;
  width: 88%;
  margin-right: 6%;
  margin-left: 6%;
}

span {
  float: right;
}


.fa-bell {
  color: red;
  font-size: 40px;
  content: "10"
}


</style>