<template>
    <section>
        <header class="place-main-header">
            <Button v-on:click="handleBackPressed">
                <template v-slot:icon-left>
                    {{ "<" }}
                </template>
                Back
            </Button>
            <h2>{{ place.name }}</h2>
        </header>
        <section>
            <header>
                <h3>Details</h3>
            </header>
            <p>Owner: {{ place.owner.username }}</p>
            <p>{{ place.description }}</p>
        </section>
        <section>
            <header>
                <h3>Photos</h3>
            </header>
            <ul class="place-images-list">
                <li v-for="src in place.photoSrcs">
                    <img v-bind:src="src" />
                </li>
            </ul>
        </section>
        <section>
            <header>
                <h3>Reviews</h3>
            </header>
            <ul>
                <li v-for="_ in [0, 1, 2]">
                    <Panel>
                        <article>
                            <header>
                                <p>John Doe</p>
                            </header>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quibusdam repellendus neque at maiores veniam id esse debitis quam. Cumque nesciunt provident dolore cupiditate eius hic nam enim ab et!</p>
                        </article>
                    </Panel>
                </li>
            </ul>
        </section>
    </section>
</template>

<script setup lang="ts">
import Place from "~/lib/types/place";

defineProps<{
    place: Place,
}>();

const emit = defineEmits<{
    (event: "backPressed"): void
}>();

const handleBackPressed = () => emit("backPressed");
</script>

<style scoped>
li {
    list-style-type: none;
}

li:where(:not(:last-of-type)) {
    margin-bottom: 1rem;
}

article > header {
    margin-bottom: 0.5rem;
}

section > section {
    margin-top: 1rem;
}

section > p {
    margin-top: 1rem;
}

.place-main-header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    column-gap: 1rem;
}

.place-main-header > * {
    margin-block: auto;
}

.place-images-list {
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
    column-gap: 1rem;
}

.place-images-list > li {
    list-style-type: none;
    display: inline;
}
</style>