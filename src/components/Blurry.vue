<script setup lang="ts">
import {  CssOpacity, CssSizing, TwLuminosity, TwColor } from 'inferred-types/types';
import { computed } from "vue";

const p = withDefaults(
  defineProps<{
    circleWidth?: CssSizing,
    color1?: TwColor,
    color2?: TwColor,
    color3?: TwColor,
    opacity?: CssOpacity,
    light?: TwLuminosity,
    dark?: TwLuminosity,
    blur?: CssSizing,
  }>(),
  {
    circleWidth: "288px",
    color1: "purple",
    color2: "yellow",
    color3: "pink",
    opacity: "70%",
    blur: "24px",
    light: "300",
    dark: "700"
  }
)

const circle1 = computed(() => `--tw-${p.color1}-${p.light}`);
const circle2 = computed(() => `--tw-${p.color2}-${p.light}`);
const circle3 = computed(() => `--tw-${p.color3}-${p.light}`);

const darkCircle1 = computed(() => `--tw-${p.color1}-${p.dark}`);
const darkCircle2 = computed(() => `--tw-${p.color2}-${p.dark}`);
const darkCircle3 = computed(() => `--tw-${p.color3}-${p.dark}`);

</script>


<template>
  <div class="blurry-frame" relative>
      <slot></slot>

    <div class="shape-wrapper">
      <div
        class="circle circle-1" bg-purple-300 mix-blend-multiply
        rounded-full w-72 h-72 filter absolute top-4 left-4
      />
      <div
        class="circle circle-2" bg-yellow-300 mix-blend-multiply
        rounded-full w-72 h-72 filter absolute top-4 left-36
      />
      <div
        class="circle circle-3" bg-pink-300 mix-blend-multiply
        rounded-full w-72 h-72 filter absolute top-24 left-16
      />
    </div>

  </div>
</template>

<style lang="css" scoped>

.shape-wrapper {
  display: grid;
  width: 100%;
  height: 100%;
}

.circle {
  animation: 7s infinite blob;
  opacity: v-bind('p.opacity');
  --un-blur: blur(24px);
  filter: var(--un-blur) var(--un-brightness) var(--un-contrast)
    var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate)
    var(--un-invert) var(--un-saturate) var(--un-sepia);
}

.dark .circle1 {
  background-color: var(v-bind('darkCircle1'));
}

.circle1 {
  background-color: var(v-bind('circle1'));
}

.dark .circle2 {
  background-color: var(v-bind('darkCircle2'));
}

.circle2 {
  background-color: var(v-bind('circle2'));
  animation-delay: 2000ms;
}

.dark .circle3 {
  background-color: var(v-bind('darkCircle3'));
}

.circle3 {
  background-color: var(v-bind('circle3'));
  animation-delay: 3000ms;
}


</style>
