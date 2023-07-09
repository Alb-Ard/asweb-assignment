<template>
    <div>
        <LMap 
            v-bind:use-global-leaflet="false" 
            v-bind:zoom="14"
            v-bind:center="focusedPlace?.location ?? [44.13873257393356, 12.239157218933107]"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            />
            <LMarker 
                v-for="place in places" 
                v-bind:key="place._id"
                v-bind:lat-lng="place.location" 
                v-bind:draggable="false"
                v-bind:visible="focusedId === undefined || focusedId === place._id"
                v-bind:interactive="focusablePlaces ?? true"
                v-on:click="handlePlaceClicked(place._id)"
            >
                <LTooltip v-bind:options="tooltipOptions">
                    {{ place.name }}
                </LTooltip>
            </LMarker>
        </LMap>
        </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { TooltipOptions } from "leaflet";

export interface MapPlace {
    readonly _id: string,
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

const focusedPlace = computed(() => !!props.focusedId ? props.places.find(p => p._id === props.focusedId) : null);

const emit = defineEmits<{
    (event: "placeFocused", placeId: string): void
}>();

const handlePlaceClicked = (placeId: string) => (props.focusablePlaces ?? true) && emit("placeFocused", placeId);

</script>

<style scoped>
div {
    isolation: isolate;
    width: 100%;
    height: 100%;
}
</style>