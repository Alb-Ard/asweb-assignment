<template>
    <div class="review">
        <p class="visually-hidden">Rating: {{ rating }}</p>
        <template v-if="interactible">
            <Button v-bind:flat="true" class="star-button" v-on:click="handleClick(1)">
                <span :class="['fa', getStarClasses(1, 0.5)]"></span>
            </Button>
            <Button v-bind:flat="true" class="star-button" v-on:click="handleClick(2)">
                <span :class="['fa', getStarClasses(2, 1.5)]"></span>
            </Button>
            <Button v-bind:flat="true" class="star-button" v-on:click="handleClick(3)">
                <span :class="['fa', getStarClasses(3, 2.5)]"></span>
            </Button>
            <Button v-bind:flat="true" class="star-button" v-on:click="handleClick(4)">
                <span :class="['fa', getStarClasses(4, 3.5)]"></span>
            </Button>
            <Button v-bind:flat="true" class="star-button" v-on:click="handleClick(5)">
                <span :class="['fa', getStarClasses(5, 4.5)]"></span>
            </Button>
        </template>
        <template v-else>
            <span :class="['fa', getStarClasses(1, 0.5)]"></span>
            <span :class="['fa', getStarClasses(2, 1.5)]"></span>
            <span :class="['fa', getStarClasses(3, 2.5)]"></span>
            <span :class="['fa', getStarClasses(4, 3.5)]"></span>
            <span :class="['fa', getStarClasses(5, 4.5)]"></span>
        </template>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ rating: number, interactible?: boolean }>();
const emit = defineEmits<{ (event: "click", rating: number): void }>();

function getStarClasses(fullStar: number, halfStar: number): string {
    return (props.rating >= fullStar)
        ? 'fa-star'
        : ((props.rating >= halfStar)
            ? 'fa-star-half-full'
            : 'fa-star-o');
}

const handleClick = (value: number) => emit("click", value);
</script>

<style scoped>
.review {
    text-align: center;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 0.5rem;
    padding: 0.5rem;
}

.visually-hidden {
    display: none;
}

.star-button {
    border: 0;
    background-color: 0;
    padding: 0;
}

span {
    font-size: 2rem;
    color: var(--color-primary-400);
}
</style>