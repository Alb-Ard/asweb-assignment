<template>
    <NuxtLink v-bind:to="to" v-bind="$attrs" v-bind:style="[...colors, borderRadius, ...instanceStyles]" class="link">
        <span class="icon-container">
            <slot name="icon-left"></slot>
        </span>
        <span class="content-container">
            <slot></slot>
        </span>
        <span class="icon-container">
            <slot name="icon-right"></slot>
        </span>
    </NuxtLink>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from ".nuxt/vue-router";
import { Color, Radius } from "~/lib/types/commonComponentPropTypes";

const { to, ...props } = defineProps<{
    to: RouteLocationRaw,
    tint?: "light" | "normal"
    color?: Color,
    flat?: boolean,
    radius?: Radius,
    style?: string | string[],
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
const borderRadius = computed(() => `--border-radius: ${Number.parseInt(props.radius ?? "1") / 2}rem`);
const instanceStyles = computed(() => props.style instanceof Array ? props.style : [props.style ?? ""]);
</script>

<style scoped>
.link,
.link:visited {
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
    text-decoration: none;
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

.link:hover:disabled,
.link:focus:disabled,
.link:disabled {
    background-color: var(--background-color-disabled);
    color: var(--color-disabled);
}

.link:hover,
.link:focus {
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