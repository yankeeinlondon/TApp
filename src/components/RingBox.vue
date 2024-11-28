<script setup lang="ts">
import { TwColor, TwLuminosity } from "inferred-types/types";
import { computed } from "vue"

const p = withDefaults(
  defineProps<{
    circular?: boolean,
    c1?: TwColor,
    c2?: TwColor,
    light?: [ TwLuminosity, TwLuminosity],
    dark?: [ TwLuminosity, TwLuminosity],
    /** duration -- _in seconds_ -- for a full rotation; defaults to 2 seconds. */
    duration?: number,
    roundedFull?: boolean,
    rounded?: boolean | number,
    roundedSm?: boolean,
    roundedMd?: boolean,
    roundedLg?: boolean,
    roundedXl?: boolean,
    rounded2xl?: boolean,
    rounded3xl?: boolean,
  }>(),
  {
    circular: false,
    c1: "indigo",
    c2: "indigo",
    light: () => ["300", "900"],
    dark: () => ["500", "950"],
    /** timing in seconds */
    duration: 1
  }
);

const c1 = computed(() => `var(--tw-${p.c1}-${p.light[0]})`);
const c2 = computed(() => `var(--tw-${p.c2}-${p.light[1]})`);
const cd1 = computed(() => `var(--tw-${p.c1}-${p.dark[0]})`);
const cd2 = computed(() => `var(--tw-${p.c2}-${p.dark[1]})`);
const dur = computed(() => `${p.duration}s`)

const borderRadius = computed(() => {
  return p.roundedFull
    ? "9999px"
    : p.rounded3xl
    ? "24px"
    : p.rounded2xl
    ? "16px"
    : p.roundedXl
    ? "12px"
    : p.roundedLg
    ? "8px"
    : p.roundedMd
    ? "6px"
    : p.roundedSm
    ? "2px"
    : p["rounded"]
    ?  typeof p["rounded"] === "number" ? `${p["rounded"]}px` : "4px"
    : "0px"
});

</script>


<template>
  <div class="ring-box">
    <div class="box-wrapper">
      <div class="content">
          <slot></slot>
      </div>
    </div>

  </div>
</template>


<style lang="css" scoped>

.ring-box {
  display: flex;
}

.content {
  overflow: hidden;
  border-radius: v-bind("borderRadius");
  content: relative;
  width: auto;
  height: auto;
}

.box-wrapper {
  border-radius: v-bind("borderRadius");
  background-color: #1b1930;
  position: relative;
}
@property --angle {
    syntax: "<angle>";
    inherits: true;
    initial-value: 0deg;
}
@property --duration {
  syntax: "<time>";
  inherits: true;
  initial-value: v-bind('dur');
}

.dark .box-wrapper::after,
.dark .box-wrapper::before {
  background-image: conic-gradient(
        from var(--angle), v-bind('cd1'), v-bind('cd2'), v-bind('cd1')
    );
}

.box-wrapper::after,
.box-wrapper::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    --angle: 0deg;
    --duration: v-bind('dur');
    background-image: conic-gradient(
        from var(--angle), v-bind('c1'), v-bind('c2'), v-bind('c1')
    );
    animation: autoRotate var(--duration) linear infinite;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    padding: 5px;
    box-sizing: unset;
}
.box-wrapper::after {
    filter: blur(20px);
}

@keyframes autoRotate {
    to {
        --angle: 360deg;
    }
}
</style>
