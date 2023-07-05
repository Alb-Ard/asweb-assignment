<template>
    <div v-bind:style="[backgroundColor, borderRadius, textColor, ...instanceStyles]">
        <slot>

        </slot>
    </div>
</template>

<script setup lang="ts">
import { Color, ColorLevel, Radius } from "~/lib/types/commonComponentPropTypes";

const { level, color, radius, style } = defineProps<{
    level?: ColorLevel,
    color?: Color
    radius?: Radius,
    style?: string | string[]
}>();

const backgroundColor = `--background-color: var(--color-${color ?? "grey"}-${level ?? "200"})`;
const borderRadius = `--border-radius: ${Number.parseInt(radius ?? "1") / 2}rem`;
const textColor = `--color: var(--color-on-${level ?? "200"})`;
const instanceStyles = style instanceof Array ? style : [style ?? ""];
</script>

<style scoped>
div {
    --background-color: var(--color-grey-200);
    --border-radius: 1rem;
    --color: var(--color-on-200);

    padding: 1rem;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    color: var(--color);
}
</style>