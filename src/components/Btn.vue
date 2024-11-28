<script lang="ts">
const {cuid} = useCuid();
const defaultId = cuid();
</script>

<script setup lang="ts">
import { ensureLeading, isRegExp, isString, isUrl } from 'inferred-types/runtime';
import { CssVar } from 'inferred-types/types';
import { VNodeRef } from 'vue';

const router = useRouter();

const el = ref<VNodeRef>();

const p = withDefaults(
    defineProps<{
        id?: string,
        title?: string,
        name?: string,
        hover?: string,
        iconName?: string,
        active?: boolean,
        /** Make into a link action */
        to?: string,
        disabled?: boolean,
        match?: string | RegExp,
        outline?: boolean,
    }>(),
    {
        active: false,
        title: undefined,
        hover: undefined,
        iconName: undefined,
        outline: false,
        svgButton: false
    }
);

const emit = defineEmits<{
    click: [ id: string, el: VNodeRef ],
    hover: [ id: string, el: VNodeRef ],
    focus: [ id: string, el: VNodeRef ],
    suggest: [ id: string, matcher: string | RegExp, route: string ]
}>();

const title = computed(() => p.title || p.name)

const id = computed(
    () => p.id ? p.id : defaultId
);

const handlesInternalRoute = computed(
    () => p.to
        ? isUrl(p.to) ? false : true
        : false
)
const handlesExternalLink = computed(
    () => p.to
        ? isUrl(p.to) ? true : false
        : false
)

const disabled = computed(() => p.disabled ? true : false);

const iconName = computed<Record<string,""> | undefined>(
  () => p.iconName
    ? { [ensureLeading(p.iconName, "i-")]: "" }
    : undefined
);

const onClick = async(evt: MouseEvent) => {
    console.log("click", id.value, evt)
    emit("click", id.value, el.value as VNodeRef);
    if(p.to) {
        if (handlesInternalRoute.value) {
            await router.push(p.to)
        }
        if (handlesExternalLink.value) {
            console.log(`external link: ${p.to}`)
        }
    }
}

const onHover = () => {
    emit("hover", id.value, el.value as VNodeRef);
}

const onFocus = () => {
    emit("focus", id.value, el.value as VNodeRef);
}

const classy = computed(
    () => [
        p.active ? "active" : ""
    ].join(" ")
)

const bgColor = computed(
    () => p.outline === true
        ? "transparent"
        : p.active ? `var(--btn-active)` : `var(--btn)`
);
const bgHoverColor = computed(
    () => p.outline === true
        ? "transparent"
        : p.active ? `var(--btn-active)` : `var(--btn-hover)`
);
const textColor: ComputedRef<CssVar> = computed(
    () => p.outline === true
        ? p.active ? `var(--btn-active)` : `var(--btn)`
        : `var(--text)`
)
const textColorHover: ComputedRef<CssVar> = computed(
    () => p.outline === true
        ? p.active ? `var(--btn-active)` : `var(--btn-hover)`
        : `var(--text)`
)

const matcher = p.match || p.to;

if(matcher) {
    if (isRegExp(matcher) && matcher.test(router.currentRoute.value.fullPath)) {
        emit("suggest", id.value, matcher, router.currentRoute.value.fullPath);
    } else if (isString(matcher) && router.currentRoute.value.fullPath.startsWith(matcher)) {
        emit("suggest", id.value, matcher, router.currentRoute.value.fullPath);
    }
}

</script>


<template>

<button 
    :id="id"
    :ref="el"
    v-bind:disabled="disabled"
    class="btn"
    :class="classy"
    @click="onClick"
    @hover="onHover"
    @focus="onFocus"
>
    <slot :id="id" :title="title" :hover="hover">
        <div v-if="iconName" v-bind="iconName as object"></div>
        <div v-if="title" class="btn-title">{{  title || "" }}</div>
    </slot>
    <div class="hover-content" hidden>
        <slot name="hover">
            {{  p.hover || "" }}
        </slot>
    </div>
</button>
<div popover class="hover-text">

</div>
</template>

<style lang="css" scoped>
@property --bg-color {
  syntax: "<color>";
  inherits: true;
  initial-value: v-bind('bgColor');
}

button {
    background-color: v-bind('bgColor');
    color: v-bind('textColor');
    stroke: v-bind('textColor');
    border: 0;
}

button:hover {
    background-color: v-bind('bgHoverColor');
    color: v-bind('textColorHover');
    stroke: v-bind('textColorHover');
}
</style>
