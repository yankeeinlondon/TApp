<!--
  Describe the Badge Component
-->
<script setup lang="ts">
import { CssColor, CssSizing } from 'inferred-types/types';
import { Size } from '~/types';


interface Props {
  color: CssColor | undefined,
  size?: Size,
  superscript?: boolean,
  subscript?: boolean,
  hover?: string
};

const {
  color = "var(--tw-blue-500)",
  size = "sm",
  superscript = false,
  subscript = false
} = defineProps<Props>();

const minSize = computed<CssSizing>(
  () => {
    switch(size) {
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
const fontSize = computed<CssSizing>(
  () => {
    switch(size) {
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

const lineHeight = computed<CssSizing>(
  () => {
    switch(size) {
      case "xl": 
        return "28px"
      case "lg":
        return "24px"
      case "md":
        return "20px"
      case "sm":
        return "18px"
      case "xs":
        return "14px"
    }
  }
);

const padding = computed<CssSizing>(
  () => {
    switch(size) {
      case "xl": 
        return "6px"
      case "lg":
        return "5px"
      case "md":
        return "4px"
      case "sm":
        return "3px"
      case "xs":
        return "1px"
    }
  }
);

const vertAlign = computed(
  () =>  superscript
    ? "super"
    : subscript ? "sub" : "initial"
)

</script>

<template>
<div class="badge" rounded-full place-content-center self-center overflow-clip>
  <span flex self-center>
    <slot>&nbsp;</slot>
  </span>
</div>
</template>

<style lang="css" scoped>

.badge {
   display: inline-flex;
   background-color: v-bind(color);
   width: v-bind(minSize);
   height: v-bind(minSize);
   font-size: v-bind(fontSize);
   line-height: "auto";
   /* padding: v-bind(padding); */
   vertical-align: v-bind(vertAlign);
}

</style>
