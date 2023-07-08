<template>
  <div v-bind:style="[backgroundColor, borderRadius, textColor, ...instanceStyles]">
    <slot>

    </slot>
  </div>
</template>

<script setup lang="ts">
import { Color, ColorLevel, Radius } from "~/lib/types/commonComponentPropTypes";

const props = defineProps<{
  level?: ColorLevel,
  color?: Color
  radius?: Radius,
  style?: string | string[]
}>();

const backgroundColor = computed(() => `--background-color: var(--color-${props.color ?? "grey"}-${props.level ?? "200"})`);
const borderRadius = computed(() => `--border-radius: ${Number.parseInt(props.radius ?? "1") / 2}rem`);
const textColor = computed(() => `--color: var(--color-on-${props.level ?? "200"})`);
const instanceStyles = computed(() => props.style instanceof Array ? props.style : [props.style ?? ""]);
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