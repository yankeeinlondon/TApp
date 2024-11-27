<!-- 
 
-->
<script lang="ts">
const {cuid} = useCuid();
const defaultId = cuid();
</script>
<script setup lang="ts">

const p = withDefaults(
    defineProps<{
        id?: string,
        text?: string,
        role?: string,
        hover?: boolean,
    }>(),
    {
        id: `pop-target-${defaultId}`,
        hover: false
    }
);

</script>

<template>
  <button 
    class="pop-source" 
    :popovertarget="p.id" 
    :aria-details="p.id"
    cursor-pointer font-medium
    ring-0 border-0
>
    <slot></slot>
  </button>

  <div 
    :id="p.id" 
    popover shadow-lg rounded-md 
    class="pop-target"
  >
    <slot name="popover">
        <span p-2 >{{ p.text }}</span>
    </slot>
  </div>

</template>

<style lang="css" scoped>
.pop-source {
    anchor-name: --pop-source;
    padding: 0;
    background: transparent;
    color: var(--link-text);
}
.pop-source:hover {
    color: var(--hover-text);
}


.pop-target {
    position-anchor: --pop-source;
    inset: auto;
    bottom: anchor(top);
    left: anchor(center);
    border: 0;
    padding: 0;
    box-shadow: 0;

    background-color: var(--popover-bg);
    color: var(--popover-text);

    transition: display 1s, opacity 1s;
    transition-behavior: allow-discrete;
}

.pop-target:popover-open {
    display: flex;
    opacity: 1;

    @starting-style {
        opacity: 0;
    }
}

</style>
