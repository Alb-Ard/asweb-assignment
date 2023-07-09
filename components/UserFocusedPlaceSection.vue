<template>
    <section>
        <header class="place-main-header">
            <Button v-on:click="handleBackPressed">
                <template v-slot:icon-left>
                    <span class="fa fa-arrow-left"></span>
                </template>
                Back
            </Button>
            <h2>{{ place.name }}</h2>
        </header>
        <section>
            <header>
                <h3>Details</h3>
            </header>
            <p>Owner: {{ place.owner?.username ?? "Unknown" }}</p>
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
        <p v-if="!!!authentication.userStore.userData">
            <NuxtLink to="/login">Log in</NuxtLink> or <NuxtLink to="/register">Sign up</NuxtLink> to leave a review!
        </p>
        <form v-else action="#" method="post" v-on:submit.prevent="">
            <fieldset>
                <legend>Leave a review</legend>
                <StarRating v-bind:interactible="canEditReview" v-bind:rating="currentUserReview?.star ?? 0" v-on:click="handleStarRatingClick" />
            </fieldset>
        </form>
        <section>
            <header>
                <h3>Reviews</h3>
            </header>
            <p v-if="place.reviews.length <= 0">This place hasn't been reviewed yet. Be the first one to rate it!</p>
            <template v-else>
                <StarRating 
                    v-bind:rating="place.reviews.reduce((p, c) => p + c.star, 0) / place.reviews.length"
                    class="global-star-rating"    
                />
                <p>Reviews count: {{ namifyCount(place.reviews.length) }}</p>
            </template>
        </section>
    </section>
</template>

<script setup lang="ts">
import Place from "~/lib/types/place";

const authentication = useAuthentication();
const props = defineProps<{
    place: Place,
    canEditReview: boolean
}>();

const currentUserReview = computed(() => props.place.reviews.find(r => r.user._id === authentication.userStore.userData?._id));

const emit = defineEmits<{
    (event: "placeRated", star: number): void,
    (event: "backPressed"): void
}>();

const namifyCount = (count: number) => {
    if (count < 1000000) {
        return "" + count;
    } else {
        return (count / 1000000) + "M"
    }
}

const handleStarRatingClick = (rating: number) => emit("placeRated", rating);
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

section > section,
section > form {
    margin-top: 2rem;
}

section > p {
    margin-top: 1rem;
}

form {
    margin-top: 1rem;
}

form > fieldset {
    border: 2px solid var(--color-grey-800);
    border-radius: 1rem;
}

form > fieldset > legend {
    text-align: center;
    font-size: 1rem;
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

.place-reviews-list > li {
    display: grid;
    margin-bottom: 0;
    grid-template-columns: auto 1fr;
}

.place-reviews-list > li > * {
    margin-block: auto;
    font-size: 1.25rem;
}

.place-reviews-list > li > p{
    text-align: end;
}

.global-star-rating {
    margin-top: 1rem;
}
</style>