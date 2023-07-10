<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LMarker, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { initializeIfEmptyAsync, whileLoadingAsync } from "~/lib/dataStore";

const route = useRoute();
const placeId = ref(route.params.id as string)
const authentication = useAuthentication();
const placeStore = usePlacesStore();
const place = computed(() => placeStore.places?.find(p => p._id === placeId.value));
const name = ref("");
const description = ref("");
const image = ref("")
const lat = ref<number>();
const lon = ref<number>();
const isLoading = ref(false);

const handleMapClick = (e: LeafletMouseEvent) => {
    lat.value = e.latlng.lat;
    lon.value = e.latlng.lng;
}

const updatePlace = () => {
    placeStore.updateAsync({
        _id: placeId.value,
        name: name.value != "" ? name.value : undefined,
        description: description.value != "" ? description.value : undefined,
        location: lat.value !== undefined && lon.value !== undefined ? [lat.value, lon.value] : undefined,
        photoSrcs: image.value != "" ? [image.value] : undefined
    });
}

watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => placeStore.places, placeStore), null); }, { immediate: true });
watch(place, () => {
    name.value = place.value?.name ?? "";
    description.value = place.value?.description ?? "";
    image.value = place.value?.photoSrcs.at(0) ?? "";
    lat.value = place.value?.location[0];
    lon.value = place.value?.location[1];
});
</script>

<template>
    <main>
        <p v-if="isLoading || !!!place || authentication.userStore.userData === undefined">Loading...</p>
        <p v-else-if="authentication.userStore.userData === null || authentication.userStore.userData._id !== place.owner._id">Log in to edit this place</p>
        <form v-else action="#" method="post" @submit.prevent="updatePlace()">
            <InputLabel text="Name" for="name" />
            <InputField class="new-name-field" type="text" v-model="name" id="name" placeholder="Input a name..." />

            <InputLabel text="Description" for="description" />
            <InputField class="new-text-field" type="text" v-model="description" id="description" placeholder="Input description..." />

            <InputLabel text="Image" for="image" />
            <InputField  class="new-image-field" type="text" v-model="image" id="image" placeholder="Input image link..." />

            <InputLabel text="Position" for="map"></InputLabel>
            <div class="select-location-map">
                <LMap
                    v-bind:use-global-leaflet="false"
                    v-bind:zoom="14"
                    v-bind:center="[lat ?? 44.13873257393356, lon ?? 12.239157218933107]"
                    v-on:click="handleMapClick"
                >
                    <LTileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        layer-type="base"
                        name="OpenStreetMap"
                    />
                    <LMarker v-if="!!lat && !!lon" :lat-lng="[lat, lon]" />
                </LMap>
            </div>

            <Fab color="primary" type="submit">
                <p class="hidden">Update data</p>
                <span class="fa fa-check"></span>
            </Fab>
        </form>
    </main>
</template>

<style scoped>
main {
    height: 100%;
}

.hidden {
    display: none;
}

.select-location-map {
    height: 32rem;
    isolation: isolate;
}
</style>