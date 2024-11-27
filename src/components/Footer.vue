<script setup lang="ts">
const p = withDefaults(
    defineProps<{
        blurred: boolean | number
    }>(),
    {
        blurred: false
    }
);

const blurAmount = computed(() => typeof p.blurred === "number"
    ? `${p.blurred}px`
    : p.blurred ? "2px" : undefined
)

</script>


<template>

<footer 
    class="footer" 
    fixed bottom-0 left-0 z-10 w-full 
>
    <div class="vertical" grid col-start-0 col-end-3>
        <div
            v-if="blurAmount" 
            class="footer-blur"
            flex w-full h-4
        />
        <div class="content" px-4 py-3 >
            
            <div class="left" place-items-center flex flex-row>
                <slot name="left"></slot>
            </div>
            
            <div  class="center"  flex flex-row justify-center>
                <slot name="default"></slot>
                <slot name="center"></slot>
            </div>
            
            <div class="right"  flex flex-row place-items-center place-content-end text-end>
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</footer>

</template>

<style lang="css" scoped>
footer .content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: var(--footer-bg);
  color: var(--text);
}


.footer-blur::before {
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
