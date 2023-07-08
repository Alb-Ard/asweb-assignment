<template>
    <button v-bind="$attrs" v-bind:style="[...colors, size, ...instanceStyles]">
        <span class="icon-container">
            <slot name="icon-left"></slot>
        </span>
        <span class="content-container">
            <slot></slot>
        </span>
        <span class="icon-container">
            <slot name="icon-right"></slot>
        </span>
    </button>
</template>

<script setup lang="ts">
import { Color } from "~/lib/types/commonComponentPropTypes";

const props = defineProps<{
    tint?: "light" | "normal"
    color?: Color,
    flat?: boolean,
    style?: string | string[],
    size?: "normal" | "small"
}>();

const colorLevels = computed(() => (props.tint ?? "normal") === "light"
    ? ["200", "100", "300"] : ["400", "200", "600"]);
const colors = computed(() => props.flat ? [
    `--background-color-default: transparent`,
    `--background-color-disabled: transparent`,
    `--background-color-hover: transparent`,
    `--color-default: var(--color-${props.color ?? "grey"}-${colorLevels.value[0]})`,
    `--color-disabled: var(--color-${props.color ?? "grey"}-${colorLevels.value[1]})`,
    `--color-hover: var(--color-${props.color ?? "grey"}-${colorLevels.value[2]})`,
] : [
    `--background-color-default: var(--color-${props.color ?? "grey"}-${colorLevels.value[0]})`,
    `--background-color-disabled: var(--color-${props.color ?? "grey"}-${colorLevels.value[1]})`,
    `--background-color-hover: var(--color-${props.color ?? "grey"}-${colorLevels.value[2]})`,
]);
const size = computed(() => `--size: ${(props.size ?? "normal") === "normal" ? "48px" : "32px"}`);
const instanceStyles = computed(() => props.style instanceof Array ? props.style : [props.style ?? ""]);
</script>

<style scoped>
button {
    --background-color-default: var(--color-grey-400);
    --background-color-disabled: var(--color-grey-400);
    --background-color-hover: var(--color-grey-400);
    --color-default: var(--color-on-400);
    --color-disabled: var(--color-on-200);
    --color-hover: var(--color-on-600);
    --border-radius: 1rem;
    --size: 32px;

    position: fixed;
    bottom: 32px;
    right: 32px;
    font: inherit;
    padding: 0.5rem;
    background-color: var(--background-color-default);
    color: var(--color-default);
    fill: currentColor;
    border: 0;
    border-radius: 100vw;
    transition: background-color 150ms,
        color 150ms,
        fill, 150ms,
        border-color 150ms;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: var(--size);
    font-size: calc(var(--size) / 2);
    aspect-ratio: 1 / 1;
    box-shadow: 4px 4px 16px var(--background-color-hover);
}

button:disabled {
    background-color: var(--background-color-disabled);
    color: var(--color-disabled);
}

button:hover,
button:focus {
    cursor: pointer;
    background-color: var(--background-color-hover);
    color: var(--color-hover);
}

span {
    text-align: center;
    margin-block: auto;
}

.content-container {
    flex: 1 1 auto;
}

.icon-container {
    max-width: 1rem;
    flex: 0;
}
</style>