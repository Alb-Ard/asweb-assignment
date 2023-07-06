<template>
    <LMap v-bind:use-global-leaflet="false" v-bind:zoom="12" v-bind:center="focusedPlace?.location ?? [47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LMarker 
            v-for="(place, placeIndex) in places" 
            v-bind:key="place.id"
            v-bind:lat-lng="place.location" 
            v-bind:draggable="false"
            v-bind:visible="focusedIndex === undefined || focusedIndex === placeIndex"
            v-bind:interactive="focusablePlaces"
            v-on:click="handlePlaceClicked(placeIndex)"
        >
            <LTooltip v-bind:options="tooltipOptions">
                {{ place.name }}
            </LTooltip>
        </LMarker>
    </LMap>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { TooltipOptions } from "leaflet";

export interface MapPlace {
    readonly id: string,
    readonly name?: string,
    readonly location: [number, number],
}

const { places, focusablePlaces, showPlacesNames, focusedIndex } = defineProps<{
    places: MapPlace[],
    focusablePlaces?: boolean,
    showPlacesNames?: boolean,
    focusedIndex?: number,
}>();

const tooltipOptions: TooltipOptions = {
    permanent: showPlacesNames,
    direction: "right"
};

const focusedPlace = computed(() => !!focusedIndex ? places[focusedIndex] : null);

const emit = defineEmits<{
    (event: "placeFocused", placeIndex: number): void
}>();

const handlePlaceClicked = (placeIndex: number) => (focusablePlaces ?? true) && emit("placeFocused", placeIndex);

</script>