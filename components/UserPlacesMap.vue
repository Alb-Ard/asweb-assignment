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
            v-bind:visible="focusedId === undefined || focusedId === place.id"
            v-bind:interactive="focusablePlaces"
            v-on:click="handlePlaceClicked(place.id)"
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

const props = defineProps<{
    places: MapPlace[],
    focusablePlaces?: boolean,
    showPlacesNames?: boolean,
    focusedId?: string,
}>();

const tooltipOptions: TooltipOptions = {
    permanent: props.showPlacesNames,
    direction: "right"
};

const focusedPlace = computed(() => !!props.focusedId ? props.places.find(p => p.id === props.focusedId) : null);

const emit = defineEmits<{
    (event: "placeFocused", placeId: string): void
}>();

const handlePlaceClicked = (placeId: string) => (props.focusablePlaces ?? true) && emit("placeFocused", placeId);

</script>