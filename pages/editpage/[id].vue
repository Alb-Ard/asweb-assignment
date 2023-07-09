<script setup lang="ts">
//import {LMap, LMarker, LTileLayer, LTooltip} from "@vue-leaflet/vue-leaflet";

import "leaflet/dist/leaflet.css";
import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {initializeIfEmptyAsync, whileLoadingAsync} from "~/lib/dataStore";
import Place from "~/lib/types/place";



  const name = ref("");
  const text = ref("");
  const image = ref("")

  let lat = ref(-1);
  let lon = ref(-1);

  const route = useRoute();
  const placeId = ref(route.params.id as string)




  const zoom = ref(2);

  const authentication = useAuthentication();
  const placeStore = usePlacesStore();
  const isLoading = ref(false);

  watch(authentication.userStore, newUserStore => { !!newUserStore.userData && whileLoadingAsync(isLoading, initializeIfEmptyAsync(() => placeStore.places, placeStore), null); }, { immediate: true });

  function handleMapClick(e: Event) {
    lat.value = e.latlng.lat;
    lon.value = e.latlng.lng;
  }

  function updatePlace() {

    let values = {
      _id: placeId.value,
      name: name.value != "" ? name.value : null,
      description: text.value != "" ? text.value : null,
      location: lat.value != -1 ? [lat.value, lon.value] :  null,
      photoSrcs: image.value != "" ? [image.value]: null

    }

    const partialValue: Partial<Place> & {_id: string} = Object.fromEntries(Object.entries(values).filter(([_,v]) => v != null)  )

    console.log(partialValue)
    placeStore.updateAsync(
      partialValue
    )


  }



</script>

<template>

    <form>

        <InputLabel text="Name" for="name" />
        <InputField class="new-name-field" type="text" v-model="name" id="name" placeholder="Input a name..." />


        <InputLabel text="Text" for="text" />
        <InputField class="new-text-field" type="text" v-model="text" id="text" placeholder="Input text..." />

        <InputLabel text="Image" for="image"></InputLabel>

        <InputField  class="new-image-field" type="text" v-model="image" id="image" placeholder="Input image link..." />

    </form>

    <InputLabel text="Position" for="map"></InputLabel>
    <LMap
        v-bind:use-global-leaflet="false"
        v-bind:zoom="14"
        v-bind:center="[44.13873257393356, 12.239157218933107]"
        @click="handleMapClick"
    >
      <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      />
      <LMarker :lat-lng="[lat, lon]" />

    </LMap>

    <button @click="updatePlace()">Update Data</button>

</template>

<style scoped>

</style>