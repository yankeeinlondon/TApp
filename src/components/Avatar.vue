<!-- 
    Shows a circular Avatar which when clicked can bring up a details menu.
-->
<script lang="ts">
const {cuid} = useCuid();
const defaultId = cuid();
</script>
<script setup lang="ts">
import { Email, UpperAlphaChar } from 'inferred-types/types';


const p = withDefaults(
    defineProps<{
        id?: string,
        initials?: `${UpperAlphaChar}${UpperAlphaChar}`,
        email?: Email,
        profileUrl?: string | undefined,
        hover?: boolean,
    }>(),
    {
        id: `avatar-${defaultId}`,
        hover: false,
        profileUrl: undefined,
    }
);

const initialsUrl = computed(() => p.initials
    ? `https://ui-avatars.com/api/name=${p.initials}?background=0D8ABC&color=fff`
    : undefined
)

const profileUrl = computed(() => p.profileUrl
    ? p.profileUrl
    : p.email
        ? `https://`
        : undefined
);


</script>

<template>
<Pop 
    class="avatar"
    :id="p.id" 
>
    <template #popover>
        DETAILS
    </template>
    <template #default>
    <div 
        class="avatar-profile"
        rounded-full ring-1 ring-white shadow-md text-center overflow-hidden
        hover:-rotate-5 hover:ring-2
        duration-100
        relative
    >
        <img v-if="profileUrl" class="gravatar-image" :src="profileUrl" alt="" absolute hidden />
        <img v-if="initialsUrl" class="initials-image" :src="initialsUrl" alt="" />
    </div>
    </template>

</Pop>
</template>

