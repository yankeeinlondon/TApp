<!--
  Hero Layout
-->
<script lang="ts">
    const {cuid} = useCuid();
    const id = `hero-${cuid()}`;
</script>

<script setup lang="ts">
import { TypedFunction } from "inferred-types/types";
import { animate } from "motion";

const router = useRouter();

const onEnter = async (el: Element, onComplete: TypedFunction) => {
  console.log("entering (hero)", el)
  const box = el.querySelector(`.title-box`);
  if(box) {
    await animate(
      box,
      { opacity: 1,  }, 
      { duration: 0.5 }
    )  
  } else {
    console.log("box element not found")
  }
  onComplete()
}

const onAppear = async (el: Element, onComplete: TypedFunction) => {
  console.log("appear(hero)")
}

const onLeave = async (el: Element, onComplete: TypedFunction) => {
  console.log("leaving", el)
  await animate(
    el, 
    { opacity: 0, position: "absolute", y: 150 }, 
    { duration: 0.5 }
  )
  onComplete()
}
</script>

<template>
<div :id="id" class="hero">
    <div 
      class="title-box font-informal" 
      text-3xl h-48 w-48 bg-red-700 text-center place-content-center 
    > 
      {{ router.currentRoute.value.meta.title }} 
      <br>
      <span class="nav font-sanserif" text-lg>
        <router-link to="/">back</router-link>
        ▫️ 
        forward
      </span>
    </div>
    
    <div class="content">
      <router-view v-slot="{Component}" >
        <transition appear @enter="onEnter" @leave="onLeave"  :css="false" >
          <component :is="Component"  />
        </transition>
      </router-view>
    </div>
    
</div>
</template>

<style lang="css" scoped>

.hero {
    display: grid;
    gap: 1.5rem;
    grid-auto-columns: 1fr;
    grid-template-areas:
        'head intro intro intro empty'
        'aside-left content content content aside-right'
}

</style>
