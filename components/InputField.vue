<template>
    <input v-bind="$attrs" v-model="modelData"/>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (event: "update:modelValue", value: string): void }>();
const modelData = useVModel(props, "modelValue", emit);
</script>

<style scoped>
input{
    padding: 1rem;
    width: 100%;
    font-family: inherit;
    border: 1px solid var(--color-grey-100);
    color: var(--color-foreground);
    background-color: var(--color-background);
    border-radius: 4px;
    box-sizing: border-box;
}
</style>