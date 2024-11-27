<script setup lang="ts">
const p = withDefaults(
  defineProps<{
    /**
     * Specify whether the items in your navigation should be
     * localized. If you express `true` then it will look for
     * translations in `nav[item]` where "item" is the lowercase
     * (and underscored) version of the text passed in. If you
     * pass a string then it will use whatever you pass in as
     * a the base for the i18n id.
     */
    i18n?: boolean | string,
    blurred?: boolean | number
  }>(),
  {
    position: "right",
    items: () => [],
    i18n: false,
    blurred: false
  }
);

const blurAmount = computed(() => typeof p.blurred === "number"
    ? `${p.blurred}px`
    : p.blurred ? "2px" : undefined
)

</script>


<template>

<nav class="horizontal-nav">
    <div class="content" px-4 py-3>

      <div class="left" px-4 ph-3 place-items-center>
        <slot name="left"></slot>
      </div>

      <div  class="center" justify-center place-items-center place-content-center text-center >
        <slot name="default"></slot>
        <slot name="center"></slot>
      </div>

      <div class="right" px-4 ph-3 place-items-center place-content-end text-end>
        <slot name ="right"></slot>
      </div>
    
    </div>

    <div
        v-if="blurAmount" 
        class="header-blur"
        flex w-full h-8
    />
</nav>

</template>

<style lang="css" scoped>
nav {
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  top: 0;
  position: fixed;
  z-index: 10;

  background-color: var(--header-bg);
}

nav .content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  /* height: 80px; */
  color: var(--text);
}
.left,
.center,
.right {
  display: flex;
}

.header-blur {
  background: transparent;
  position: absolute;
  bottom: 0;
}

.header-blur::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0 0 0 0;
  backdrop-filter: blur(1px);
  mask: linear-gradient(
    to bottom,
    var(--tw-white) 85%,
    transparent 100%
  );
}


</style>
