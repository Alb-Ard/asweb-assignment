<script setup lang="ts">
import { ColorLevel } from 'lib/types/commonComponentPropTypes';

const props = defineProps<{
    name: string,
    image?: string,
    level?: ColorLevel,
    starRating: number,
    to?: string,
}>();

const emit = defineEmits<{
    (event: "click", e: MouseEvent): void,
}>();

function replaceIfMissing(event: Event) {
    (event.target as HTMLImageElement).src = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
}
</script>

<template>
    <Panel v-bind:level="level ?? '800'" class="card">
        <img alt="" :src="image" @error = "replaceIfMissing">
        <NuxtLink v-if="!!to" v-bind:to="to" tint="light" class="link" v-on:click.native="e => emit('click', e)">{{ name }}</NuxtLink>
        <Button v-else v-bind:flat="true" tint="light" class="link" v-on:click.native="e => emit('click', e)">{{ name }}</Button>
        <StarRating v-bind:rating="props.starRating" />
    </Panel>
</template>

<style scoped>
img {
    width: 100%;
    height: auto;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

img, .link {
    margin-bottom: 0.5rem;
}

.link {
    display: block;
    text-align: center;
    font-size: 1.1rem;
}

.link, .link:hover, .link:visited {
    color: inherit;
    text-decoration: none;
}

.link:after {
    content: "";
    position: absolute;
    inset: 0;
}

.card {
    position: relative;
    padding: 0;
    border-radius: 1rem;
}

.card:hover{
    background-color: var(--color-grey-700);
}
</style>