<script setup lang="ts">
import { TypedFunction } from "inferred-types/types";
import { animate } from "motion";


const onEnter = async (el: Element, onComplete: TypedFunction) => {
  console.log("entering (app)", el)
  await animate(
    el,
    { opacity: 1 }, 
    { duration: 0.5 }
  )
  onComplete()
}

const onLeave = async (el: Element, onComplete: TypedFunction) => {
  console.log("leaving (app)", el)
  await animate(
    el, 
    { opacity: 0 , position: "absolute" }, 
    { duration: 0.5 }
  )
  onComplete()
}


// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'TApp',
  meta: [
    {
      name: 'description',
      content: 'Opinionated Tauri Starter Template',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
});
</script>


<template>
<router-view v-slot="{Component}">
  <transition appear @enter="onEnter" @leave="onLeave" :css="false" >
    <component :is="Component" />
  </transition>
</router-view>
</template>
