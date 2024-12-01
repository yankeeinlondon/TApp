<!--
  Creates a tag by surrounding the provided text with a background color
    and giving rounded edges to left and right.
-->
<script setup lang="ts">
import { isTailwindColorWithLuminosity } from 'inferred-types/runtime';
import {  CssSizingLight, CssColor, CssNamedColors,  TwColorWithLuminosity } from 'inferred-types/types';
import { AutoSize } from '~/types';


interface Props {
  color?: CssNamedColors | TwColorWithLuminosity,
  size?: AutoSize
};

const {
  color = "slate-600",
  size = "auto"
} = defineProps<Props>();

const cssColor: CssColor  = isTailwindColorWithLuminosity(color)
  ? `var(--${color})` as CssColor
  : color;

const minSize = computed<CssSizingLight>(
  () => {
    switch(size) {
      case "auto":
        return "auto"
      case "xl": 
        return "42px"
      case "lg":
        return "36px"
      case "md":
        return "24px"
      case "sm":
        return "18px"
      case "xs":
        return "15px"
    }
  }
)
const fontSize = computed<CssSizingLight>(
  () => {
    switch(size) {
      case "auto":
        return "auto"
      case "xl": 
        return "24px"
      case "lg":
        return "18px"
      case "md":
        return "14px"
      case "sm":
        return "12px"
      case "xs":
        return "10px"
    }
  }
);

const horzPadding = computed<CssSizingLight>(
  () => {
    switch(size) {
      case "auto":
        return "4px";
      case "xl": 
        return "12px";
      case "lg":
        return "8px";
      case "md":
        return "6px";
      case "sm":
        return "4px";
      case "xs":
        return "2px";
      default:
        return "auto";
    }
  }
);

</script>

<template>
<div class="tag" rounded-md place-content-center  >
  <span flex self-center px-6px>
    <slot></slot>
  </span>
</div>
</template>

<style lang="css" scoped>

.tag {
   display: inline-flex;
   background-color: v-bind(color);
   height: v-bind(minSize);
   font-size: v-bind(fontSize);
   padding-left: v-bind(horzPadding);
   padding-right: v-bind(horzPadding);
   padding-top: 0;
   padding-bottom: 0;
  }

</style>
