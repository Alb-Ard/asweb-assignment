<script setup lang="ts">



import {usePlacesStore} from "~/composables/usePlacesStore";
import {initializeIfEmptyAsync, whileLoadingAsync} from "~/lib/dataStore";
import {MapPlace} from "~/components/UserPlacesMap.vue";



const data = [
    {
        image: "https://www.corriereromagna.it/wp-content/uploads/2021/06/cesena-turismo.jpg",
        rating: 4,
    },
    {
        image: "https://www.corriereromagna.it/wp-content/uploads/2021/06/cesena-turismo.jpg",
        rating: 4,
    }
];

const authentication = useAuthentication();
const isLoading = ref(false);


const placeStore = usePlacesStore();


const places = computed(() => placeStore.places);




function placeByMeanReview(reviews: [any]): number {
    return reviews.map(x => x.star)
        .reduce((s, v) => s + v) / reviews.length
}

function concatPathWithPlaceId(id: string): string {
    return "/dashboard?_id=" + id;
}

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => placeStore.places, placeStore), null); }, { immediate: true });



</script>

<template>
    <div class="header">
        <h1>Benvenuto</h1>
        <div class="notify">
            <Notification></Notification>
        </div>
    </div>
    <div class="cardList">
        <div class="cardContainer" v-for="place in places">
            <PlaceCard :image="places[0].photoSrcs[0]" :star-rating="placeByMeanReview(place.reviews)" :name="place.name" :to="concatPathWithPlaceId(place._id)"></PlaceCard>
        </div>
    </div>
</template>

<style scoped>


h1 {
  text-align: center;
  display: inline-block;
  color: blue;
}

.header {
  background-color: chartreuse;
  display: grid;
  grid-template-columns: 0.90fr auto;
}

.cardList {
  width: 100%;
  margin-right: 6%;
  margin-left: 6%;
}

.cardContainer {
    display: inline-block;
    width: 20%;
    margin: 1%;
}






</style>