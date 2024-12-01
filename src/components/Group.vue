
<script setup lang="ts">
// import { animate, stagger } from "motion";
import { CssFlexDirection, CssSizing } from "inferred-types/types";
import { Direction, ParamData } from "../types/index";
import { ensureLeading, isInlineSvg, isRegExp, isString } from "inferred-types/runtime";


const KNOWN_HANDLERS = [
    "navigation",
    "cards"
] as const;

/**
 * Known handlers which can be used with the `<group handler="xxx">` component
 * to render to a known format.
 * 
 * **Note:** if the default slot is implemented by the caller then this handler will be ignored.
 */
export type GroupHandler = typeof KNOWN_HANDLERS[number];

const p = withDefaults(
    defineProps<{
        /** the `id` for this group component */
        id?: string,
        stagger?: Direction | undefined,
        handler?: GroupHandler,
        /** the data definition of the items being grouped */
        items: ParamData[],
        gap?: CssSizing,
        direction?: CssFlexDirection
    }>(),
    {
        handlers: undefined,
        stagger: undefined,
        defaults: undefined,
        gap: "4px",
        direction: "row"
    }
);

const handler = computed(
    () => p.handler
        ? KNOWN_HANDLERS.includes(p.handler) ? p.handler : undefined
        : undefined
);

const active = ref<string | undefined>(undefined);
const router = useRouter();
p.items.forEach(i => {
    const matcher = i.match || i.to;
    if(matcher) {
        if(isRegExp(matcher) && matcher.test(router.currentRoute.value.fullPath)) {
            active.value = i.id
        } else if (isString(matcher) && router.currentRoute.value.fullPath.startsWith(matcher)) {
            active.value = i.id
        }
    }
});

const binding = (item: ParamData) => {
    if(handler.value === "navigation") {
        return {
            to: item.to || "/",
            title: item.title || item.name,
            icon: isInlineSvg(item.icon) 
                ? item.icon 
                : isString(item.icon) && item.icon === "" 
                    ? ensureLeading(item.icon, "i-")
                    : item.icon,
            disabled: item.disabled || false,
            hover: item.hover
        }
    }

    return {}
}

</script>

<template>

<ul :id="p.id" class="group" >
    <li 
        class="group-item"
        v-for="item in items" key="item.id"
    >
        <slot :item="item">
            <div v-if="!handler" class="content">{{ item.name }}</div>
            <router-link 
                v-if="handler === 'navigation'"
                v-bind="binding(item)"
                icon-btn
            >
                <div v-if="item.icon" :data-hover="item.hover" v-bind="{[item.icon]:''}"></div>
            </router-link>
        </slot>
    </li>

</ul>

</template>


<style lang="css" scoped>
@property --gap {
  syntax: "<size>";
  inherits: true;
  initial-value: v-bind('p.gap');
}

ul {
    display: flex;
    gap: v-bind('p.gap');
    flex-direction: v-bind('p.direction');
}


</style>
