<!-- 
  Creates a button -- typically hosted in a nav bar -- which will route to another
  part of the application or open an external URI.
-->
<script setup lang="ts">
import { ensureLeading } from 'inferred-types/runtime';
import { ParamData } from '~/types';

const p = withDefaults(
    defineProps<{
      active?: boolean,
      data: ParamData
    }>(),
    {
       active: false
    }
);

const id = computed(() => `nav-item-${p.data.id}`);

const icon = computed(
  () => p.data.icon
    ? { [ensureLeading(p.data.icon, "i-")]: "" }
    : undefined
);

const router = useRouter();
const go = () => {
  let target = router.getRoutes().find(r => r.path.toLowerCase() === `/${p.data.to?.toLowerCase()}`);
  if (target) {
    router.push(target.path);
  } else {
    router.push("/")
  }
}
</script>


<template>
<btn
    :id="id"
    class="nav-item" py-3 px-2 cursor-pointer select-none 
    @click="go"
>
  <div v-if="icon" v-bind="icon"></div>
  <div v-if="p.data.name" class="name"> {{ p.data.name }} </div>
</btn>
</template>


