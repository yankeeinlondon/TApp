<script setup lang="ts">

import { NavItem, useNavigation } from '../composables/navigation';


const p = withDefaults(
  defineProps<{
    items?: (string | ComputedRef<string> |  NavItem)[],
    position?: "left" | "right" | "center",
    /**
     * Specify whether the items in your navigation should be
     * localized. If you express `true` then it will look for
     * translations in `nav[item]` where "item" is the lowercase
     * (and underscored) version of the text passed in. If you
     * pass a string then it will use whatever you pass in as
     * a the base for the i18n id.
     */
    i18n?: boolean | string
  }>(),
  {
    position: "right",
    items: () => [],
    i18n: false
  }
);

const nav = useNavigation(p.items );
const i18nBase = p.i18n
  ? typeof p.i18n === "string" ? p.i18n : "nav"
  : false;

</script>


<template>

<nav class="carousel-nav-header bg-black/05" fixed top-0 left-0 z-10 h-10 >
  <div class="left" p-4 place-items-center>
    <slot name="left">
      <div v-if="position === 'left'" class="nav-items" flex gap-2>
        <button
          class="nav-item"
          v-for="item in nav.routes"
          :key="item.id"
          @click="nav.go(item.id)"
        >
          {{  item.title }}
        </button>
      </div>
    </slot>

  </div>
  <div  class="center" flex justify-center>

    <div v-if="position === 'center'" class="nav-items"  p-4 flex gap-2>
      <button class="nav-item" v-for="item in nav.routes" :key="item.id" @click="nav.go(item.id)">
        {{  item.title }}
      </button>
    </div>

  </div>
  <div class="right" p-4 place-items-center place-content-end text-end>

    <slot name ="right">
      <div v-if="position === 'right'" class="nav-items"  p-4 flex gap-2>
        <button class="nav-item" v-for="item in nav.routes" :key="item.id" @click="nav.go(item.id)">
          {{  item.title }}
        </button>
      </div>
    </slot>

  </div>
</nav>

</template>

<style lang="css" scoped>
nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  height: 80px;

}
.left,
.center,
.right {
  display: flex;
}

nav::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0 0 0 0;
  backdrop-filter: blur(2px);
  mask: linear-gradient(
    to bottom,
    var(--tw-white) 95%,
    transparent 100%
  );
}


.nav-item {
  display: inline-block;
  cursor: pointer;
  border-radius: 0.25rem; /* 4px */
  background-color: var(--primary, green) ;
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
  padding-top: 0.25rem; /* 4px */
  padding-bottom: 0.25rem; /* 4px */
  --un-text-opacity: 1;
  color: white;
  opacity: 0.75;
  outline: 2px solid transparent !important;
  outline-offset: 2px !important;

  transform: scale 750ms ease-in-out;
}

.nav-item:hover {
  opacity: 0.9;
  background-color: var(--primaryHover, darkgreen);
}
</style>
