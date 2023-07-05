<template>
    <button v-bind="$attrs" v-bind:style="[...colors, borderRadius, width, ...instanceStyles]">
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
import { Color, Radius } from "~/lib/types/commonComponentPropTypes";

const { tint, color, flat, radius, style, fullWidth } = defineProps<{
    tint?: "light" | "normal"
    color?: Color,
    flat?: boolean,
    radius?: Radius,
    style?: string | string[],
    fullWidth?: boolean
}>();

const colorLevels = (tint ?? "normal") === "light"
    ? [ "200", "100", "300" ] : [ "400", "200", "600" ]

const colors = flat ? [
    `--background-color-default: transparent`,
    `--background-color-disabled: transparent`,
    `--background-color-hover: transparent`,
    `--color-default: var(--color-${color ?? "grey"}-${colorLevels[0]})`,
    `--color-disabled: var(--color-${color ?? "grey"}-${colorLevels[1]})`,
    `--color-hover: var(--color-${color ?? "grey"}-${colorLevels[2]})`,
] : [
    `--background-color-default: var(--color-${color ?? "grey"}-${colorLevels[0]})`,
    `--background-color-disabled: var(--color-${color ?? "grey"}-${colorLevels[1]})`,
    `--background-color-hover: var(--color-${color ?? "grey"}-${colorLevels[2]})`,
];
const borderRadius = `--border-radius: ${Number.parseInt(radius ?? "1") / 2}rem`;
const width = `--width: ${fullWidth ? "100%" : "auto"}`;
const instanceStyles = style instanceof Array ? style : [style ?? ""];
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
    --width: auto;

    font: inherit;
    padding: 0.5rem;
    background-color: var(--background-color-default);
    color: var(--color-default);
    fill: currentColor;
    border: 0;
    border-radius: var(--border-radius);
    transition: background-color 150ms, 
                color 150ms, 
                fill, 150ms, 
                border-color 150ms;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: var(--width);
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
}

.content-container {
    flex: 1 1 auto;
}

.icon-container {
    max-width: 1rem;
    flex: 0;
}
</style>