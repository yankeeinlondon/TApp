<!--
  Creates a Code Block on the page which uses Shiki to provide language specific 
  color highlighting.
-->
<script setup lang="ts">
import { ensureLeading, isString } from 'inferred-types/runtime';
import { CssSizing } from 'inferred-types/types';


interface Props {
    /** the language of the code block */
    lang?: string,
    /** whether to add clipboard functionality/ui */
    clip?: boolean,

    /** typically code blocks will a block element but you can opt-into an inline code snippet */
    inline?: boolean,
    /** you may add the code as a prop _or_ as the default slot (more typical) */
    code?: string,

    width?: CssSizing,
    height?: CssSizing,
};



const {
    lang = "md",
    clip = true,
    inline = false,
    code = undefined,
    width = "auto",
    height = "auto"
} = defineProps<Props>();

defineSlots<{ default: () => string }>();
const slots = useSlots();

const language = computed(() => ensureLeading(lang, "language-"));

const unprocessed = computed(
    () => slots?.default && isString(slots.default())
        ? slots.default()
        : code || ""
);

// onMounted(() => {
//     console.log(slots)
//     unprocessed.value = isString(slots.default())
//         ? slots.default()
//         : code || "";


// })

</script>

<template>
<div class="code-block" m-auto text-left :width="width" :height="height">
    <div class="unparsed" hidden>
        <slot>{{ code }}</slot>
    </div>
    <pre class="shiki shiki-themes vitesse-light vitesse-dark">
        <code :class="language">
            {{ unprocessed || "none" }}
        </code>
    </pre>
</div>
</template>

<style lang="css" scoped>

.code-block {
   display: grid;
   background-color: var(--code-bg);

}

</style>
