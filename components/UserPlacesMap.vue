<template>
    <div>
        <LMap v-bind:use-global-leaflet="false" v-bind:zoom="12" v-bind:center="[47.41322, -1.219482]">
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            >
            </LTileLayer>
            <LMarker 
                v-for="(place, placeIndex) in places" v-bind:lat-lng="place.location" 
                v-bind:key="placeIndex"
                v-bind:draggable="false"
                v-bind:visible="!!!focusedIndex || focusedIndex === placeIndex"
                v-bind:name="place.name"
                v-on:click="handlePlaceClicked(placeIndex)"
            />
        </LMap>
    </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import Place from "~/lib/types/place";

const { places, hoveredIndex, focusedIndex } = defineProps<{
    places: Place[],
    hoveredIndex?: number,
    focusedIndex?: number,
}>();

const emit = defineEmits<{
    (event: "placeFocused", placeIndex: number): void
}>();

const handlePlaceClicked = (placeIndex: number) => emit("placeFocused", placeIndex);

</script>

<style scoped>
div {
    width: 100%;
    height: 100%;
}
</style>