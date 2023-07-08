<template>
    <label v-bind:for="props.for">
        {{ text }}<span v-if="required"> (required)</span>:
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{ for: string, text: string, required?: boolean }>();
</script>

<style scoped>
span {
    color: var(--color-danger-400);
    font-size: 0.75rem;
}
</style>