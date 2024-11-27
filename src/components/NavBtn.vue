<!-- 
  Creates a button -- typically hosted in a nav bar -- which will route to another
  part of the application or open an external URI.
-->
<script setup lang="ts">
import { ensureLeading } from 'inferred-types/runtime';
import { GroupedItem } from '~/types';

const p = withDefaults(
    defineProps<{
      active?: boolean,
      data: GroupedItem
    }>(),
    {
       active: false
    }
);

const id = computed(() => `nav-item-${p.data.id}`);

const iconName = computed(
  () => p.data.iconName
    ? { [ensureLeading(p.data.iconName, "i-")]: "" }
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
  <div v-if="iconName" v-bind="iconName"></div>
  <div v-if="p.data.name" class="name"> {{ p.data.name }} </div>
</btn>
</template>


